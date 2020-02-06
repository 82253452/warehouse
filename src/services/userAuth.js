import request from '@/utils/request';

const BASE = '/admin/userAuth';

export function setStatus(id,status) {
  return request.get(`${BASE}/setStatus/`+id+"/"+status);
}
