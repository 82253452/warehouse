import request from '@/utils/request';

const BASE = '/admin/brand';

export function queryPage(data) {
  return request.get(`${BASE}/queryPage`, { params: data });
}

export function setSataus(id) {
  return request.post(`${BASE}/status/${id}`);
}
export function saveOrUpdateCarserial(data) {
  return request.post(`${BASE}/saveOrUpdateCarserial`, { data });
}
