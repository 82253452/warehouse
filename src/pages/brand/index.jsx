import React, { useEffect, useState, useRef } from 'react';
import { Col, Divider, Form, Input, Popconfirm, Table, Select, Row } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import './index.less';
import BrandContainer from '@/hookModels/brand';
import { useEffectOnce } from 'react-use';

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
  } = BrandContainer.useContainer();
  const [visible, setVisible] = useState(false);
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
  const extColumns = [
    {
      title: '序号',
      dataIndex: 'serialId',
      key: 'serialId',
    },
    {
      title: '名称',
      dataIndex: 'serialName',
      key: 'serialName',
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
        pagination={pagination}
        loading={listLoading}
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
