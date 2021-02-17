import React, { cloneElement, Component } from "react";
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
			detailShowtime: {},
			bookingSeats: [],
			ticketPrice: 0,
		};
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
	};

	renderFilmLabel = (filmLabel) => {
		if (filmLabel === "P") {
			return "greenLabel";
		} else return "redLabel";
	};

	renderShowDate = (showDate) => {
		let currentDate = new Date();
		currentDate = currentDate.toLocaleDateString();
		let showingDate = new Date(`${showDate}`);
		showingDate = showingDate.toLocaleDateString();
		if (currentDate === showDate) {
			return <span>Hôm nay</span>;
		} else {
			return <span>{showingDate}</span>;
		}
	};

	handleChooseSeats = (seatInformation, rowPosition, colPosition) => {
		let { bookingSeats, ticketPrice } = this.state;
		let seatPrice = parseFloat(seatInformation.price);
		const seatPosition = `${rowPosition} - ${colPosition}`;
		if (bookingSeats.includes(seatPosition)) {
			let index = bookingSeats.indexOf(seatPosition);
			bookingSeats.splice(index, 1);
			ticketPrice -= seatPrice;
		} else {
			bookingSeats.push(`${rowPosition} - ${colPosition}`);
			ticketPrice += seatPrice;
		}
		this.setState({
			bookingSeats,
			ticketPrice
		})
	}

	renderBookingSeats = (bookingSeats) => {
		return bookingSeats.map((bookingSeat) => {
			return `${bookingSeat} `
		})
	}

	renderNormalSeats = (normalSeats, leftRightCenter) => {
		let columnSize;
		let rowPositionArr = [];
		let colPositionArr = [];
		if (leftRightCenter === "left") {
			columnSize = 6;
			rowPositionArr = ["A", "B", "C", "D", "E", "F"];
			colPositionArr = ["1", "2"];
		} else if (leftRightCenter === "right") {
			columnSize = 6;
			rowPositionArr = ["A", "B", "C", "D", "E", "F"];
			colPositionArr = ["9", "10"];
		} else if (leftRightCenter === "center") {
			columnSize = 2;
			rowPositionArr = ["A", "B", "C", "D"];
			colPositionArr = ["3", "4", "5", "6", "7", "8"];
		}
		let seatIndex = -1;
		return rowPositionArr.map((rowPosition, index) => {
			return colPositionArr.map((colPosition, index) => {
				seatIndex++;
				let isSeatChoosing = this.state.bookingSeats.includes(`${rowPosition} - ${colPosition}`);
				return (
					<button className={`seatCol col-${columnSize}`} onClick={() => { this.handleChooseSeats(normalSeats[seatIndex], rowPosition, colPosition) }}>
						<div id={isSeatChoosing ? "choosingSeat" : "normalSeat"}></div>
					</button>
				)
			})
		})
	};

	renderVipSeats = (vipSeats) => {
		const columnSize = 2;
		const rowPositionArr = ["E", "F"];
		const colPositionArr = ["3", "4", "5", "6", "7", "8"];
		let seatIndex = -1;
		return rowPositionArr.map((rowPosition, index) => {
			return colPositionArr.map((colPosition, index) => {
				seatIndex++;
				let isSeatChoosing = this.state.bookingSeats.includes(`${rowPosition} - ${colPosition}`);
				return (
					<button className={`seatCol col-${columnSize}`} onClick={() => { this.handleChooseSeats(vipSeats[seatIndex], rowPosition, colPosition) }}>
						<div id={isSeatChoosing ? "choosingSeat" : "vipSeat"}></div>
					</button>
				); 
			})
		})
	};

	renderSweetBoxs = (sweetBoxs) => {
		const rowPositionArr = ["G"];
		const colPositionArr = ["1 - 2", "3 - 4", "5 - 6", "7 - 8", "9 - 10"];
		let seatIndex = -1;
		return rowPositionArr.map((rowPosition, rowIndex) => {
			return colPositionArr.map((colPosition, colIndex) => {
				seatIndex++;
				let isSeatChoosing = this.state.bookingSeats.includes(`${rowPosition} - ${colPosition}`);
				if (seatIndex === 0) {
					return (
						<>
							<button className='sweetCol col-2' onClick={() => { this.handleChooseSeats(sweetBoxs[seatIndex], rowPosition, colPosition) }}>
								<div id={isSeatChoosing ? "choosingSeat" : "sweetBox"}></div>
							</button>
							<div className='walking_way col-1'></div>
						</>
					);
				} else if (seatIndex === 4) {
					return (
						<>
							<div className='walking_way col-1'></div>
							<button className='sweetCol col-2' onClick={() => { this.handleChooseSeats(sweetBoxs[seatIndex], rowPosition, colPosition) }}>
								<div id={isSeatChoosing ? "choosingSeat" : "sweetBox"}></div>
							</button>
						</>
					);
				} else {
					return (
						<>
							<button className='sweetCol col-2' onClick={() => { this.handleChooseSeats(sweetBoxs[seatIndex], rowPosition, colPosition) }}>
								<div id={isSeatChoosing ? "choosingSeat" : "sweetBox"}></div>
							</button>
						</>
					);
				}
			})
		})
	};

	componentDidMount = () => {
		const { showTimeId } = this.props.match.params;
		axios({
			url: `http://localhost:5000/api/showtimes/detailShowtime/${showTimeId}`,
			method: "GET",
		}).then((result) => {
			this.setState({
				detailShowtime: result.data,
				loading: false,
			});
		});
	};

	render() {
		if (this.state.loading === true) {
			return <Loading />;
		} else {
			const { detailShowtime } = this.state;
			const {
				normalSeats,
				vipSeats,
				sweetBoxs,
			} = detailShowtime.theaterId;
			/* --------------------------------- Divider -------------------------------- */
			let cinemaBrandName = detailShowtime.cinemaId.cinemaBrand.brandName.replace(
				" ",
				""
			);
			let queryString = this.props.location.search;

			const urlParams = new URLSearchParams(queryString);
			const startingTime = urlParams.get("startingTime");

			let leftSideSeats = [];
			let rightSideSeats = [];
			let centerSeatsSection = [];
			normalSeats.map((seat, index) => {
				if (0 <= index && index <= 11) {
					leftSideSeats.push(seat);
				} else if (32 <= index && index <= 43) {
					rightSideSeats.push(seat);
				} else {
					centerSeatsSection.push(seat);
				}
			});
			/* --------------------------------- Divider -------------------------------- */
			return (
				<div className='chooseYourSeat'>
					<div className='container'>
						<div className='row'>
							<div className='cineSection col-9'>
								<div className='cineInformation'>
									<div className='cinema'>
										{this.renderCinemaLogo(
											detailShowtime.cinemaId.cinemaBrand
												.brandName
										)}
										<div className='information'>
											<div>
												<p>
													<span id={cinemaBrandName}>
														{
															detailShowtime
																.cinemaId
																.cinemaBrand
																.brandName
														}
													</span>
													<span>
														{" "}
														-{" "}
														{
															detailShowtime
																.cinemaId
																.cinemaName
														}
													</span>
												</p>
												<p id='showTimes'>
													{this.renderShowDate(
														detailShowtime.showDate
													)}{" "}
													-{" "}
													<span>{startingTime}</span>{" "}
													-{" "}
													<span>
														{
															detailShowtime
																.theaterId
																.theaterName
														}
													</span>
												</p>
											</div>
										</div>
									</div>
									<div className='screen'>
										<div id='mainScreen'></div>
										<p>Màn hình</p>
									</div>
									<div className='seats_Section'>
										<div className='seats_Position'>
											<div className='col_Position text-white row'>
												<div className='column_pos col-1'>
													1
												</div>
												<div className='column_pos col-1'>
													2
												</div>
												<div className='column_pos col-1'></div>
												<div className='column_pos col-1'>
													3
												</div>
												<div className='column_pos col-1'>
													4
												</div>
												<div className='column_pos col-1'>
													5
												</div>
												<div className='column_pos col-1'>
													6
												</div>
												<div className='column_pos col-1'>
													7
												</div>
												<div className='column_pos col-1'>
													8
												</div>
												<div className='column_pos col-1'></div>
												<div className='column_pos col-1'>
													9
												</div>
												<div className='column_pos col-1'>
													10
												</div>
											</div>
											<div className='row_Position'>
												<div className='row_positions'>
													<p>A</p>
													<p>B</p>
													<p>C</p>
													<p>D</p>
													<p>E</p>
													<p>F</p>
													<p>G</p>
												</div>
											</div>
										</div>
										<div className='cineSeats row'>
											<div className='left_side_seats col-2'>
												<div className='normal_seats row'>
													{this.renderNormalSeats(
														leftSideSeats,
														"left"
													)}
												</div>
											</div>
											<div className='walking_way col-1'></div>
											<div className='center_seats_section col-6'>
												<div className='normal_seats row'>
													{this.renderNormalSeats(
														centerSeatsSection,
														"center"
													)}
												</div>
												<div className='vip_seats row'>
													{this.renderVipSeats(
														vipSeats
													)}
												</div>
											</div>
											<div className='walking_way col-1'></div>
											<div className='right_side_seats col-2'>
												<div className='normal_seats row'>
													{this.renderNormalSeats(
														rightSideSeats,
														"right"
													)}
												</div>
											</div>
											<div className='sweetBoxs_section col-12'>
												<div className='row'>
													{this.renderSweetBoxs(
														sweetBoxs
													)}
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
													<div className='choosing__Seat col-3'>
														<div id='choosingType'></div>
														<p>Ghế đang chọn</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='yourTicket col-3'>
								<div className='movie__info'>
									<p>
										<span
											id={this.renderFilmLabel(
												detailShowtime.filmId.filmLabel
											)}
										>
											{detailShowtime.filmId.filmLabel}
										</span>
										<span id='movieName'>
											{" "}
											- {detailShowtime.filmId.filmName}
										</span>
									</p>
									<p id='cinemaName'>
										{detailShowtime.cinemaId.cinemaName}
									</p>
									<p id='showDate'>
										{this.renderShowDate(
											detailShowtime.showDate
										)}{" "}
										- <span>{startingTime}</span> -{" "}
										<span>
											{
												detailShowtime.theaterId
													.theaterName
											}
										</span>
									</p>
								</div>
								<div className='ticket__info'>
									<p>
										<span id='seatValue'>Ghế: {this.renderBookingSeats(this.state.bookingSeats)}</span>
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
										<span id='total'>{this.state.ticketPrice+".000"}</span>
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
