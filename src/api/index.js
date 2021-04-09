import axios from "axios";

const instance = axios.create({
	baseURL: "https://fanxine-be.herokuapp.com/api",
	withCredentials: true,
});

export default instance;