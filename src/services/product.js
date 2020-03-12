import request from '@/utils/request';

const BASE = '/admin/product';

export function queryPage(data) {
  return request.get(`${BASE}/queryPage`, { params: data });
}

export function setSataus(id) {
  return request.post(`${BASE}/status/${id}`);
}
