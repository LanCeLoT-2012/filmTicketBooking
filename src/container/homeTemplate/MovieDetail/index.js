import React, { Component } from "react";

import Loader from "../../components/Loader";

import Showtimes from "./Showtimes/index";
import MovieInfo from "./MovieInfo/index";
import Comments from "./Comments/index";

import ratingStar from "../../../assets/img/star1.png";
import ModalVideo from "react-modal-video";
import axios from "axios";

export default class MovieDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			film: {},
			showTimeCinemas: [],
			filmShowtimes: [],
			loading: true,
			isOpen: false,
		};
		this.openModal = this.openModal.bind(this);
	}

	openModal = () => {
		this.setState({ isOpen: true });
	};

	handleFilmLabel = (filmLabel) => {
		if (filmLabel === "P") {
			return "greenLabel";
		} else {
			return "redLabel";
		}
	};

	getVideoId = (youtubeUrl) => {
		var videoId = youtubeUrl.match(
			/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
		);
		return videoId[1];
	};

	getFilmShowtimes = (filmInfomation, showTimeCinemas) => {
		axios({
			url: `http://localhost:5000/api/showtimes/getShowtimes/${this.props.match.params.filmId}`,
			method: "GET",
		}).then((result) => {
			const filmShowtimes = result.data;
			this.setState({
				film: filmInfomation,
				showTimeCinemas,
				filmShowtimes,
				loading: false
			})
		})
	}

	getShowtimeCinemas = (filmInfomation) => {
		axios({
			url: `http://localhost:5000/api/showtimes/getCinemas/${this.props.match.params.filmId}`,
			method: "GET"
		}).then((result) => {
			const showTimeCinemas = result.data;
			this.getFilmShowtimes(filmInfomation, showTimeCinemas);
		})
	}

	getFilmInfomation = () => {	
		axios({
			url: `http://localhost:5000/api/films/getFilm/${this.props.match.params.filmId}`,
			method: "GET",
		}).then((result) => {
			const filmInfomation = result.data;
			this.getShowtimeCinemas(filmInfomation);
		});
	}

	componentDidMount = () => {
		this.getFilmInfomation();
	};

	renderMovieDetail = () => {
		const { film } = this.state;
		const userInformation = JSON.parse(window.localStorage.getItem("userInformation"));
		if (film) {
			return (
				<div>
					<div className='get__Detail'>
						<div className='background__blur'>
							<img
								id='blur__img'
								src={film.thumbnail}
								alt='This is a dog'
							/>
							<div className='black__overlay' />
						</div>
						<div className='movie__Detail'>
							<div className='container'>
								<div className='detail__Row row'>
									<div className='show__detail__left col-12 col-sm-8 col-md-9'>
										<div className='img__trailer'>
											<img
												src={film.thumbnail}
												alt='This is a dog'
											/>
											<ModalVideo
												channel='youtube'
												isOpen={this.state.isOpen}
												videoId={this.getVideoId(
													film.trailerLink
												)}
												onClose={() =>
													this.setState({
														isOpen: false,
													})
												}
											/>
											<button onClick={this.openModal}>
												<i className='fa fa-play'></i>
											</button>
										</div>
										<div className='blackOverlay'>
											<div className='movie__info'>
												<p id='movieName'>
													{film.filmName}
												</p>
												<p>
													<span
														id={`${this.handleFilmLabel(
															film.filmLabel
														)}`}
													>
														{film.filmLabel}
													</span>
													<span id='movieDuration'>
														{film.duration} -{" "}
													</span>
													<span id='IMDbPoint'>
														0 IMDb -{" "}
													</span>
													<span id='movieFormat'>
														2D/Digital
													</span>
												</p>
												<button
													type='button'
													id='getTicket'
												>
													MUA VÉ
												</button>
											</div>
										</div>
									</div>
									<div className='show__detail__right col-0 col-sm-4 col-md-3'>
										<div className='rating__section'>
											<div className='rating__circle'>
												<div className='outside__circle'>
													<div className='inside__circle'>
														<span id='ratingPoint'>
															{film.ratingPoint}
														</span>
													</div>
												</div>
											</div>
											<div
												id='rating__stars'
												className='rating__stars'
											>
												<div>
													<img
														src={ratingStar}
														alt='This is a dog'
													/>
													<img
														src={ratingStar}
														alt='This is a dog'
													/>
													<img
														src={ratingStar}
														alt='This is a dog'
													/>
													<img
														src={ratingStar}
														alt='This is a dog'
													/>
													<img
														src={ratingStar}
														alt='This is a dog'
													/>
												</div>
											</div>
											<div className='rating__numbers'>
												<p id='ratingNumbers'>
													250 người đánh giá
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='movieInformation'>
							<div className='container'>
								<div className='info__section'>
									<ul
										className='nav nav-tabs'
										id='myTab'
										role='tablist'
									>
										<li className='nav-item'>
											<a
												className='nav-link active'
												id='home-tab'
												data-toggle='tab'
												href='#showTime'
												role='tab'
												aria-controls='home'
												aria-selected='true'
											>
												Lịch chiếu
											</a>
										</li>
										<li className='nav-item'>
											<a
												className='nav-link'
												id='profile-tab'
												data-toggle='tab'
												href='#information'
												role='tab'
												aria-controls='profile'
												aria-selected='false'
											>
												Thông tin
											</a>
										</li>
										<li className='nav-item'>
											<a
												className='nav-link'
												id='contact-tab'
												data-toggle='tab'
												href='#reviews'
												role='tab'
												aria-controls='contact'
												aria-selected='false'
											>
												Đánh giá
											</a>
										</li>
									</ul>
									<div
										className='tab-content'
										id='myTabContent'
									>
										<div
											className='tab-pane fade show active'
											id='showTime'
											role='tabpanel'
											aria-labelledby='home-tab'
										>
											<Showtimes
												history={this.props.history}
												filmId={film._id}
												showTimeCinemas={
													this.state.showTimeCinemas
												}
												filmShowtimes={
													this.state.filmShowtimes
												}
											/>
										</div>
										<div
											className='tab-pane fade'
											id='information'
											role='tabpanel'
											aria-labelledby='profile-tab'
										>
											<MovieInfo
												movieInformation={film}
											/>
										</div>
										<div
											className='tab-pane fade'
											id='reviews'
											role='tabpanel'
											aria-labelledby='contact-tab'
										>
											<Comments
												filmId={
													this.props.match.params
														.filmId
												}
												userInformation={
													userInformation
												}
												filmComments={film.comments}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	};
	render() {
		if (this.state.loading) {
			return <Loader />;
		} else {
			return <div>{this.renderMovieDetail()}</div>;
		}
	}
}
