import React, { useRef, useState } from 'react';
import { Button, Divider, Input, Modal, Select, Table } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import UserAuthContainer from '@/hookModels/userAuth';
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
    updateStatus,
  } = UserAuthContainer.useContainer();
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
      column: 'realName',
      label: '',
      render: <Input placeholder="真实姓名" />,
    },
  ];
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
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
    setTemp(record);
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
          <p>真实姓名： {temp.realName}</p>
          <p>身份证号： {temp.idCard}</p>
          <p>手机号： {temp.phone}</p>
          <p>微信号： {temp.weChat}</p>
          <p>
            身份证正面：
            {!!temp.cardImg && <img src={temp.cardImg} alt="avatar" style={{ width: '25%' }} />}
          </p>
          <p>
            身份证反面：
            {!!temp.cardImg2 && <img src={temp.cardImg2} alt="avatar" style={{ width: '25%' }} />}
          </p>
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
