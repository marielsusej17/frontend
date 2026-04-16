import api from '../api/axios';

export const loginRequest = (data) =>
  api.post('/auth/login', data);