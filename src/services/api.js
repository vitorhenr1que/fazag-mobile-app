import axios from "axios";

export const api = axios.create({
    baseURL: 'https://fazag-next.vercel.app/api'
})

export const jaguar = axios.create({
    baseURL: 'http://jaguar.solutio.net.br:9002/jaguar'
})