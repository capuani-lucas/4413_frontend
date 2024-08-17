import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/query";


const baseUrl = 'http://localhost:8000';

export const getAuthBaseQuery = (path: string) => {
  return async (args: any, api: BaseQueryApi, extraOptions: any) => {
    const token = localStorage.getItem('token');
    let headers = {};
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`
      }
    }
    const result = await fetchBaseQuery({ baseUrl: `${baseUrl}/${path}`, headers })(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return result;
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
