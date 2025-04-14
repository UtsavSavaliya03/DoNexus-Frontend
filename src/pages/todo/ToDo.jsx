import { useEffect, useState } from 'react';
import { Button, Form, Table, Input, DatePicker } from 'antd';
import { GetTaskListApi, AddTaskApi, ChangeStatusApi, DeleteTaskApi } from '../../api/request/todo.js';
import columns from '../../columns/task/task.js';
import moment from 'moment';
import Eye from '../../assets/Eye.jsx';
import ModalComponent from '../../components/modals/ModalComponent.jsx';
import LoadableButton from '../../components/buttons/LoadableButton.jsx';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../components/modals/ConfirmationModal.jsx';
const { TextArea } = Input;

export default function ToDo() {

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddTaskLoading, setIsAddTaskLoading] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [initialValues, setInitialValues] = useState({ title: '', description: '', dueDate: '' });
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [search, setSearch] = useState('');

  const getTaskList = async () => {
    try {
      setIsLoading(true);
      const { data } = await GetTaskListApi(new URLSearchParams({ search: search }).toString());
      if (data?.status) {
        setTasks(data?.data?.map((item) => {
          return {
            ...item,
            dueDate: (moment(item?.dueDate).format('LL')),
            createdAt: (moment(item?.createdAt).format('LL')),
            status: <div onClick={() => { setSelectedTask(item); setIsStatusModalOpen(true) }} className='cursor-pointer'>
              {item?.isCompleted ?
                <div className='bg-green-300 flex items-center justify-center rounded-md font-semibold text-green-700 pb-1'>Completed</div> :
                <div className='bg-red-300 flex items-center justify-center rounded-md font-semibold text-red-700 pb-1'>Pending</div>}
            </div>,
            action: <div className='flex gap-3 items-center'>
              <div className='cursor-pointer' onClick={() => viewTask(item)}><Eye /></div>
              <div className='cursor-pointer' onClick={() => handleEdit(item)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6F42C1" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </div>
              <div className='cursor-pointer' onClick={() => { setSelectedTask(item); setIsDeleteModalOpen(true) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </div>
          };
        }));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const viewTask = (task) => {
    setSelectedTask(task);
    setIsOpenViewModal(true);
  }

  useEffect(() => {
    getTaskList();
  }, []);

  const addNewTask = async (values) => {
    try {
      setIsAddTaskLoading(true);
      const { data } = await AddTaskApi(values);
      if (data?.status) {
        toast.success(data?.message);
        form.resetFields();
        getTaskList();
        setIsOpenAddModal(false);
      }
      setIsAddTaskLoading(false);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      setIsAddTaskLoading(false);
    }
  }

  useEffect(() => {
    form.resetFields();
  }, [isOpenAddModal]);

  const handleEdit = (value) => {
    setInitialValues({ title: value?.title, description: value?.description, dueDate: moment(value?.dueDate) });
    setIsOpenEditModal(true);
  }

  useEffect(() => {
    if (!isOpenEditModal) {
      setInitialValues({ title: '', description: '', dueDate: '' });
    }
  }, [isOpenEditModal]);

  const statusHandler = async () => {
    try {
      setIsStatusLoading(true);
      const { data } = await ChangeStatusApi(selectedTask?._id, { isCompleted: !selectedTask?.isCompleted });
      if (data?.status) {
        getTaskList();
        toast.success(data?.message);
        setIsStatusModalOpen(false);
      }
      setIsStatusLoading(false);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      setIsStatusLoading(false);
    }
  }

  const deleteHandler = async () => {
    try {
      setIsDeleteLoading(true);
      const { data } = await DeleteTaskApi(selectedTask?._id);
      if (data?.status) {
        getTaskList();
        toast.success(data?.message);
        setIsDeleteModalOpen(false);
      }
      setIsDeleteLoading(false);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      setIsDeleteLoading(false);
    }
  }

  useEffect(() => {
    if (search == '') {
      getTaskList();
    }
  }, [search]);

  return (
    <div>
      <div className='mb-4 flex justify-between items-center py-1'>
        <Input className='w-1/3' size='large' placeholder='Search...' onChange={(e) => setSearch(e.target.value)} onPressEnter={getTaskList} allowClear prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>} />
        <Button type='primary' size='large' onClick={() => setIsOpenAddModal(true)}>Add New</Button>
      </div>
      <div className='border-2 rounded-md'>
        <Table loading={isLoading} columns={columns} dataSource={tasks}></Table>
      </div>

      {/* --- View Task --- */}
      <ModalComponent isOpen={isOpenViewModal} setIsOpen={setIsOpenViewModal} title={selectedTask?.title} width={600}>
        <p className='mt-4 text-[16px] text-gray-600'>{selectedTask?.description}</p>
        <div className='mt-7 flex justify-start'>
          {selectedTask?.isCompleted ? (
            <div className='bg-green-300 rounded-md items-center justify-center px-4'>
              <p className='font-semibold text-green-700 pb-1'>Completed</p>
            </div>
          ) : (
            <p className='bg-red-300 flex items-center justify-center rounded-md font-semibold text-red-700 pb-1 px-4'>Pending</p>
          )}
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4b5563" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            <p className='text-[16px] text-gray-600'>{(moment(selectedTask?.createdAt).format('LL'))}</p>
          </div>
          <div className='bg-red-200 flex items-center gap-1 py-1 px-3 rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="#b91c1c" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p className='text-red-700 font-semibold'>Due on {(moment(selectedTask?.dueDate).format('LL'))}</p>
          </div>
        </div>
      </ModalComponent>

      {/* --- Add Task --- */}
      <ModalComponent isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} title='Add new task' width={600}>
        <Form className='w-full mt-4' autoComplete="off" form={form} initialValues={initialValues} onFinish={addNewTask}>
          <div className='input-white'>
            <label className='text-base text-[#2F2B3DCC] font-medium'>Title</label>
            <Form.Item name="title" className='mb-0' rules={[{ required: true, message: 'Please enter title.' }]}>
              <Input placeholder="Title" className="mt-1 w-full ps-4 py-2" />
            </Form.Item>
          </div>
          <div className='input-white mt-2'>
            <label className='text-base text-[#2F2B3DCC] font-medium'>Description</label>
            <Form.Item name="description" className='mb-0' rules={[{ required: true, message: 'Please enter description.' }]}>
              <TextArea rows={4} placeholder="Description" className='mt-1' />
            </Form.Item>
          </div>
          <div className='input-white mt-2'>
            <label className='text-base text-[#2F2B3DCC] font-medium'>Due Date</label>
            <Form.Item name="dueDate" className='mb-0' rules={[{ required: true, message: 'Please select due date.' }]}>
              <DatePicker format='YYYY-MM-DD' className='w-full mt-1' size='large' disabledDate={(current) => current && current < new Date().setHours(0, 0, 0, 0)} />
            </Form.Item>
          </div>
          <LoadableButton
            className='bg-primary text-sm text-white font-medium uppercase px-8 py-2 mt-6 rounded-lg themeHover duration-500'
            type="submit"
            lable='Save'
            isLoading={isAddTaskLoading}
            loadingLable='Adding task...'
          />
        </Form>
      </ModalComponent>

      {/* --- Edit Task --- */}
      {initialValues?.title &&
        <ModalComponent isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal} title='Edit task' width={600}>
          <Form className='w-full mt-4' autoComplete="off" form={form} initialValues={initialValues} onFinish={addNewTask}>
            <div className='input-white'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Title</label>
              <Form.Item name="title" className='mb-0' rules={[{ required: true, message: 'Please enter title.' }]}>
                <Input placeholder="Title" className="mt-1 w-full ps-4 py-2" />
              </Form.Item>
            </div>
            <div className='input-white mt-2'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Description</label>
              <Form.Item name="description" className='mb-0' rules={[{ required: true, message: 'Please enter description.' }]}>
                <TextArea rows={4} placeholder="Description" className='mt-1' />
              </Form.Item>
            </div>
            <div className='input-white mt-2'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Due Date</label>
              <Form.Item name="dueDate" className='mb-0' rules={[{ required: true, message: 'Please select due date.' }]}>
                <DatePicker format='YYYY-MM-DD' className='w-full mt-1' size='large' disabledDate={(current) => current && current < new Date().setHours(0, 0, 0, 0)} />
              </Form.Item>
            </div>
            <LoadableButton
              className='bg-primary text-sm text-white font-medium uppercase px-8 py-2 mt-6 rounded-lg themeHover duration-500'
              type="submit"
              lable='Save'
              isLoading={isAddTaskLoading}
              loadingLable='Adding task...'
            />
          </Form>
        </ModalComponent>
      }

      {/* --- Status confirmation modal --- */}
      <ConfirmationModal
        isOpen={isStatusModalOpen}
        setIsOpen={setIsStatusModalOpen}
        message='Are you sure you want to change the status of this task?'
        onConfirm={statusHandler}
        isLoading={isStatusLoading}
        loadingLabel='Changing status...'
      />

      {/* --- Delete confirmation modal --- */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        message='Are you sure you want to remove this task?'
        onConfirm={deleteHandler}
        isLoading={isDeleteLoading}
        loadingLabel='Deleting task...'
      />
    </div>
  )
}