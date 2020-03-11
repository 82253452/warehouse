import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Input, Modal, Select, Table } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import { add, page, remove, update } from '@/services/base';
import { setStatus } from '@/services/merchant';
import MerchangeContainer from '@/hookModels/merchant';
import './index.less';
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
    updateStatus,
  } = MerchangeContainer.useContainer();
  const [visible, setVisible] = useState(false);
  const formRef = useRef(null);
  const { Option } = Select;
  const [temp, setTemp] = useState({});
  const header = [
    {
      label: '筛选',
      column: 'status',
      render: (
        <Select allowClear placeholder="状态">
          <Option value="1">待审核</Option>
          <Option value="2">拒绝</Option>
          <Option value="3">通过</Option>
        </Select>
      ),
    },
    {
      column: 'name',
      label: '',
      render: <Input placeholder="商家名称" />,
    },
  ];
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '商家名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let str = '待审核';
        if (text === 2) {
          str = '拒绝';
        } else if (text === 3) {
          str = '通过';
        }
        return str;
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id2',
      render: (text, record) => (
        <span>
          <a onClick={() => modify(record)}>查看详情</a>
        </span>
      ),
    },
  ];

  useEffectOnce(() => {
    fetch();
  });

  function modify(record) {
    setVisible(true);
    if (record.showImg) {
      record.imageList = record.showImg.split(',');
    }
    setTemp(record);
    // formRef.current.setFieldsValue(record);
  }

  async function status(id, ststus) {
    await updateStatus(id, ststus);
    setVisible(false);
  }

  return (
    <div>
      <HeaderForm handleSearch={handleSearch} columns={header}></HeaderForm>
      <Table
        columns={columns}
        dataSource={list}
        onChange={onChange}
        loading={listLoading}
        pagination={pagination}
      />
      {/* <ColumnForm
        ref={formRef}
        visible={visible}
        handleSubmit={handleSubmit}
        items={items}
        handleCancel={() => setVisible(false)}
      ></ColumnForm> */}
      <Modal
        title="详情"
        footer={null}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width="40%"
      >
        <div>
          <p>公司名称： {temp.name}</p>
          <p>详细地址： {temp.address}</p>
          <p>职位： {temp.title}</p>
          <p>营业执照：</p>
          <p>
            {!!temp.licenseImg && (
              <img src={temp.licenseImg} alt="avatar" style={{ width: '30%' }} />
            )}
          </p>
          {/* <p>展厅照片:</p>
          <div>
          {temp.imageList&&temp.imageList.map(item => (
              <p>{!!item && <img src={item} alt="avatar" style={{ width: '30%' }} />}</p>
              ))
          }
          </div> */}
          <p>
            <Button type="danger" onClick={() => status(temp.id, 2)} disabled={temp.status !== 1}>
              不通过
            </Button>
            <Divider type="vertical" />
            <Button type="primary" onClick={() => status(temp.id, 3)} disabled={temp.status !== 1}>
              审核通过
            </Button>
          </p>
        </div>
      </Modal>
    </div>
  );
};
