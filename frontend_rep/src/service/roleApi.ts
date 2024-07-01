import { RoleDto } from '@/common/interfaces';
import axios from './api';
import { create } from 'domain';

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

  get: async (
    roleName: string
  ): Promise<{
    data: RoleDto | null;
    err: string;
  }> => {
    try {
      let response = await axios.get(`${baseURL}/${roleName}`);
      return { data: response.data.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: null };
    }
  },

  create: async (data: {
    name: string;
    permissions: string[];
  }): Promise<{
    data: RoleDto | null;
    err: string;
  }> => {
    try {
      let response = await axios.post(baseURL, data);
      return { data: response.data.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: null };
    }
  },

  update: async (
    roleName: string,
    data: Partial<{
      name: string;
      permissions: string[];
    }>
  ): Promise<{
    data: RoleDto | null;
    err: string;
  }> => {
    try {
      let response = await axios.put(`${baseURL}/${roleName}`, data);
      return { data: response.data.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: null };
    }
  },

  delete: async (
    roleName: string
  ): Promise<{
    data: string | null;
    err: string;
  }> => {
    try {
      let response = await axios.delete(`${baseURL}/${roleName}`);
      return { data: response.data.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: null };
    }
  },
};
