import axios from 'axios';

const API_BASE_URL = 'http://localhost:5024';

export type Image = string;

export type BikesModel = {
  id: string;
  title: string;
  country: string;
  city: string;
  images: Image[];
  price: string;
};

const ApiService = {
  async fetchBikesById(id: string | number) {
    const response = await axios.get<BikesModel>(`${API_BASE_URL}/bikes/${id}`);
    return response.data;
  },

  async createBikes(bikesData: any) {
    const response = await axios.post(`${API_BASE_URL}/bikes`, bikesData);
    return response.data;
  },

  async updateBikes(id: string | number, bikesData: any) {
    const response = await axios.put<BikesModel>(`${API_BASE_URL}/bikes/${id}`, bikesData);
    return response.data;
  },

  async deleteBikes(id: string | number) {
    const response = await axios.delete(`${API_BASE_URL}/bikes/${id}`);
    return response.data;
  },

  async fetchBikes() {
    const response = await axios.get<BikesModel[]>(`${API_BASE_URL}/bikes`);
    return response.data;
  },
};

export default ApiService;
