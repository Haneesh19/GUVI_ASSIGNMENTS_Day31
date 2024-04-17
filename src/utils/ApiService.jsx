import axios from 'axios'
const API_URL = "https://661fa5a416358961cd95010c.mockapi.io/"

const ApiService = axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type" : "application/json"
    }
})

export default ApiService;