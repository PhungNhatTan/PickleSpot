import { apiGet } from "./client.js";

export const searchCourts = (params) => apiGet("/courts/search", params);
export const getCourt = (id) => apiGet(`/courts/${id}`);
