import React, { Component } from 'react'
import Navbar from "../../components/Navbar/index";
import Axios from "../../../api/index";
export default class ShowtimePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: "",
        }
    }

    UNSAFE_componentWillMount = () => {
        
    }
	isLoggedIn = () => {
		const isLoggedIn = Axios.get("/isLoggedIn").then((result) => {
			this.setState({
				isLoggedIn: result.data.isLoggedIn,
			});
		});
    };
    
	render() {
		return (
			<div>
				<Navbar />
			</div>
		);
	}
}
