import FetchHttpClient from '#src/common/infrastructure/http/FetchHttpClient.js';
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      apiCalls: 0,
      totalResponseTime: 0,
    };
  }

  incrementAPICalls() {
    this.metrics.apiCalls += 1;
  }

  addResponseTime(time) {
    this.metrics.totalResponseTime += time;
  }

  getAverageResponseTime() {
    return this.metrics.totalResponseTime / this.metrics.apiCalls;
  }

  resetMetrics() {
    this.metrics.apiCalls = 0;
    this.metrics.totalResponseTime = 0;
  }
}
const monitor = new PerformanceMonitor();
class MonitoredFetchHttpClient extends FetchHttpClient {
  constructor(baseURL = '') {
    super(baseURL);
  }

  async request(config) {
    const startTime = Date.now();

    const response = await super.request(config);

    const endTime = Date.now();
    const requestTime = endTime - startTime;

    monitor.incrementAPICalls();
    monitor.addResponseTime(requestTime);

    console.log(`Average response time: ${monitor.getAverageResponseTime()}ms`);

    return response;
  }
}
export default MonitoredFetchHttpClient;