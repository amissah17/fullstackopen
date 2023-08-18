import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseURL)
    return req.then(res => res.data)
}
const del = (id) => {
    const req = axios.delete(`${baseURL}/${id}`)
    return req.then(res => res.data)
}
const update = ( obj, id ) => {
    const req = axios.put(`${baseURL}/${id}`, obj)
    return req.then(res => res.data)
}
const add = ( obj ) => {
    const req = axios.post(baseURL, obj)
    return req.then(res => res.data)
}
export { getAll, del, update, add};