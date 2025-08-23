import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/courts';

export const getFeaturedCourts = async () => {
  const res = await axios.get(`${API_URL}/featured`);
  return res.data;
};

export const searchCourts = async (params) => {
  const res = await axios.get(API_URL, { params }); 
  // Example: { name: "pickle", city: "Hanoi" }
  return res.data;
};

export const getCourt = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
