import React, { Component } from "react";
import CinemaNew from "./cinemaNew";
import axios from "axios";
export default class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listOfNews: [],
		};
	}

	componentDidMount = () => {
		axios({
			url: "https://fanxine-be.herokuapp.com/api/news/getAllNews",
			method: "GET",
		}).then((result) => {
			this.setState({ listOfNews: result.data });
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
			<div id="news" className='newsSection'>
				<div className='container'>
					<h1>Tin tức</h1>
					<div className='row'>{this.renderHomeNews()}</div>
				</div>
			</div>
		);
	}
}
