import React, { useEffect, useState, useRef } from 'react';
import { Col, Divider, Form, Input, Popconfirm, Table, Select, Row } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import ColumnForm from '@/components/ColumnForm/index';
import './index.less';
import { add, update, remove, page } from '@/services/base';
import { queryPage,setSataus } from '@/services/product';

const BASE = '/admin/order';

export default props => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [queryParam, setQueryParam] = useState({ pageSize: 10, pageIndex: 1 });
  const formRef = useRef(null);
  const { Option } = Select;
  const header = [
    {
      label: '筛选',
      column: 'saleType',
      render: <Select allowClear  placeholder="模式">
                <Option value="1">一口价</Option>
                <Option value="2">叫价</Option>
              </Select>
    },
    {
      column: 'status',
      render: <Select allowClear  placeholder="状态">
                <Option value="1">上架</Option>
                <Option value="2">下架</Option>
              </Select>
    },
    {
      column: 'userId',
      render: <Input placeholder="商家" />
    },
  ];
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '发布商家',
      dataIndex: 'nickName',
      key: 'nickName',
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
        var str ='上架'
        if(text===2){
          str='下架'
        }        
        if(record.closeStatus===1){
            str+='(售出下架)'
            //return <span>(售出下架)</span>
          }
          else if(record.closeStatus===2){
            str+='(主动下架)'
          }
          else if(record.closeStatus===3){
            str+='(超时下架)'
          }
          else if(record.closeStatus===4){
            str+='(违规下架)'
          }
        return str
      }
             
        
    //     return  ({
            
    //         () =>{
    //          return <span>1111111</span>
    //           if(record.closeStatus===1){
    //             '(售出下架)'
    //           }
    //           else if(record.closeStatus===2){
    //             '(售出下架)'
    //           }
    //         }
          
    //     })
      
   },
    {
      title: '报价次数',
      dataIndex: 'offerCount',
      key: 'offerCount',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => {       
        
          if(record.status!==2){
          return  <span>
            <Popconfirm
            title="确定执行?"
            onConfirm={() => setProductStatus(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">下架</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={() => modify(record)}>查看详情</a>
          </span>
        }
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
    page(BASE,queryParam).then(data => data && data.data && setList(data.data.data));
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
    setSataus(id).then(() => queryAllData());
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
