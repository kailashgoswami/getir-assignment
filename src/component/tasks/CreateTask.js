import React, { useEffect } from 'react';
import Moment from 'moment';
import { Form, Input, Button, Select, DatePicker, Modal } from 'antd';
import { FORM_MODE, DATE_FORMAT, TASK_STATUS } from '../../constants';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 12,
  },
};

const CreateTask = (props) => {
  const [form] = Form.useForm();
  const onFinish = props.handleSubmit;

  useEffect(() => {
    const data = { ...props.data };
    if (props.data) {
      data.start_date = new Moment(data.start_date);
    data.end_date = new Moment(data.end_date);
    form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [props.data]);

  return (
    <Modal
      title={props.mode === FORM_MODE.ADD? 'Create Task' : 'Update Task'}
      visible={props.visible}
      okText={props.mode === FORM_MODE.ADD ? 'Create' : 'Update'}
      onOk={form.submit}
      onCancel={props.onCancel}
      maskClosable={false}
    >
      <Form {...layout} form={form} labelAlign="left" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select"
          >
            <Option value={TASK_STATUS.INCOMPLETE}>Incomplete</Option>
            <Option value={TASK_STATUS.COMPLETE}>Complete</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="start_date"
          label="Start Date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker format={DATE_FORMAT} />
        </Form.Item>
        <Form.Item
          name="end_date"
          label="End Date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker format={DATE_FORMAT} />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateTask;