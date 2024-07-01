import { PermissionDto } from '@/common/interfaces';
import axios from './api';

const baseURL = '/permission';

export const permissionApi = {
  getAll: async (): Promise<{
    data: PermissionDto[];
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
