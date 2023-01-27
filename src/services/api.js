import axios from "axios";

export const api = axios.create({
    baseURL: 'https://fazag-next.vercel.app/api'
})