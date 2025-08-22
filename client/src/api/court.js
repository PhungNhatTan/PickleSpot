import axios from 'axios';

const API_URL = 'http://localhost:3000/api/courts';

export const getFeaturedCourts = async () => {
  const res = await axios.get(`${API_URL}/featured`);
  return res.data;
};
