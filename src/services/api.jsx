import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_LINK_API}`;

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
