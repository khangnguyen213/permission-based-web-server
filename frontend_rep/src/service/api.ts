import axios, { AxiosInstance } from 'axios';

class Api {
  baseURL: string | undefined;
  token: string | null;
  axios: AxiosInstance;
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL;
    this.token = localStorage.getItem('token');
    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}

export default new Api().axios;
