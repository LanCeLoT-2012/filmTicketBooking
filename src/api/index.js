import axios from "axios";

const instance = axios.create({
	baseURL:
		"https://asia-east2-filmticketbooking-cae81.cloudfunctions.net/api",
	withCredentials: true
});

export default instance;