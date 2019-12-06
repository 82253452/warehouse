import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/branch/user/info');
}

export async function queryNotices() {
  return request('/api/notices');
}
