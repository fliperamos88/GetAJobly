import axios from 'axios';

axios.defaults.withCredentials = true;
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class Jobly {
  static BASE_URL =
    process.env.REACT_APP_BASE_URL || 'https://getajobly.onrender.com/api';

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
    process.env.REACT_APP_BASE_URL || 'http://localhost:3001/api';

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

//   static async request(endpoint, data = {}, method = 'get') {
//     console.debug('API Call:', endpoint, data, method);

//     //there are multiple ways to pass an authorization token, this is how you pass it in the header.
//     //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
//     const url = `${BASE_URL}/${endpoint}`;
//     const headers = { Authorization: `Bearer ${JoblyApi.token}` };
//     const params = method === 'get' ? data : {};

//     try {
//       return (await axios({ url, method, data, params, headers })).data;
//     } catch (err) {
//       console.error('API Error:', err.response);
//       let message = err.response.data.error.message;
//       throw Array.isArray(message) ? message : [message];
//     }
//   }

//   // Individual API routes

//   /** Get details on a company by handle. */

//   static async getCompany(handle) {
//     let res = await this.request(`companies/${handle}`);
//     return res.company;
//   }

// obviously, you'll add a lot here ...

// for now, put token ("testuser" / "password" on class)
