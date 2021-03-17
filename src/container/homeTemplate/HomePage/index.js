import React, { Component } from "react";
import Loader from "../../components/Loader/index";
import Carousel from "./Carousel";
import ListMovies from "./ListMovies";
import News from "./News";
import HomeApp from "./HomeApp";
import Partner from "./Partner";
import Footer from "../../components/Footer";
import axios from "axios";
export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			carousels: [],
			showingFilms: [],
			commingFilms: [],
		};
	}

	getAllCarousels = () => {
		axios({
			url: "http://localhost:5000/api/carousels/getAllCarousels",
			method: "GET",
		}).then((allCarousels) => {
			this.getShowingFilms(allCarousels.data);
		});
	};

	getShowingFilms = (carouselsData) => {
		axios({
			url: "http://localhost:5000/api/films/getShowingFilms",
			method: "GET",
		}).then((showingFilms) => {
			this.getCommingFilms(carouselsData, showingFilms.data);
		});
	};

	getCommingFilms = (carouselsData, showingFilmsData) => {
		axios({
			url: "http://localhost:5000/api/films/getCommingFilms",
			method: "GET",
		}).then((commingFilms) => {
			this.setState({
				loading: false,
				carousels: carouselsData,
				showingFilms: showingFilmsData,
				commingFilms: commingFilms.data,
			});
		});
	};

	componentDidMount = () => {
		this.getAllCarousels();
	};

	render() {
		if (this.state.loading) {
			return <Loader />;
		} else {
			return (
				<div>
					<Carousel carousels={this.state.carousels} />
					<ListMovies
						showingFilms={this.state.showingFilms}
						commingFilms={this.state.commingFilms}
					/>
					<News />
					<HomeApp />
					<Partner />
					<Footer />
				</div>
			);
		}
	}
}

