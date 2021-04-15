import React, { Component } from "react";
import Loader from "../../components/Loader/index";
import Carousel from "./Carousel";
import ListMovies from "./ListMovies";
import News from "./News";
import HomeApp from "./HomeApp";
import Partner from "./Partner";
import Footer from "../../components/Footer";
import callApi from "../../../api/index";
export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			carousels: [],
			showingFilms: [],
			commingFilms: [],
			news: [],
		};
	}

	getAllCarousels = () => {
		callApi.get("/carousels/getAllCarousels").then((allCarousels) => {
			this.getShowingFilms(allCarousels.data);
		});
	};

	getShowingFilms = (carouselsData) => {
		callApi.get("/films/getShowingFilms").then((showingFilms) => {
			this.getCommingFilms(carouselsData, showingFilms.data);
		});
	};

	getCommingFilms = (carouselsData, showingFilmsData) => {
		callApi.get("/films/getCommingFilms").then((commingFilms) => {
      this.getAllNews(carouselsData, showingFilmsData, commingFilms.data);
		});
	};

  getAllNews = (carouselsData, showingFilmsData, commingFilmsData) => {
    callApi.get("/news/getAllNews")
      .then((news) => {
        this.setState({
			    carousels: carouselsData,
		      showingFilms: showingFilmsData,
			    commingFilms: commingFilmsData,
          news: news.data,
          loading: false
        });
      })
  }

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
					<News listOfNews={this.state.news} />
					<HomeApp />
					<Partner />
					<Footer />
				</div>
			);
		}
	}
}

