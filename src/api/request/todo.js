import api from "../index";

export const AddTaskApi = (params) => api.post('task/add', params);
export const GetTaskListApi = (params) => api.get(`task/list?${params}`);
export const ChangeStatusApi = (taskId, params) => api.patch(`task/completion/${taskId}`, params);
export const DeleteTaskApi = (taskId) => api.delete(`task/${taskId}`);