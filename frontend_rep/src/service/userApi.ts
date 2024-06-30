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
};
