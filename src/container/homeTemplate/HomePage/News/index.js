import React, { Component } from "react";
import CinemaNew from "./cinemaNew";
import Axios from "../../../../api/index";
export default class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listOfNews: [],
		};
	}

	componentDidMount = () => {
		Axios.get("/getAllNews")
			.then((result) => {
				this.setState({
					listOfNews: result.data,
				});
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	renderHomeNews = () => {
		const { listOfNews } = this.state;
		console.log(listOfNews);
		if (listOfNews) {
			return listOfNews.map((cinemaNew, index) => {
				let newOrder = index;
				return <CinemaNew key={index} newOrder={newOrder} cinemaNew={cinemaNew} />;
			});
		}
	};

	render() {
		return (
			<div className='newsSection'>
				<div className='container'>
					<h1>Tin tức</h1>
					<div className='row'>{this.renderHomeNews()}</div>
				</div>
			</div>
		);
	}
}
