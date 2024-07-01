import { RoleDto } from '@/common/interfaces';
import axios from './api';

const baseURL = '/role';

export const roleApi = {
  getAll: async (): Promise<{
    data: RoleDto[];
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
