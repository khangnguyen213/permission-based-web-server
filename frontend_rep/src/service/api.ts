import axios, { AxiosInstance } from 'axios';

class Api {
  baseURL: string | undefined;
  token: string | null;
  axios: AxiosInstance;
  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.PUBLIC_API_URL ||
      'http://localhost:3000';
    if (typeof window !== 'undefined') {
      this.token = localStorage?.getItem('token')
        ? window.localStorage.getItem('token')
        : null;
    } else {
      this.token = null;
    }

    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}

export default new Api().axios;
