import React, { Component } from "react";
import Loader from "../../components/Loader/index";
import Carousel from "./Carousel";
import ListMovies from "./ListMovies";
import News from "./News";
import HomeApp from "./HomeApp";
import Navbar from "../../components/Navbar";
import Partner from "./Partner";
import Footer from "../../components/Footer";
import axios from "axios";
import { connect } from "react-redux";
class HomePage extends Component {
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

	UNSAFE_componentWillMount = () => {
		const accessToken = window.localStorage.getItem("accessToken");
		if (!accessToken) {
			
		} else {
			axios({
				url: "http://localhost:5000/api/users/isLoggedIn",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			})
				.then((result) => {
					console.log(result);
					this.props.userAlreadyLoggedIn(result.data);
				})
				.catch((err) => {
					this.props.history.push("/userLogin");
				}); 
		}
	};

	componentDidMount = () => {
		this.getAllCarousels();
	};

	render() {
		const { user, isLoggedIn } = this.props;
		if (this.state.loading) {
			return <Loader />;
		} else {
			return (
				<div>
					<Navbar isLoggedIn={isLoggedIn} user={user} />
					<Carousel carousels={this.state.carousels} />
					<ListMovies
						showingFilms={this.state.showingFilms}
						commingFilms={this.state.commingFilms}
					/>
					{/* <News /> */}
					<HomeApp />
					<Partner />
					<Footer />
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.userLogonReducer.user,
		isLoggedIn: state.userLogonReducer.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userAlreadyLoggedIn: (data) => {
			dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
