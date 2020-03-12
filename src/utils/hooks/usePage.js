import { useState } from 'react';
import { useList, useUpdateEffect } from 'react-use';

export default function(init, paramInit, api) {
  const [list, { set: setList, push: pushList }] = useList(init || []);
  const [listLoading, setListLoading] = useState(true);
  const [body, setBody] = useState({ ...paramInit, limit: 10, pageIndex: 1 });
  const [pagination, setPagination] = useState({ pageSize: 10 });
  const [hasMore, setHasmore] = useState(true);
  const [append, setAppend] = useState(false);

  useUpdateEffect(() => {
    setListLoading(false);
  }, [list]);
  useUpdateEffect(() => {
    fetchData();
  }, [body]);

  function fetch(d) {
    setBody({ ...d, limit: 10, pageIndex: 1 });
  }

  async function fetchData() {
    setListLoading(true);
    api(body).then(res => {
      const { data: dataList, totalPage, totalCount: total } = res.data;
      append ? pushList(dataList) : setList(dataList);
      setPagination({ ...pagination, current: body.pageIndex, total });
      setHasmore(body.pageIndex < totalPage);
    });
  }

  function onChange(e) {
    setList([]);
    setBody({ ...body, pageIndex: e.current });
  }

  function reload() {
    setList(list);
  }

  return {
    list,
    body,
    append,
    setBody,
    setList,
    pushList,
    reload,
    fetch,
    onChange,
    setAppend,
    listLoading,
    pagination,
    hasMore,
    setPagination,
  };
}
