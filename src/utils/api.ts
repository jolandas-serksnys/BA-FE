import { userQueryKey } from "@src/hooks/user";
import { User } from "@src/models/user";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}/api`,
});
api.defaults.headers.common.Authorization = `Bearer token`;

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(userQueryKey);

    config.headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'allowOrigin': process.env.API_BASE_URL,
    }
    return config;
  },
  (error) => {
    Promise.reject(error)
  }
);

api.interceptors.response.use(
  async (response) => {
    const data = response.data;
    if (data.message) {
      let message;

      if (data.message instanceof Array) {
        message = (data.message as string[]).join('\n');
      } else if (typeof data.message === 'string') {
        message = String(data.message);
      } else {
        message = JSON.stringify(data.message);
      }
      if (message && data.isSuccessful) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }

    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      const userData = JSON.parse(localStorage.getItem(`${userQueryKey}-data`)) as User;
      localStorage.removeItem(userQueryKey);
      localStorage.removeItem(`${userQueryKey}-data`);

      if (userData.isEmployee) {
        window.location.href = '/e/sign-in';
      } else {
        window.location.href = '/';
      }
    }

    const data = error.response.data;
    if (data.message) {
      let message;

      if (data.message instanceof Array) {
        message = (data.message as string[]).join('\n');
      } else if (typeof data.message === 'string') {
        message = String(data.message);
      } else {
        message = JSON.stringify(data.message);
      }

      if (message && data.isSuccessful) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }

    Promise.reject(error)
  }
);

export default api;