import axios from 'axios';

const api = axios.create({
  baseURL: 'https://67ac71475853dfff53dab929.mockapi.io/api/v1',
});

export default api;
