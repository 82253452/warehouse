import React from 'react';
import { createContainer } from 'unstated-next';
import { add, update, remove, page } from '@/services/base';
import useBasePage from '@/utils/hooks/useBasePage';
import { setStatus } from '@/services/userAuth';

const BASE = '/admin/userAuth';

export function useData() {
  const { list, fetch, pagination, body, setBody, onChange, listLoading } = useBasePage(
    [],
    {},
    BASE,
    page,
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

  async function updateStatus(id, ststus) {
    return setStatus(id, ststus).then(() => {
      fetch();
    });
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
    updateStatus,
  };
}

export default createContainer(useData);
