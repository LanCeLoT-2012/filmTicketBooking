import React, { Component } from "react";
import NormalSeat from "./NormalSeat";
import SweetBox from "./SweetBox";
import VipSeat from "./vipSeat";
import Loading from "../../components/Loader/index";
import axios from "axios";

import CGVLogo from "../../../assets/img/cgv.png";
import BHDStarLogo from "../../../assets/img/bhd.png";
import GalaxyCinemaLogo from "../../../assets/img/galaxycine.png";
import CinestarLogo from "../../../assets/img/cinestar.png";
import LotteCinemaLogo from "../../../assets/img/lotte.png";
import MegaGSLogo from "../../../assets/img/megags.png";

export default class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			detailShowtime: {}
		}
	}

	renderCinemaLogo = (cinemaBrandName) => {
		switch (cinemaBrandName) {
			case "CGV":
				return <img src={CGVLogo} alt='CGVLogo' />;
			case "BHD Star":
				return <img src={BHDStarLogo} alt='BHDStarLogo' />;
			case "Galaxy Cinema":
				return <img src={GalaxyCinemaLogo} alt='GalaxyCinemaLogo' />;
			case "Cinestar":
				return <img src={CinestarLogo} alt='CinestarLogo' />;
			case "Lotte Cinema":
				return <img src={LotteCinemaLogo} alt='LotteCinemaLogo' />;
			case "Mega GS":
				return <img src={MegaGSLogo} alt='MegaGSLogo' />;
		}
	}

	renderFilmLabel = (filmLabel) => {
		if (filmLabel === "P") {
			return "greenLabel";
		} else return "redLabel"
	}

	renderShowDate = (showDate) => {
		let currentDate = new Date();
		currentDate = currentDate.toLocaleDateString();
		let showingDate = new Date(`${showDate}`);
		showingDate = showingDate.toLocaleDateString();
		if (currentDate === showDate) {
			return <span>Hôm nay</span>;
		} else {
			return <span>{showingDate}</span>
		}
	}

	componentDidMount = () => {
		const { showTimeId } = this.props.match.params;
		axios({
			url: `http://localhost:5000/api/showtimes/detailShowtime/${showTimeId}`,
			method: "GET"
		}).then((result) => {
			this.setState({
				detailShowtime: result.data,
				loading: false
			})
		})
	}

	render() {
		const { detailShowtime } = this.state;	
		if(this.state.loading === true) {
			return <Loading />
		} else {
			let cinemaBrandName = detailShowtime.cinemaId.cinemaBrand.brandName.replace(" ", "");
			let queryString = this.props.location.search;
			const urlParams = new URLSearchParams(queryString);
			const startingTime = urlParams.get("startingTime");
			return (
				<div className='chooseYourSeat'>
					<div className='container'>
						<div className='row'>
							<div className='cineSection col-9'>
								<div className='cineInformation'>
									<div className='cinema'>
										{this.renderCinemaLogo(detailShowtime.cinemaId.cinemaBrand.brandName)}
										<div className='information'>
											<div>
												<p><span id={cinemaBrandName}>{detailShowtime.cinemaId.cinemaBrand.brandName}</span><span> - {detailShowtime.cinemaId.cinemaName}</span></p>
												<p id='showTimes'>{this.renderShowDate(detailShowtime.showDate)} - <span>{startingTime}</span> - <span>{detailShowtime.theaterId.theaterName}</span></p>
											</div>
										</div>
									</div>
									<div className='screen'>
										<div id='mainScreen'></div>
										<p>Màn hình</p>
									</div>
									<div className='cineSeats'>
										<div className='seatsRow row'>
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
										</div>
										<div className='seatsRow row'>
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
										</div>
										<div className='seatsRow row'>
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
										</div>
										<div className='emptyRow'></div>
										<div className='seatsRow row'>
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
										</div>
										<div className='seatsRow row'>
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<VipSeat />
											<VipSeat />
											<VipSeat />
											<VipSeat />
											<VipSeat />
											<VipSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
										</div>
										<div className='seatsRow row'>
											<NormalSeat />
											<NormalSeat />
											<div className='walkingWay col-1'></div>
											<VipSeat />
											<VipSeat />
											<VipSeat />
											<VipSeat />
											<VipSeat />
											<VipSeat />
											<div className='walkingWay col-1'></div>
											<NormalSeat />
											<NormalSeat />
										</div>
										<div className='emptyRow'></div>
										<div className='seatsRow row'>
											<SweetBox />
											<div className='walkingWay col-1'></div>
											<SweetBox />
											<SweetBox />
											<SweetBox />
											<div className='walkingWay col-1'></div>
											<SweetBox />
										</div>
									</div>
									<div className='seatType'>
										<div className='row seatType__row'>
											<div className='normalSeat col-3'>
												<div id='normalType'></div>
												<p>Ghế thường</p>
											</div>
											<div className='vipSeat col-3'>
												<div id='vipType'></div>
												<p>Ghế VIP</p>
											</div>
											<div className='sweatBox col-3'>
												<div id='sweatType'></div>
												<p>Ghế đôi</p>
											</div>
											<div className='choosen__Seat col-3'>
												<div id='choosenType'></div>
												<p>Ghế đã chọn</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='yourTicket col-3'>
								<div className='movie__info'>
									<p><span id={this.renderFilmLabel(detailShowtime.filmId.filmLabel)}>{detailShowtime.filmId.filmLabel}</span><span id="movieName"> - {detailShowtime.filmId.filmName}</span></p>
									<p id='cinemaName'>{detailShowtime.cinemaId.cinemaName}</p>
									<p id='showDate'>{this.renderShowDate(detailShowtime.showDate)} - <span>{startingTime}</span> - <span>{detailShowtime.theaterId.theaterName}</span></p>
								</div>
								<div className='ticket__info'>
									<p>
										<span id='seatValue'>Ghế:</span>
									</p>
									<input
										type='text'
										placeholder='Email ...'
									/>
									<input
										type='text'
										placeholder='Phone ...'
									/>
								</div>
								<div className='payment'>
									<p>Vui lòng chọn hình thức thanh toán</p>
									<div className='payment__type'>
										<div className='payment__select'>
											<input
												name='paySelect'
												type='radio'
												id='byCast'
											/>
											<label htmlFor='byCast'>
												Thanh toán bằng tiền mặt
											</label>
										</div>
										<div className='payment__select'>
											<input
												name='paySelect'
												type='radio'
												id='byBank'
											/>
											<label htmlFor='byBank'>
												Thanh toán bằng thẻ ATM
											</label>
										</div>
									</div>
								</div>
								<div className='complete'>
									<p id='summary'>
										<span id='total'>90.000 Đồng</span>
									</p>
									<button type='button' id='payAction'>
										Thanh toán
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
