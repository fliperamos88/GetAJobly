import axios from 'axios';

axios.defaults.withCredentials = true;

class Jobly {
  static BASE_URL = process.env.REACT_APP_BASE_URL;

  static async getAll(endpoint, params = {}) {
    const response = await axios.get(`${this.BASE_URL}/${endpoint}`, {
      params,
    });
    return response;
  }

  static async getOne(endpoint, param, reqbody = {}) {
    const response = await axios.get(
      `${this.BASE_URL}/${endpoint}/${param}`,
      reqbody
    );
    return response;
  }

  static async create(endpoint, reqBody) {
    const response = await axios.post(`${this.BASE_URL}/${endpoint}`, reqBody);
    return response;
  }

  static async update(endpoint, param, reqBody) {
    const response = await axios.patch(
      `${this.BASE_URL}/${endpoint}/${param}`,
      reqBody
    );
    return response;
  }
  static async delete(endpoint, param = '', data = {}) {
    const response = await axios.delete(
      `${this.BASE_URL}/${endpoint}/${param}`,
      { data }
    );
    return response;
  }
}

class Authenticate {
  static BASE_URL =
    process.env.REACT_APP_BASE_URL || 'https://getajobly.onrender.com/api';

  static async register(reqBody) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      reqBody
    );
    return response;
  }

  static async login(reqBody) {
    const response = await axios.post(`${this.BASE_URL}/auth/login`, reqBody);
    return response;
  }
}

export { Jobly, Authenticate };
