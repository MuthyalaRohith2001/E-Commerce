import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGJkNzI1MWFiZGJiZWRjNzdlOGY3YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc2Njk5MDcxOCwiZXhwIjoxNzY3MjQ5OTE4fQ.duF5aTpAkHp8rGMik2YRjT-Pi8bAmlL9VD-O6-rjAyY"

/*used at the time of login */
export const publicRequest = axios.create({
    baseURL: BASE_URL
});



export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` }

})