import axios from './api';

const baseURL = '/pdf';

export const reportApi = {
  //this will retun a pdf file
  viewReport: async (): Promise<{
    data: ArrayBuffer | null;
    err: string;
  }> => {
    try {
      let response = await axios.get(baseURL + '/view', {
        responseType: 'arraybuffer',
      });
      return { data: response.data, err: '' };
    } catch (error: any) {
      return { err: error.response.data.message, data: null };
    }
  },
};
