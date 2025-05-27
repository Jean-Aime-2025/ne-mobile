import api from './api';

export const loginUser = async (username: string): Promise<User | null> => {
  const res = await api.get(`/users?username=${username}`);
  return res.data.length ? res.data[0] : null;
};
