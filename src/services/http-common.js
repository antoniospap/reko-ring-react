import axios from "axios";

export default axios.create({
    baseURL: "https://data.mongodb-api.com/app/reko-ring-ucpod/endpoint/", //http://localhost:5000/api
    headers: {
        "Content-type": "application/json"
    }
})