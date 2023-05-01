import axios from "axios";

const BASE_URL = "http://localhost:5000";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getBag(token) {
    const config = createConfig(token)

    const promise = axios.get(`${BASE_URL}/cart`, config)

    return promise
}

function updateCart(token, productId, update) {
    const config = createConfig(token)

    const promise = axios.post(`${BASE_URL}/cart/${productId}?updateCart=${update}`, config)

    return promise
}

function getCheckout(token){
    const config = createConfig(token)

    const promise = axios.get(`${BASE_URL}/checkout`, config)

    return promise
}

const api = {
    getBag,
    updateCart,
    getCheckout
}

export default api
