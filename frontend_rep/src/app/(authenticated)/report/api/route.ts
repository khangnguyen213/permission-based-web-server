import axios from '@/service/api';

export async function GET() {
  const res = await axios(`http://localhost:3000/pdf/view`, {
    responseType: 'blob',
  });
  return res.data;
}
