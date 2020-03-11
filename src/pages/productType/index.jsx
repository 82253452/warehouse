import React, { useRef, useState } from 'react';
import { Divider, Input, Popconfirm, Table } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import ProductTypeContainer from '@/hookModels/productType';
import { useEffectOnce } from 'react-use';
import './index.less';

export default () => {
  const {
    list,
    fetch,
    pagination,
    onChange,
    deleteData,
    handleSearch,
    saveOrUpdate,
    listLoading,
  } = ProductTypeContainer.useContainer();

  const [visible, setVisible] = useState(false);
  const formRef = useRef(null);
  const header = [
    {
      column: 'name',
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
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '商品类目',
      dataIndex: 'typeName',
      key: 'typeName',
    },
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
      label: '商品名称',
      id: 'name',
      options: {},
      render: <Input placeholder="名称" />,
    },
    {
      label: '商品类目',
      id: 'typeName',
      options: {},
      render: <Input placeholder="名称" />,
    },
  ];

  useEffectOnce(() => {
    fetch();
  });

  function modify(record) {
    setVisible(true);
    formRef.current.setFieldsValue(record);
  }

  function hanldeAdd() {
    formRef.current.resetFields();
    setVisible(true);
  }

  function handleSubmit(value) {
    setVisible(false);
    saveOrUpdate(value);
  }

  return (
    <div>
      <HeaderForm handleSearch={handleSearch} hanldeAdd={hanldeAdd} columns={header}></HeaderForm>
      <Table
        columns={columns}
        dataSource={list}
        onChange={onChange}
        loading={listLoading}
        pagination={pagination}
      />
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
