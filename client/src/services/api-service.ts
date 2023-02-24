import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5024',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const fetchBikes = async () => {
  const response = await api.get<BikesModel[]>('/bikes');

  return response.data;
};

const fetchBike = async (id: string | number) => {
  const response = await api.get<BikesModel>(`/bikes/${id}`);

  return response.data;
};

const ApiService = {
  fetchBikes,
  fetchBike,
};

export default ApiService;
