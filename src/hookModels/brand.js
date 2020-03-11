import React from 'react';
import { createContainer } from 'unstated-next';
import { add, update, remove } from '@/services/base';
import { queryPage } from '@/services/brand';
import usePage from '@/utils/hooks/usePage';

const BASE = '/admin/brand';

export function useData() {
  const { list, fetch, pagination, body, setBody, onChange, listLoading } = usePage(
    [],
    {},
    queryPage,
  );

  function deleteData(id) {
    remove(BASE, id).then(() => fetch());
  }

  function handleSearch(values) {
    setBody({ ...body, ...values });
  }

  function saveOrUpdate(value) {
    value.id ? update(BASE, value).then(() => fetch()) : add(BASE, value).then(() => fetch());
  }

  return {
    list,
    body,
    fetch,
    pagination,
    onChange,
    deleteData,
    handleSearch,
    saveOrUpdate,
    listLoading,
  };
}

export default createContainer(useData);
