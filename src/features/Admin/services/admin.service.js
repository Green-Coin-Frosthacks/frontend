import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
})

export async function getAllDustbins() {
    const res = await api.get("/iot/dustbins");
    return res.data;
}

export async function getTotalWeastDeposited() {
    const res = await api.get("/analytics/total");
    return res.data;
}

export async function getAllStudents() {
    const res = await api.get("/admin/students");
    return res.data;
}

export async function getStudentById(id){
    const res = await api.get(`/admin/students/${id}`);
    return res.data;
}

export async function updateStudentUID(id, uid){
    const res = await api.patch(`/admin/students/${id}/uid`, { uid });
    return res.data;
}
export async function deleteStudent(id){
    const res = await api.delete(`/admin/students/${id}`);
    return res.data;
}
export async function promoteToAdmin(id){
    const res = await api.patch(`/admin/users/${id}/promote`);
    return res.data;
}

export async function getOverallWeeklyAnalytics() {
    const res = await api.get("/analytics/weekly/college");
    return res.data;
}

export async function getUserWeeklyAnalytics(id) {
    const res = await api.get(`/analytics/weekly/user/${id}`);
    return res.data;
}

export async function leaderboard() {
    const res = await api.get("/leaderboard");
    return res.data;
}

export async function createDustbin(name, capacity, wasteType) {
    const res = await api.post("/iot/dustbin/create", { name, capacity, wasteType });
    return res.data;
}
export async function getMarketProducts() {
    const res = await api.get("/products");
    return res.data;
}

export async function createProduct(name, price, image) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    const res = await api.post("/admin/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export async function getNotification(){
    const res = await api.get("/admin/notifications");
    return res.data;
}

export async function getAllTransactions(filters = {}) {
    const params = new URLSearchParams();
    if (filters.uid) params.append("uid", filters.uid);
    if (filters.status) params.append("status", filters.status);
    if (filters.type) params.append("type", filters.type);
    if (filters.date) params.append("date", filters.date);
    const res = await api.get(`/admin/transactions?${params.toString()}`);
    return res.data;
}