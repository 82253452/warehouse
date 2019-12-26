import React, { useEffect, useState, useRef } from 'react';
import { Col, Divider, Form, Input, Popconfirm, Table, Select, Row } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import './index.less';
import { add, update, remove, page } from '@/services/base';
import { queryPage } from '@/services/order';

const BASE = '/admin/order';

export default props => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [queryParam, setQueryParam] = useState({ pageSize: 10, pageIndex: 1 });
  const formRef = useRef(null);
  const { Option } = Select;
  const header = [
    {
      column: 'status',
      render: <Select allowClear  placeholder="状态">
                <Option value="1">待付款</Option>
                <Option value="2">已付款</Option>
                <Option value="3">已发货</Option>
                <Option value="4">完成</Option>
                <Option value="5">待退款</Option>
                <Option value="6">退款失败</Option>
                <Option value="7">关闭</Option>
              </Select>
    },
    {
      column: 'saleUserId',
      render: <Input placeholder="商家" />
    },
    {
      column: 'userId',
      render: <Input placeholder="买家" />
    }
  ];
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '发布商家',
      dataIndex: 'saleUser',
      key: 'saleUser',
    },
    {
      title: '购买主体',
      dataIndex: 'buyUser',
      key: 'buyUser',
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '运费',
      dataIndex: 'freight',
      key: 'freight',
    },
    {
      title: '模式',
      dataIndex: 'saleType',
      key: 'saleType',
      render: (text)=>{
        if(text===1){
          return '一口价'
        }
        return '叫价'
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        var str =''
        if(text===1){
          str='待付款'
        }else if(text===2){
          str='已付款'
        }else if(text===3){
          str='已发货'
        }else if(text===4){
          str='完成'
        }else if(text===5){
          str='待退款'
        }else if(text===6){
          str='退款失败'
        }else if(text===7){
          str='关闭'
        } 
               
        if(record.closeStatus===1){
            str+='(退款关闭)'
          }
          else if(record.closeStatus===2){
            str+='(超时关闭)'
          }
          else if(record.closeStatus===3){
            str+='(用户确认收货)'
          }
          else if(record.closeStatus===4){
            str+='(超时自动确认)'
          }
        return str
      }      
   },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => {
      return <span><a onClick={() => modify(record)}>查看详情</a></span>
       
      },
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
  ];
  useEffect(() => {
    queryAllData();
  }, [queryParam]);

  function queryAllData() {
    queryPage(queryParam).then(data => data && data.data && setList(data.data.data));
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

  function setProductStatus(id) {
    //setSataus(id).then(() => queryAllData());
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
