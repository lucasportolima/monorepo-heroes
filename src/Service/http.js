const http = axios.create({
  baseURL: 'http://localhost:3000'
});

class HttpService {
  constructor() {
    this.http = http;
  }

  get(params, config) {
    let request = '';
    let options = { params };

    if (typeof params === "string" || typeof params === "number") {
      request = `/${params}`;
      options = config;
    }

    return this.http.get(`${request}/`, options);
  }

  patch(body, route) {
    let resource = '';

    if (_.isEmpty(route) === false) {
      resource = `${resource}/${route}`;
    }

    return this.http.patch(`${resource}/`, body);
  }

  post(params, body) {
    return this.http.post(`${params}/`, body);
  }

  put(params, body) {
    return this.http.put(`${params}/`, body)
  }

  delete(params, body) {
    return this.http.delete(`${params}/`, { data: body });
  }
}

const api = new HttpService()