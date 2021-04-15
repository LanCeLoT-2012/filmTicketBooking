import axios from "axios";

const callApi = axios.create({
	baseURL: "https://fanxine-be.herokuapp.com/api",
	withCredentials: true,
});

export default callApi;