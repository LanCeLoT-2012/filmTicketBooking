import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import ratingStar from "../../../../../assets/img/star1.png";
import ModalVideo from "react-modal-video";
class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		this.openModal = this.openModal.bind(this);
	}

	openModal() {
		this.setState({ isOpen: true });
	}

	getVideoId = (youtubeUrl) => {
		var videoId = youtubeUrl.match(
			/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
		); 
		return videoId[1];
	}

	handleFilmLabel = (filmLabel) => {	
		if (filmLabel === "P") {
			return "greenLabel";
		} else {
			return "redLabel";
		}
	};

	handleGetMovieDetail = (filmId, history) => {
		history.push(`films/${filmId}`);
	};

	render() {
		const { movie, history } = this.props;                        
		return (
			<div className='movieColumn col-6 col-sm-3 col-md-3 col-lg-3'>
				<div className='movie__image'>
					<img src={movie.thumbnail} alt={`${movie.filmName}`} />
					<div className='movie__point__label'>
						<div className='movie__point text-center'>
							<span>{movie.rating}</span>
						</div>
						<div className='movie__star text-center'>
							<img src={ratingStar} alt="ratingStar" />
							<img src={ratingStar} alt="ratingStar" />
							<img src={ratingStar} alt="ratingStar" />
							<img src={ratingStar} alt="ratingStar" />
							<img src={ratingStar} alt="ratingStar" />
						</div>
					</div>
					<div className='black__overlay'>
						<ModalVideo
							channel='youtube'
							isOpen={this.state.isOpen}
							videoId={this.getVideoId(movie.trailerLink)}
							onClose={() => this.setState({ isOpen: false })}
						/>
						<button onClick={this.openModal}>
							<i className="fa fa-play"></i>
						</button>
					</div>
				</div>
				<div className='movie__content'>
					<p id='filmName'>
						<span id={`${this.handleFilmLabel(movie.filmLabel)}`}>
							{movie.filmLabel}
						</span>
						{movie.filmName}
					</p>
					<p id='filmDuration'>{movie.duration}</p>'
					<div className='movieActions'>
						<div className='getDetail'>
							<button
								id='getDetail'
								onClick={() => {
									this.handleGetMovieDetail(
										movie._id,
										history
									);
								}}
							>
								CHI TIẾT
							</button>
						</div>
						<div className='getTicket'>
							<NavHashLink id='getTicket' smooth to={`/films/${movie._id}/#movieShowtimes`}>ĐẶT VÉ</NavHashLink>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Movie);
