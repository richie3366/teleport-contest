/* Per-function call counter for the call-heat recorder build.
 *
 * Compiled with -fno-instrument-functions and linked into a NetHack
 * binary built with -finstrument-functions. Counts every instrumented
 * enter. Dumps unslid addresses on SIGTERM (record-session stops the
 * game that way) and on normal exit. No-op unless NH_CALLCOUNT is set
 * to a path prefix; the file written is "<prefix>.<pid>".
 *
 * Async-signal-safe dump: no malloc, no stdio, no snprintf.
 */
#include <errno.h>
#include <fcntl.h>
#include <signal.h>
#include <stdint.h>
#include <stdatomic.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#if defined(__APPLE__)
#include <mach-o/dyld.h>
#endif

#define NH_SLOTS (1u << 21) /* 2M slots, ~32MB BSS */

typedef struct {
    _Atomic uintptr_t fn;
    _Atomic uint64_t n;
} nh_slot;

static nh_slot slots[NH_SLOTS];
static _Atomic uint64_t calls_total;
static _Atomic uint64_t calls_dropped;
static int dump_fd = -1;
static volatile sig_atomic_t in_dump;
static volatile sig_atomic_t dumped;
static uintptr_t image_slide;

static void __attribute__((no_instrument_function))
hex16(char *p, uint64_t v)
{
    static const char dig[] = "0123456789abcdef";
    for (int i = 15; i >= 0; i--) {
        p[i] = dig[v & 0xf];
        v >>= 4;
    }
}

static void __attribute__((no_instrument_function))
dump_counts(void)
{
    if (dumped) return;
    in_dump = 1;
    dumped = 1;
    if (dump_fd < 0) return;

    char line[80];
    /* header */
    memcpy(line, "# slide ", 8);
    hex16(line + 8, (uint64_t)image_slide);
    line[24] = '\n';
    if (write(dump_fd, line, 25) < 0) return;

    char buf[4096];
    int used = 0;
    for (uint32_t i = 0; i < NH_SLOTS; i++) {
        uintptr_t fn = atomic_load_explicit(&slots[i].fn, memory_order_relaxed);
        if (!fn) continue;
        uint64_t n = atomic_load_explicit(&slots[i].n, memory_order_relaxed);
        if (!n) continue;
        uintptr_t unslid = fn - image_slide;
        hex16(buf + used, (uint64_t)unslid);
        buf[used + 16] = ' ';
        hex16(buf + used + 17, n);
        buf[used + 33] = '\n';
        used += 34;
        if (used > (int)sizeof buf - 40) {
            if (write(dump_fd, buf, (size_t)used) < 0) return;
            used = 0;
        }
    }
    if (used && write(dump_fd, buf, (size_t)used) < 0) return;

    memcpy(line, "# total ", 8);
    hex16(line + 8, atomic_load_explicit(&calls_total, memory_order_relaxed));
    line[24] = '\n';
    if (write(dump_fd, line, 25) < 0) return;
    memcpy(line, "# drop  ", 8);
    hex16(line + 8, atomic_load_explicit(&calls_dropped, memory_order_relaxed));
    line[24] = '\n';
    (void)write(dump_fd, line, 25);
    close(dump_fd);
    dump_fd = -1;
}

static void __attribute__((no_instrument_function))
on_signal(int sig)
{
    (void)sig;
    dump_counts();
    _exit(0);
}

static void __attribute__((no_instrument_function, constructor))
nh_callcount_init(void)
{
#if defined(__APPLE__)
    image_slide = (uintptr_t)_dyld_get_image_vmaddr_slide(0);
#else
    image_slide = 0;
#endif
    const char *base = getenv("NH_CALLCOUNT");
    if (!base || !base[0]) return;
    char path[1024];
    size_t n = 0;
    while (base[n] && n + 16 < sizeof path) {
        path[n] = base[n];
        n++;
    }
    path[n++] = '.';
    uint32_t pid = (uint32_t)getpid();
    char tmp[16];
    int nd = 0;
    uint32_t x = pid;
    do { tmp[nd++] = (char)('0' + (x % 10)); x /= 10; } while (x);
    while (nd && n + 1 < sizeof path) path[n++] = tmp[--nd];
    path[n] = 0;
    dump_fd = open(path, O_WRONLY | O_CREAT | O_TRUNC, 0644);
    struct sigaction sa;
    memset(&sa, 0, sizeof sa);
    sa.sa_handler = on_signal;
    sigemptyset(&sa.sa_mask);
    sigaction(SIGTERM, &sa, 0);
    sigaction(SIGINT, &sa, 0);
    atexit(dump_counts);
}

void __attribute__((no_instrument_function))
__cyg_profile_func_enter(void *this_fn, void *call_site)
{
    (void)call_site;
    if (in_dump || !this_fn) return;
    atomic_fetch_add_explicit(&calls_total, 1, memory_order_relaxed);
    uintptr_t key = (uintptr_t)this_fn;
    uint32_t i = (uint32_t)((key >> 4) * 0x9E3779B1u) & (NH_SLOTS - 1);
    for (int probe = 0; probe < 96; probe++) {
        uintptr_t cur = atomic_load_explicit(&slots[i].fn, memory_order_acquire);
        if (cur == key) {
            atomic_fetch_add_explicit(&slots[i].n, 1, memory_order_relaxed);
            return;
        }
        if (cur == 0) {
            uintptr_t expected = 0;
            if (atomic_compare_exchange_strong_explicit(
                    &slots[i].fn, &expected, key,
                    memory_order_release, memory_order_acquire)) {
                atomic_fetch_add_explicit(&slots[i].n, 1, memory_order_relaxed);
                return;
            }
            if (expected == key) {
                atomic_fetch_add_explicit(&slots[i].n, 1, memory_order_relaxed);
                return;
            }
        }
        i = (i + 1u) & (NH_SLOTS - 1);
    }
    atomic_fetch_add_explicit(&calls_dropped, 1, memory_order_relaxed);
}

void __attribute__((no_instrument_function))
__cyg_profile_func_exit(void *this_fn, void *call_site)
{
    (void)this_fn;
    (void)call_site;
}
