import React, { Component } from "react";
import Loading from "../../components/Loader/index";
import { Modal } from "react-bootstrap";
import axios from "axios";

// Import components
import CinemaCheckout from "./cinemaCheckout";
import CheckoutInformation from "./checkoutInformation";
export default class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "",
			httpStatus: 200,
			loading: true,
			detailShowtime: {},
			bookingSeatsPosition: [],
			bookingSeatIds: [],
			ticketPrice: 0,
			modalError: "",
			modalStatus: false,
		};
	}

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
		let { bookingSeatsPosition, ticketPrice, bookingSeatIds } = this.state;
		// Get seat's price
		let seatPrice = parseFloat(seatInformation.price);
		// Get seat's position
		const seatPosition = `${rowPosition} - ${colPosition}`;
		// Get seat's _id
		const seatId = seatInformation._id;
		if (bookingSeatIds.includes(seatId)) {
			let indexPosition = bookingSeatsPosition.indexOf(seatPosition);
			bookingSeatsPosition.splice(indexPosition, 1);
			let indexId = bookingSeatIds.indexOf(seatInformation._id);
			bookingSeatIds.splice(indexId, 1);
			ticketPrice -= seatPrice;
		} else {
			bookingSeatsPosition.push(seatPosition);
			bookingSeatIds.push(seatId);
			ticketPrice += seatPrice;
		}
		this.setState({
			bookingSeatsPosition,
			ticketPrice,
		});
	};

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
				if (normalSeats[seatIndex].status) {
					return (
						<button
							key={normalSeats[seatIndex]._id}
							className={`seatCol col-${columnSize}`}
						>
							<div className='choosenType'>
								<span>X</span>
							</div>
						</button>
					);
				} else {
					let isSeatChoosing = this.state.bookingSeatsPosition.includes(
						`${rowPosition} - ${colPosition}`
					);
					let seatIndexFunc = seatIndex;
					return (
						<button
							key={normalSeats[seatIndex]._id}
							className={`seatCol col-${columnSize}`}
							onClick={() => {
								this.handleChooseSeats(
									normalSeats[seatIndexFunc],
									rowPosition,
									colPosition
								);
							}}
						>
							<div
								className={
									isSeatChoosing
										? "choosingSeat"
										: "normalSeat"
								}
							></div>
						</button>
					);
				}
			});
		});
	};

	renderVipSeats = (vipSeats) => {
		const columnSize = 2;
		const rowPositionArr = ["E", "F"];
		const colPositionArr = ["3", "4", "5", "6", "7", "8"];
		let seatIndex = -1;
		return rowPositionArr.map((rowPosition, index) => {
			return colPositionArr.map((colPosition, index) => {
				seatIndex++;
				if (vipSeats[seatIndex].status) {
					return (
						<button
							key={vipSeats[seatIndex]._id}
							className={`seatCol col-${columnSize}`}
						>
							<div className='choosenType'>
								<span>X</span>
							</div>
						</button>
					);
				} else {
					let isSeatChoosing = this.state.bookingSeatsPosition.includes(
						`${rowPosition} - ${colPosition}`
					);
					let seatIndexFunc = seatIndex;
					return (
						<button
							key={vipSeats[seatIndex]._id}
							className={`seatCol col-${columnSize}`}
							onClick={() => {
								this.handleChooseSeats(
									vipSeats[seatIndexFunc],
									rowPosition,
									colPosition
								);
							}}
						>
							<div
								className={
									isSeatChoosing ? "choosingSeat" : "vipSeat"
								}
							></div>
						</button>
					);
				}
			});
		});
	};

	renderSweetBoxs = (sweetBoxs) => {
		const rowPositionArr = ["G"];
		const colPositionArr = ["1 - 2", "3 - 4", "5 - 6", "7 - 8", "9 - 10"];
		let seatIndex = -1;
		return rowPositionArr.map((rowPosition, rowIndex) => {
			return colPositionArr.map((colPosition, colIndex) => {
				seatIndex++;
				if (sweetBoxs[seatIndex].status) {
					if (seatIndex === 0) {
						return (
							<>
								<button className='sweetCol col-2'>
									<div className='choosenType'>
										<span>X</span>
									</div>
								</button>
								<div className='walking_way col-1'>X</div>
							</>
						);
					} else if (seatIndex === 4) {
						return (
							<>
								<div className='walking_way col-1'></div>
								<button className='sweetCol col-2'>
									<div className='choosenType'>
										<span>X</span>
									</div>
								</button>
							</>
						);
					}
				} else {
					let isSeatChoosing = this.state.bookingSeatsPosition.includes(
						`${rowPosition} - ${colPosition}`
					);
					let seatIndexFunc = seatIndex;
					if (seatIndex === 0) {
						return (
							<>
								<button
									className='sweetCol col-2'
									onClick={() => {
										this.handleChooseSeats(
											sweetBoxs[seatIndexFunc],
											rowPosition,
											colPosition
										);
									}}
								>
									<div
										className={
											isSeatChoosing
												? "choosingSeat"
												: "sweetBox"
										}
									></div>
								</button>
								<div className='walking_way col-1'></div>
							</>
						);
					} else if (seatIndex === 4) {
						return (
							<>
								<div className='walking_way col-1'></div>
								<button
									className='sweetCol col-2'
									onClick={() => {
										this.handleChooseSeats(
											sweetBoxs[seatIndexFunc],
											rowPosition,
											colPosition
										);
									}}
								>
									<div
										className={
											isSeatChoosing
												? "choosingSeat"
												: "sweetBox"
										}
									></div>
								</button>
							</>
						);
					} else {
						return (
							<>
								<button
									className='sweetCol col-2'
									onClick={() => {
										this.handleChooseSeats(
											sweetBoxs[seatIndexFunc],
											rowPosition,
											colPosition
										);
									}}
								>
									<div
										className={
											isSeatChoosing
												? "choosingSeat"
												: "sweetBox"
										}
									></div>
								</button>
							</>
						);
					}
				}
			});
		});
	};

	renderBookingSeats = (bookingSeats) => {
		return bookingSeats.map((bookingSeat, index) => {
			if (index === 0) {
				return `${bookingSeat}`;
			} else {
				return `, ${bookingSeat}`;
			}
		});
	};

	handleGetModalStatus = (type, modalStatus, modalError, httpStatus) => {
		this.setState({ type, modalStatus, modalError, httpStatus });
	};

	handleCloseModal = () => {
		this.setState({ modalStatus: false });
	};

	handleModalAction = (httpStatus) => {
		const { detailShowtime } = this.state;
		// User have not logged in
		if (httpStatus === 401) {
			return (
				<div className='notiAction'>
					<p id='modalNoti'>{this.state.modalError}</p>
					<button
						id='modalLogin'
						onClick={() => {
							this.props.history.push("/userLogin");
						}}
					>
						Đăng nhập
					</button>
				</div>
			);
		} else if (this.state.type === "bookingSuccess") {
			return (
				<>
					<div className='notiAction'>
						<p id='modalNoti'>{this.state.modalError}</p>
						<button id='modalLogin' onClick={() => this.props.history.push("/")}>
							X
						</button>
					</div>
					<div className='bookingTicket'>
						<p id='ticketInfo'>Thông tin vé của bạn:</p>
						<p>Tên phim: {detailShowtime.filmId.filmName}</p>
						<p>
							Thông tin rạp: {detailShowtime.cinemaId.cinemaName}{" "}
							- {detailShowtime.theaterId.theaterName}
						</p>
						<p>
							Suất Chiếu: {detailShowtime.showTimes} - Ngày:{" "}
							{this.renderShowDate(detailShowtime.showDate)}
						</p>
						<p>
							Vị trí:{" "}
							{this.renderBookingSeats(
								this.state.bookingSeatsPosition
							)}
						</p>
					</div>
				</>
			);
		} else {
			return (
				<div className='notiAction'>
					<p id='modalNoti'>{this.state.modalError}</p>
					<button id='closeModal' onClick={this.handleCloseModal}>
						X
					</button>
				</div>
			);
		}
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
			let queryString = this.props.location.search;
			const urlParams = new URLSearchParams(queryString);

			const startingTime = urlParams.get("startingTime");
			const showDate = this.renderShowDate(detailShowtime.showDate);

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
						<Modal
							id='checkoutModal'
							backdrop='static'
							keyboard={false}
							show={this.state.modalStatus}
							onHide={this.handleCloseModal}
						>
							<Modal.Body>
								{this.handleModalAction(this.state.httpStatus)}
							</Modal.Body>
						</Modal>
						<div className='row'>
							<div className='cineSection col-9'>
								<div className='cineInformation'>
									<CinemaCheckout
										detailShowtime={detailShowtime}
										startingTime={startingTime}
										showDate={showDate}
									/>
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
													<div className='choosen__Seat col'>
														<div id='choosenType'>
															<span>X</span>
														</div>
														<p>
															Ghế đã có người chọn
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<CheckoutInformation
								detailShowtime={detailShowtime}
								bookingSeatsPosition={
									this.state.bookingSeatsPosition
								}
								bookingSeatIds={this.state.bookingSeatIds}
								ticketPrice={this.state.ticketPrice}
								startingTime={startingTime}
								showDate={showDate}
								handleGetModalStatus={this.handleGetModalStatus}
							/>
						</div>
					</div>
				</div>
			);
		}
	}
}

