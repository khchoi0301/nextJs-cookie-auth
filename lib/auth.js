import axios from "axios"

axios.defaults.withCredentials = true;
// request header에 cookie를 포함하도록 설정, XMLHttpRequest에도 동일 property가 존재함

export const loginUser = async (email, password) => {
    const { data } = await axios.post('api/login', { email, password })
    console.log(data)
}

export const getUserProfile = async () => {
    const { data } = await axios.get('/api/profile');
    return data
}