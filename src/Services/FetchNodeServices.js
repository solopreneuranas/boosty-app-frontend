import axios from "axios";

// const serverURL = "http://localhost:3500"
// const serverURL = "https://boosty-app-backend.onrender.com"
// const serverURL = 'http://3.109.154.56'
const serverURL = 'https://boosty-app-backend-production.up.railway.app'

const postData = async (url, body) => {
    try {
        var response = await axios.post(`${serverURL}/${url}`, body)
        var data = response.data
        return data
    }
    catch (e) {
        return null
    }
}

const getData = async (url) => {
    try {
        var response = await axios.get(`${serverURL}/${url}`)
        var data = response.data
        return data
    }
    catch (e) {
        return null
    }
}

export { serverURL, postData, getData }