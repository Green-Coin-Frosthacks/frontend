import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
})

export async function getWalletBalance() {
    const res = await api.get("/user/balance");
    return res.data;
}

export async function getProductsById(id){
    const res = await api.get(`/products/${id}`);
    return res.data;
}

export async function getMyweeklyAnalytics(){
    const res = await api.get("/analytics/weekly/my");
    return res.data;
}

export async function getMyOrders(){
    const res = await api.get("/user/orders");
    return res.data;
}

export async function getMyTransactions(){
    const res = await api.get("/user/transactions");
    return res.data;
}