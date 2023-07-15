/**
 * Class representing a client for making HTTP requests in parallel.
 */
class ParallelHttpClient {
  constructor() {
    this.httpClient = null;
  }

  /**
   * Makes parallel requests to an array of URLs and returns the data from all resolved responses.
   *
   * @param {string[]} [urls=[]] - The URLs to send requests to.
   * @returns {Promise} Promise that resolves to an array of data from all responses.
   */
  async makeParallelRequestsAll(urls = []) {
    const promises = urls.map(url => this.httpClient.get(url));
  
    // Use Promise.all() to wait for all promises to resolve
    const responses = await Promise.all(promises);
  
    // At this point, all requests have resolved
    // 'responses' is an array of the responses from each request
    responses.forEach(response => {
      console.log(response.data);  // Access the 'data' property of each response
    });

    // Assuming you meant to return the responses here
    return responses;
  }

  /**
   * Makes parallel requests to an array of URLs and returns an object containing arrays of 
   * fulfilled and rejected results.
   *
   * @param {string[]} [urls=[]] - The URLs to send requests to.
   * @returns {Promise} Promise that resolves to an object containing 'fulfilledResults' and 'rejectedResults'.
   */
  async makeParallelRequestsAllSettled(urls = []) {
    const promises = urls.map(url => this.httpClient.get(url));

    // Use Promise.allSettled() instead of Promise.all()
    const results = await Promise.allSettled(promises);

    const fulfilledResults = [];
    const rejectedResults = [];

    // 'results' is an array of objects describing the result of each promise
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        fulfilledResults.push(result.value.data);  // Access the 'data' property of the response
      } else if (result.status === 'rejected') {
        rejectedResults.push(result.reason);  // Access the rejection reason
      }
    });

    return {
      fulfilledResults,
      rejectedResults,
    };
  }
}

export default ParallelHttpClient;