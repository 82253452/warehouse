import React, { useRef, useState } from 'react';
import { Divider, Input, Modal, Popconfirm, Select, Table } from 'antd';
import HeaderForm from '@/components/LableForm/index';
import './index.less';
import ProductContainer from '@/hookModels/product';
import { useEffectOnce } from 'react-use';
import ColumnForm from '@/components/ColumnForm';
import { ImageList } from '@/pages/product';

export default () => {
  const {
    list,
    fetch,
    body,
    pagination,
    onChange,
    deleteData,
    handleSearch,
    saveOrUpdate,
    setProductStatus,
    listLoading,
    setBody,
  } = ProductContainer.useContainer();
  const [visible, setVisible] = useState(false);
  const formRef = useRef(null);
  const { Option } = Select;
  const header = [
    // {
    //   label: '筛选',
    //   column: 'saleType',
    //   render: <Select allowClear  placeholder="模式">
    //             <Option value="1">一口价</Option>
    //             <Option value="2">叫价</Option>
    //           </Select>
    // },
    {
      label: '筛选',
      column: 'status',
      render: (
        <Select allowClear placeholder="状态">
          <Option value="1">上架</Option>
          <Option value="2">下架</Option>
        </Select>
      ),
    },
    {
      column: 'userId',
      render: <Input placeholder="商家" />,
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
    // {
    //   title: '运费',
    //   dataIndex: 'freight',
    //   key: 'freight',
    // },
    // {
    //   title: '模式',
    //   dataIndex: 'saleType',
    //   key: 'saleType',
    //   render: (text)=>{
    //     if(text===1){
    //       return '一口价'
    //     }
    //     return '叫价'
    //   }
    // },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let str = '上架';
        if (text === 2) {
          str = '下架';
        }
        if (record.closeStatus === 1) {
          str += '(售出下架)';
          // return <span>(售出下架)</span>
        } else if (record.closeStatus === 2) {
          str += '(主动下架)';
        } else if (record.closeStatus === 3) {
          str += '(超时下架)';
        } else if (record.closeStatus === 4) {
          str += '(违规下架)';
        }
        return str;
      },

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
      title: '数量',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: '成色',
      dataIndex: 'quality',
      key: 'quality',
    },
    {
      title: '浏览次数',
      dataIndex: 'showCount',
      key: 'showCount',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => {
        if (record.status !== 2) {
          return (
            <span>
              <Popconfirm
                title="确定执行?"
                onConfirm={() => setProductStatus(record.id)}
                okText="确定"
                cancelText="取消"
              >
                <a href="#">下架</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => modify(record)}>查看图片</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={() => modify(record)}>查看图片</a>
          </span>
        );
      },
    },
  ];
  const items = [
    {
      id: 'id',
      render: <Input hidden />,
    },
    {
      label: '',
      id: 'image',
      options: {},
      render: <ImageList />,
    },
  ];

  useEffectOnce(() => {
    fetch({ type: 2 });
  });

  function modify(record) {
    setVisible(true);
    formRef.current.setFieldsValue(record);
  }
  function handleSubmit() {
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
