import React from 'react';
import { createContainer } from 'unstated-next';
import { add, update, remove, page } from '@/services/base';
import { queryPage, setSataus } from '@/services/product';
import useBasePage from '@/utils/hooks/useBasePage';
import usePage from '@/utils/hooks/usePage';

const BASE = '/admin/product';

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
  function setProductStatus(id) {
    setSataus(id).then(() => fetch());
  }

  return {
    list,
    body,
    setBody,
    fetch,
    pagination,
    onChange,
    deleteData,
    handleSearch,
    saveOrUpdate,
    setProductStatus,
    listLoading,
  };
}

export default createContainer(useData);
