class ParallelHttpClient {
  constructor() {
    this.httpClient = null;
  }

  async makeParallelRequestsAll(urls = []) {

    const promises = urls.map(url => this.httpClient.get(url));
  
    // Usa Promise.all() para esperar a que todas las promesas se resuelvan
    const responses = await Promise.all(promises);
  
    // En este punto, todas las solicitudes se han resuelto
    // 'responses' es un array de las respuestas de cada solicitud
    responses.forEach(response => {
      console.log(response.data);  // Accede a la propiedad 'data' de cada respuesta
    });

    const results = responses.
  }

  async makeParallelRequestsAllSettled(urls = []) {
    const promises = urls.map(url => this.httpClient.get(url));

    // Usa Promise.allSettled() en lugar de Promise.all()
    const results = await Promise.allSettled(promises);

    const fulfilledResults = [];
    const rejectedResults = [];

    // 'results' es un array de objetos que describen el resultado de cada promesa
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        fulfilledResults.push(result.value.data);  // Accede a la propiedad 'data' de la respuesta
      } else if (result.status === 'rejected') {
        rejectedResults.push(result.reason);  // Accede al motivo de rechazo
      }
    });

    return {
      fulfilledResults,
      rejectedResults,
    };
  }
}

export default ParallelHttpClient;