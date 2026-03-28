import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export async function purchaseItem(data) {
    const res = await api.post("/vendor/buy", data);
    return res.data;
}
