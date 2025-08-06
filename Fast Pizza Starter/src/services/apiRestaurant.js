import axios from 'axios';

const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

export async function getMenu() {
  try {
    const response = await fetch(`${API_URL}/menu`);

    if (!response.ok) {
      console.error(await response.text());
    }
    const data = await response.json();

    data.time = Date.now();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getOrder(id) {
  await axios.get(`${API_URL}/order/${id}`);
}

export async function createOrder(newOrder) {
  await axios.post(`${API_URL}/order`, { newOrder });
}

export async function updateOrder(id, updateObj) {
  await axios.patch(`${API_URL}/order/${id}`, { updateObj });
}
