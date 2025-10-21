class MetricsCollector {
  private metrics = new Map<string, number[]>();

  recordTiming(name: string, duration: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    this.metrics.get(name)!.push(duration);
  }

  getStats(name: string) {
    const timings = this.metrics.get(name) || [];

    if (timings.length === 0) return null;

    const sorted = timings.sort((a, b) => a - b);

    return {
      count: timings.length,
      avg: timings.reduce((a, b) => a + b, 0) / timings.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      min: sorted[0],
      max: sorted[sorted.length - 1],
    };
  }

  getAllStats() {
    const stats: Record<string, unknown> = {};

    for (const [name] of this.metrics) {
      stats[name] = this.getStats(name);
    }

    return stats;
  }
}

export const metrics = new MetricsCollector();
