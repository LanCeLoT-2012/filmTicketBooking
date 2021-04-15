import React, { Component } from "react";
import CinemaNew from "./cinemaNew";
export default class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listOfNews: [],
		};
	}


	renderHomeNews = () => {
		const { listOfNews } = this.props;
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
