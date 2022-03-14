import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { Menu, Dropdown, Modal, Row, Col, Table, Confirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { getTasksList, createTask, updateTask } from '../../redux/actions/taskAction';
import CreateTask from './CreateTask';
import Header from './Header';
import { FORM_MODE, DATE_FORMAT, TASK_STATUS } from '../../constants';

function TasksList(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionRecord, setActionRecord] = useState({});
  const taskList = useSelector(state => state.tasksList);
  const dispatch = useDispatch();
  const loadTaskList = () => dispatch(getTasksList());

  useEffect(() => {
    loadTaskList();
  }, []);

  const handleSubmit = async (data) => {
    if (actionRecord.mode === FORM_MODE.ADD) {
      await dispatch(createTask(data));
    } else {
      await dispatch(updateTask(data, actionRecord.data.id));
    }
    loadTaskList();
    setModalVisible(false);
  }
  const onModalCancel = () => setModalVisible(false);
  const openCreateModel = () => {
    setActionRecord({ mode: FORM_MODE.ADD });
    setModalVisible(true);
  }

  const onClickEdit = (data) => {
    setActionRecord({ mode: FORM_MODE.EDIT, data });
    setModalVisible(true);
  }

  const getRowClassName = (record) => record.status === TASK_STATUS.COMPLETE ? 'task-complete' : 'task-incomplete';

  const dateRender = (item) => new Moment(item).format(DATE_FORMAT);

  const headers = [
    {
      dataIndex: 'name',
      title: 'Name',
      align: 'left',
      width: '25%'
    },
    {
      dataIndex: 'start_date',
      title: 'Start Date',
      align: 'left',
      width: '15%',
      render: dateRender
    },
    {
      dataIndex: 'end_date',
      title: 'End Date',
      align: 'left',
      width: '15%',
      render: dateRender
    },
    {
      dataIndex: 'status',
      title: 'Status',
      align: 'left',
      width: '15%'
    },
    {
      dataIndex: 'actions',
      align: 'center',
      title: 'Action',
      render: (actions, row) => (
        <div>
          <EditOutlined onClick={() => onClickEdit(row)} />
        </div >
      ),
      width: '15%'
    }
  ];

  return (
    <div className="App-container">
      <Header onClickCreate={openCreateModel} />
      <Table
        loading={props.loading}
        size="middle"
        columns={headers}
        rowKey="id"
        rowClassName={getRowClassName}
        dataSource={taskList}
        pagination={false}
        heightOffset={210}
      />
      <CreateTask
        visible={modalVisible}
        onCancel={onModalCancel}
        handleSubmit={handleSubmit}
        {...actionRecord}
      />
    </div>
  );
}

TasksList.propTypes = {
};


export default TasksList;
