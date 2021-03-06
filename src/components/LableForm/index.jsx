import { Button, Col, Divider, Form, Input, Row } from 'antd';
import React from 'react';

function HeaderForm(props) {
  const { getFieldDecorator } = props.form;

  function handleSearch(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }
      if (props.handleSearch) props.handleSearch(values);
    });
  }
  function hanldeAdd() {
    if (props.hanldeAdd) props.hanldeAdd();
  }

  return (
    <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
       <Row>
      {props.columns &&
        props.columns.map(c => (
          //  <Row>
            <Col span={6}>
              <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} label={c.label}>
                {getFieldDecorator(c.column)(c.render)}
              </Form.Item>
            </Col>
          // </Row>
        ))}
      {/* <Row> */}
        <Col span={6} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Divider type="vertical" />
          {props.hanldeAdd && (
            <Button type="primary" onClick={hanldeAdd}>
              添加
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
}
export default Form.create()(HeaderForm);
