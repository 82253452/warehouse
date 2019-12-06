import request from '@/utils/request';

export function add(base, data) {
  return request.post(`${base}`, { data });
}

export function get(base, id) {
  return request.get(`${base}/${id}`);
}

export function update(base, data) {
  return request.put(`${base}`, { data });
}

export function remove(base, id) {
  return request.delete(`${base}/${id}`);
}

export function all(base) {
  return request.get(`${base}/all`);
}

export function page(base, data) {
  return request.get(`${base}/page`, { params: data });
}
