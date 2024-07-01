import { UserDto } from '@/common/interfaces';
import axios from './api';

const baseURL = '/user';

export const userApi = {
  getAll: async (): Promise<{
    data: UserDto[];
    err: string;
  }> => {
    try {
      let response = await axios.get(baseURL);
      return { data: response.data.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: [] };
    }
  },

  update: async (
    id: string,
    data: Partial<{
      email: string;
      password: string;
      role: string;
    }>
  ): Promise<{
    data: UserDto | null;
    err: string;
  }> => {
    try {
      let response = await axios.put(`${baseURL}/${id}`, data);
      return { data: response.data.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: null };
    }
  },

  delete: async (
    id: string
  ): Promise<{
    data: string | null;
    err: string;
  }> => {
    try {
      let response = await axios.delete(`${baseURL}/${id}`);
      return { data: response.data.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: null };
    }
  },
};
