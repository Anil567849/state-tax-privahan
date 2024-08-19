

import axios from "axios";
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/pdf',
    },
})
export const postTax = (data: string) => {
    // A Blob (Binary Large Object) is a data object that represents raw binary data, such as files or images. 
    return api.post('/api/generate', data, {responseType: 'blob'});
}