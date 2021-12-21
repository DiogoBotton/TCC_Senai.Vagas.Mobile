import axios from 'axios';

const api = axios.create({ baseURL: "http://wolfrosfay4-001-site1.btempurl.com/api/" })
//const api = axios.create({ baseURL: "http://localhost:5000/api/" })

export default api;