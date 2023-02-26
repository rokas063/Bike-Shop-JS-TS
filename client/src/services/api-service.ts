import axios from 'axios';

const API_BASE_URL = 'http://localhost:5024';

const ApiService = {
  async fetchBikes() {
    const response = await axios.get<BikesModel[]>(`${API_BASE_URL}/bikes`);
    return response.data;
  },

  async fetchBike(id: string | number) {
    const response = await axios.get<BikesModel>(`${API_BASE_URL}/bikes/${id}`);
    return response.data;
  },

  async createBike(bikeData: any) {
    const response = await axios.post(`${API_BASE_URL}/bikes`, bikeData);
    return response.data;
  },

  async updateBike(id: string | number, bikeData: any) {
    const response = await axios.put(`${API_BASE_URL}/bikes/${id}`, bikeData);
    return response.data;
  },

  async deleteBike(id: string | number) {
    const response = await axios.delete(`${API_BASE_URL}/bikes/${id}`);
    return response.data;
  },
};

export default ApiService;
