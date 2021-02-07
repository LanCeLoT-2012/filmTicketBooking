import React, { Component } from "react";
import axios from "axios";

import CGVLogo from "../../../../assets/img/cgv.png";
import BHDStarLogo from "../../../../assets/img/bhd.png";
import GalaxyCinemaLogo from "../../../../assets/img/galaxycine.png";
import CinestarLogo from "../../../../assets/img/cinestar.png";
import LotteCinemaLogo from "../../../../assets/img/lotte.png";
import MegaGSLogo from "../../../../assets/img/megags.png";
export default class Showtimes extends Component {
	constructor(props) {
		super(props);
	}

	getUnique = (value, index, self) => {
		return self.indexOf(value) === index;
	};

	renderCinemaLogo = (showTimeCinemas) => {
		let cinemaBrands = [];
		showTimeCinemas.map((cinema) => {
			cinemaBrands.push(cinema.cinemaId.cinemaBrand.brandName);
		});
		const uniqueCinemas = cinemaBrands.filter(this.getUnique);
		return uniqueCinemas.map((cinemaBrand, index) => {
			const cinemaName = cinemaBrand.replace(" ", "");
			let cinemaLogo;
			switch (cinemaBrand) {
				case "CGV":
					cinemaLogo = CGVLogo;
					break;
				case "Lotte Cinema":
					cinemaLogo = LotteCinemaLogo;
					break;
				case "BHD Star":
					cinemaLogo = BHDStarLogo;
					break;
				case "Cinestar":
					cinemaLogo = CinestarLogo;
					break;
				case "Mega GS":
					cinemaLogo = MegaGSLogo;
					break;
				case "Galaxy Cinema":
					cinemaLogo = GalaxyCinemaLogo;
					break;
			}
			return (
				<li className='nav-item' key={index}>
					<a
						className={index === 0 ? "nav-link active" : "nav-link"}
						id={`${cinemaName}-Tab`}
						data-toggle='tab'
						href={`#${cinemaName}`}
						role='tab'
						aria-controls={cinemaName}
						aria-selected='true'
					>
						<img src={cinemaLogo} alt={`${cinemaName}Logo`} />
					</a>
				</li>
			);
		});
	};

	handleTicketCheckout = (showTimeId, startingTime) => {
		this.props.history.push(`/checkout/` + `${showTimeId}` + `?startingTime=${startingTime}`);
	}

	renderShowtimes = (showTimes, showTimeId) => {
		return showTimes.map((startingTime, index) => {
			return (
				<button onClick={() => { this.handleTicketCheckout(showTimeId, startingTime) }} key={index}>{startingTime}</button>
			)
		})
	}

	renderShowtimesInfomation = (filmShowtimes, cinemaName) => {
		return filmShowtimes.map((showTime, index) => {
			let showingDate = new Date(`${showTime.showDate}`);
			if (showTime.cinemaId.cinemaBrand.brandName === cinemaName) {
				return (
					<div className="showTime" key={index}>
						<div className='cinema_info'>
							<p>
								<span className='cinemaName' id={cinemaName.replace(" ", "")}>
									{cinemaName}
								</span>
								<span id='cinemaLocation'>
									{" "}
									- {showTime.cinemaId.cinemaName}
								</span>
							</p>
							<p id='cinemaAdd'>{showTime.cinemaId.address}</p>
							<p>Ngày chiếu: {showingDate.toLocaleDateString()}</p>
						</div>
						<div className='showTimes row'>
							<div className='left_Col col-3'>Các suất chiếu:</div>
							<div className='right_Col col-9'>
								{this.renderShowtimes(showTime.showTimes, showTime._id)}
							</div>
						</div>
					</div>
				);
			}
		});
	}

	renderCinemaShowtimeTabs = (showTimeCinemas, filmShowtimes) => {
		let cinemaBrands = [];
		showTimeCinemas.map((cinema) => {
			cinemaBrands.push(cinema.cinemaId.cinemaBrand.brandName);
		});
		const uniqueCinemas = cinemaBrands.filter(this.getUnique);
		return uniqueCinemas.map((cinemaName, index) => {
			let cinemaBrandName = cinemaName.replace(" ", "");
			return (
				<div
					key={index}
					className={
						`tab-pane fade ` + (index === 0 ? "show active" : "")
					}
					id={cinemaBrandName}
					role='tabpanel'
					aria-labelledby={cinemaBrandName + `-Tab`}
				>
					{this.renderShowtimesInfomation(filmShowtimes, cinemaName)}
				</div>
			);
		});
	};

	renderFilmShowtimes = (showTimeCinemas, filmShowtimes) => {
		return <>{this.renderCinemaShowtimeTabs(showTimeCinemas, filmShowtimes)}</>;
	};

	renderShowtimesTable = (showTimeCinemas, filmShowtimes) => {
		return (
			<div>
				{filmShowtimes.length === 0 ? (
					<div id='noShowNoti' className='alert alert-warning'>
						<p>Hiện tại chưa có suất chiếu cho phim này.</p>
					</div>
				) : (
					<div className='showTime_Table container'>
						<div className='row showTime_Col'>
							<div className='showTime_Left_Col col-2'>
								<ul
									className='nav nav-tabs'
									id='showTimeTabs'
									role='tablist'
								>
									{this.renderCinemaLogo(showTimeCinemas)}
								</ul>
							</div>
							<div className='showTime_Right_Col col-10'>
								<div
									className='tab-content'
									id='showTimesTabContent'
								>
									{this.renderFilmShowtimes(
										showTimeCinemas,
										filmShowtimes
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	render() {
		const { showTimeCinemas, filmShowtimes } = this.props;
		return (
			<section className='showtimes'>
				<div className='tix__container'>
					{this.renderShowtimesTable(showTimeCinemas, filmShowtimes)}
				</div>
			</section>
		);
	}
}
