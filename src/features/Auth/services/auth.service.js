import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true,
})
export async function login(identifier, password){
    const res = await api.post('/login',{
        identifier,
        password,
    })
    return res.data;
}

export async function register(name,email,password,rollNo){
    const res = await api.post('/register',{
        name,
        email,
        password,
        rollNo,
    })
    return res.data;
}
export async function logout(){
    const res = await api.post('/logout');
    return res.data;
}
export async function getMe(){
    const res = await api.get('/getMe');
    return res.data;
}