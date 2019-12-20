import React, { useEffect, useState, useRef } from 'react';
import { Col, Divider, Form, Input, Popconfirm, Table, Select, Row } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import './index.less';
import { add, update, remove, page } from '@/services/base';
import { queryPage } from '@/services/product';
import QiniuUpload from '@/components/qiniu/upload';

const BASE = '/admin/userAuth';

export default props => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [queryParam, setQueryParam] = useState({ pageSize: 10, pageIndex: 1 });
  const formRef = useRef(null);
  const { Option } = Select;
  const header = [
    {
      column: 'status',
      label: '筛选',
      render: <Input placeholder="标题" />,
    },
    {
      column: 'name',
      label: '',
      render: <Input placeholder="标题" />,
    },
  ];
  const columns = [
    {
      title: '商家编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '发布名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
      label: '名称',
      id: 'name',
      options: {},
      render: <Input placeholder="名称" />,
    },
    {
      label: '申请账号昵称',
      id: 'name',
      options: {},
      render: <Input placeholder="名称" />,
    },
    {
      label: '公司名称',
      id: 'title',
      options: {},
      render: <Input placeholder="名称" />,
    },
    {
      label: '详细地址',
      id: 'address',
      options: {},
      render: <Input placeholder="名称" />,
    },
    {
      label: '职位',
      id: 'adminUser',
      options: {},
      render: <Input placeholder="名称" />,
    },
    {
      label: '营业执照照片',
      id: 'licenseImg',
      options: {},
      render: <QiniuUpload single />,
    },
    {
      label: '名片照片',
      id: 'cardImg',
      options: {},
      render: <QiniuUpload single />,
    },
    {
      label: '展厅照片',
      id: 'showImg',
      options: {},
      render: <QiniuUpload single />,
    },
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
      ? update(value).then(() => queryAllData())
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
