import axios from './api';

const baseURL = '/auth';

export const authApi = {
  register: async (
    email: string,
    password: string
  ): Promise<{ data: string; err: string }> => {
    try {
      let response = await axios.post(`${baseURL}/register`, {
        email,
        password,
      });
      return { data: response.data.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: '' };
    }
  },
  login: async (
    email: string,
    password: string
  ): Promise<{ data: string | null; err: string }> => {
    try {
      let response = await axios.post(`${baseURL}/login`, {
        email,
        password,
      });
      return { data: response.data.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: null };
    }
  },
};
