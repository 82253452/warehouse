import React, { useRef, useState } from 'react';
import { Divider, Input, Popconfirm, Table } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import BrandContainer from '@/hookModels/brand';
import { useEffectOnce } from 'react-use';
import { saveOrUpdateCarserial } from '@/services/brand';
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
          <a hidden={record.pid} onClick={() => add(record)}>
            新增车型
          </a>
          <Divider type="vertical" />
          <a onClick={() => modify(record)}>修改</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除数据?"
            onConfirm={() => deleteData(record)}
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
      id: 'pid',
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

  function add(record) {
    formRef.current.resetFields();
    formRef.current.setFieldsValue({ pid: record.id });
    setVisible(true);
  }

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
