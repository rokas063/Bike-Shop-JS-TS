import axios from 'axios';

const API_BASE_URL = 'http://localhost:5024';

const ApiService = {
  async fetchBikes() {
    const response = await axios.get<BikesModel[]>(`${API_BASE_URL}/bikes`);
    return response.data;
  },

  async fetchBikes(id: string | number) {
    const response = await axios.get<BikesModel>(`${API_BASE_URL}/bikes/${id}`);
    return response.data;
  },

  async createBikes(bikeData: any) {
    const response = await axios.post(`${API_BASE_URL}/bikes`, bikeData);
    return response.data;
  },

  async updateBikes(id: string | number, bikeData: any) {
    const response = await axios.put(`${API_BASE_URL}/bikes/${id}`, bikeData);
    return response.data;
  },

  async deleteBikes(id: string | number) {
    const response = await axios.delete(`${API_BASE_URL}/bikes/${id}`);
    return response.data;
  },
};

export default ApiService;
