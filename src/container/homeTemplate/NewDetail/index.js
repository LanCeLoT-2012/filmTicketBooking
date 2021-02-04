import React, { Component } from "react";
import Navbar from "../../components/Navbar/index";
import Axios from "../../../api/index";

export default class NewDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: "",
			userAvatar: "",
			new: {
				thumbnailLink: "",
				content: "",
				videoLink: "",
				author: "",
				title: "",
				createAt: {
					_seconds: 0,
					_nanoseconds: 0,
				},
			},
		};
	}

	UNSAFE_componentWillMount = () => {
		Axios.get("/isLoggedIn").then((result) => {
			this.setState({
				isLoggedIn: result.data.isLoggedIn,
			});
		});
		Axios.get("/getUser").then((result) => {
			this.setState({
				userAvatar: result.data.avatar,
			});
		});
		const { newsId } = this.props.match.params;
		Axios.get(`/getNewsById/${newsId}`).then((result) => {
			this.setState({
				new: {
					thumbnailLink: result.data.thumbnailLink,
					content: result.data.content,
					videoLink: result.data.videoLink,
					author: result.data.author,
					title: result.data.title,
					createAt: result.data.createAt,
				},
			});
		});
	};

	render() {
		return (
			<div className='newDetail'>
				<Navbar
					isLoggedIn={this.state.isLoggedIn}
					userAvatar={this.state.userAvatar}
				/>
				<div className='postedNew'>
					<div className='newHeader'></div>
				</div>
			</div>
		);
	}
}
