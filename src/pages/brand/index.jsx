import React, { useEffect, useState, useRef } from 'react';
import { Col, Divider, Form, Input, Popconfirm, Table, Select, Row } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import './index.less';
import { add, update, remove, page } from '@/services/base';
import { queryPage } from '@/services/brand';

const BASE = '/admin/brand';

export default props => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [queryParam, setQueryParam] = useState({ limit: 10, pageIndex: 1 });
  const formRef = useRef(null);
  const header = [
    {
      column: 'zhName',
      label: '名称',
      render: <Input placeholder="名称" />,
    },
  ];
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    // {
    //   title: '商品类目',
    //   dataIndex: 'typeName',
    //   key: 'typeName',
    // },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => (
        <span>
          <a onClick={() => modify(record)}>修改</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除数据?"
            onConfirm={() => deleteData(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const items = [
    {
      id: 'id',
      render: <Input hidden />,
    },
    {
      label: '名称',
      id: 'zhName',
      options: {},
      render: <Input placeholder="名称" />,
    },
    // {
    //   label: '商品类目',
    //   id: 'typeName',
    //   options: {},
    //   render: <Input placeholder="名称" />,
    // },
  ];
  useEffect(() => {
    queryAllData();
  }, [queryParam]);

  function queryAllData() {
    page(BASE, queryParam).then(data => data && data.data && setList(data.data.data));
  }

  function onChange(e) {
    queryParam.pageNum = e.current;
    setQueryParam({ ...queryParam });
  }

  function modify(record) {
    setVisible(true);
    formRef.current.setFieldsValue(record);
  }

  function deleteData(id) {
    remove(BASE, id).then(() => queryAllData());
  }

  function handleSearch(values) {
    setQueryParam({ ...queryParam, ...values });
  }

  function hanldeAdd() {
    formRef.current.resetFields();
    setVisible(true);
  }

  function handleSubmit(value) {
    setVisible(false);
    value.id
      ? update(BASE, value).then(() => queryAllData())
      : add(BASE, value).then(() => queryAllData());
  }

  return (
    <div>
      <HeaderForm handleSearch={handleSearch} hanldeAdd={hanldeAdd} columns={header}></HeaderForm>
      <Table columns={columns} dataSource={list} onChange={onChange} />
      <ColumnForm
        ref={formRef}
        visible={visible}
        handleSubmit={handleSubmit}
        items={items}
        handleCancel={() => setVisible(false)}
      ></ColumnForm>
    </div>
  );
};
