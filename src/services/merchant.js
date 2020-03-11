import request from '@/utils/request';

const BASE = '/admin/merchant';

export async function setStatus(id, status) {
  return request.get(`${BASE}/setStatus/${id}/${status}`);
}
