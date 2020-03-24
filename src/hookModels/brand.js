import React from 'react';
import { createContainer } from 'unstated-next';
import { add, update, remove } from '@/services/base';
import { queryPage, saveOrUpdateCarserial } from '@/services/brand';
import usePage from '@/utils/hooks/usePage';

const BASE = '/admin/brand';

export function useData() {
  const { list, fetch, pagination, body, setBody, onChange, listLoading, setList } = usePage(
    [],
    {},
    queryPage,
  );

  function deleteData(record) {
    remove(record.pid ? '/admin/brand/serial' : BASE, record.id).then(() => {
      setList([]);
      fetch();
    });
  }

  function handleSearch(values) {
    setBody({ ...body, ...values });
  }

  function saveOrUpdate(value) {
    if (value.pid) {
      saveOrUpdateCarserial(value).then(() => fetch());
    } else {
      value.id ? update(BASE, value).then(() => fetch()) : add(BASE, value).then(() => fetch());
    }
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
