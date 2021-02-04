import React, { Component } from "react";
import axios from "axios";

import cgvLogo from "../../../../assets/img/cgv.png";
import bhdLogo from "../../../../assets/img/bhd.png";
import galaxyLogo from "../../../../assets/img/galaxycine.png";
import cineLogo from "../../../../assets/img/cinestar.png";
import lotteLogo from "../../../../assets/img/lotte.png";
import megaLogo from "../../../../assets/img/megags.png";
export default class Showtimes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			haveShowtimes: false,
		};
	}

	renderCinemaLogo = (maHeThongRap) => {
		switch (maHeThongRap) {
			case "c0":
				return <img src={bhdLogo} alt />;
			case "c1":
				return <img src={cgvLogo} alt />;
			case "c2":
				return <img src={cineLogo} alt />;
			case "c3":
				return <img src={galaxyLogo} alt />;
			case "c4":
				return <img src={lotteLogo} alt />;
			case "c5":
				return <img src={megaLogo} alt />;
		}
	};

	getCinemasByFilm = () => {
		axios({
			url: `http://localhost:5000/api/showtimes/getCinemas/${this.props.filmId}`,
			method: "GET",
		}).then((result) => {
			console.log(result.data);
			this.getShowtimesByFilm(result.data);
		});
	};

	getShowtimesByFilm = (showtimeCinemas) => {
		if (showtimeCinemas.length === 0) {
			this.setState();
		}
	};

	UNSAFE_componentWillMount = () => {
		this.getCinemasByFilm();
	};

	render() {
		console.log(this.state.haveShowtimes);
		return (
			<section className='showtimes'>
				<div className='tix__container'>
					{!this.state.haveShowtimes ? (
						<div id='noShowNoti' className='alert alert-warning'>
							<p>Hiện tại chưa có suất chiếu cho phim này.</p>
						</div>
					) : (
						<div className='tix__content border row'>
							<div className='col-sm-2 d-flex pl-0 mr-0 tix__left__col'>
								<ul
									className='nav nav-tabs'
									id='showtheature__myTab'
									role='tablist'
								></ul>
							</div>
							<div className='col-sm-10 d-flex tix__right__col'>
								<div
									class='tab-content'
									id='showTimes__myTabContent'
								></div>
							</div>
						</div>
					)}
				</div>
			</section>
		);
	}
}
