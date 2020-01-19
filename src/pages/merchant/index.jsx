import React, { useEffect, useState, useRef } from 'react';
import { Col, Divider, Form, Input, Popconfirm, Table, Select, Row,  Modal,Button } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import './index.less';
import { add, update, remove, page } from '@/services/base';
import { queryPage } from '@/services/product';
import QiniuUpload from '@/components/qiniu/upload';

const BASE = '/admin/merchant';

export default props => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [queryParam, setQueryParam] = useState({ pageSize: 10, pageIndex: 1 });
  const formRef = useRef(null);
  const { Option } = Select;
  const [temp,setTemp] =useState({})
  const header = [
    {
      label: '筛选',
      column: 'status',
      render: <Select allowClear  placeholder="状态">
                <Option value="1">待审核</Option>
                <Option value="2">拒绝</Option>
                <Option value="3">通过</Option>
              </Select>
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
        var str ='待审核'
        if(text===2){
          str='拒绝'
        }else if(text===3){
          str='通过'
        }
        return str
      }
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
    if(record.showImg){
      record.imageList = record.showImg.split(',');
    }
    setTemp(record)
    //formRef.current.setFieldsValue(record);
  }

  function status(id,ststus){
    setStatus(id, ststus).then(data=>{
      if(data && data.success){
        setVisible(false)
        queryAllData()
      }
    });
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
      <HeaderForm handleSearch={handleSearch} columns={header}></HeaderForm>
      <Table columns={columns} dataSource={list} onChange={onChange} />
      {/* <ColumnForm
        ref={formRef}
        visible={visible}
        handleSubmit={handleSubmit}
        items={items}
        handleCancel={() => setVisible(false)}
      ></ColumnForm> */}
      <Modal title="详情" footer={null} visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} width="40%" >
        <div>
          <p>公司名称： {temp.name}</p>
          <p>详细地址： {temp.address}</p>
          <p>职位：   {temp.title}</p>
          <p>营业执照：</p>
          <p>{!!temp.licenseImg && <img src={temp.licenseImg} alt="avatar" style={{ width: '30%' }} />}</p>
          <p>展厅照片:</p>
          <div>
          {temp.imageList&&temp.imageList.map(item => (
              <p>{!!item && <img src={item} alt="avatar" style={{ width: '30%' }} />}</p>
              ))
          }
          </div>
          <p>
            <Button type="danger" onClick={() => status(temp.id,2)} disabled={temp.status!=1}>不通过</Button>
            <Divider type="vertical" />
            <Button type="primary" onClick={() => status(temp.id,3)} disabled={temp.status!=1}>审核通过</Button>
          </p>
        </div>
      </Modal>
    </div>
  );
};
