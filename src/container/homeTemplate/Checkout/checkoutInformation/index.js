import React, { Component } from "react";
import axios from "axios";

export default class CheckoutInfomation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalStatus: false,
			paymentMethod: "",
		};
	}

	renderFilmLabel = (filmLabel) => {
		if (filmLabel === "P") {
			return "greenLabel";
		} else return "redLabel";
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

	renderTicketTotalPrice = (ticketPrice) => {
		if (ticketPrice === 0) {
			return 0;
		} else {
			return ticketPrice + ".000";
		}
	};

	handleChoosePayMethod = (event) => {
		this.setState({ paymentMethod: event.target.name });
	};

	handleBookingTicket = (
		event,
		bookingSeatIds,
		showtimeId,
		paymentMethod
	) => {
		event.preventDefault();
		const bookingSeatsInfo = {
			showtimeId,
			bookingSeatIds,
			paymentMethod,
		};
		const accessToken = window.localStorage.getItem("accessToken");
		axios({
			url: "https://fanxine-be.herokuapp.com/api/showtimes/bookingSeats",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			data: bookingSeatsInfo,
			method: "POST",
		})
			.then((result) => {
				console.log(result.data);
				let type = "bookingSuccess";
				let httpStatus = 200;
				let modalStatus = true;
				this.props.handleGetModalStatus(
					type,
					modalStatus,
					result.data.message,
					httpStatus
				);
			})
			.catch((err) => {
				let type = "Error";
				let modalStatus = true;
				this.props.handleGetModalStatus(
					type,
					modalStatus,
					err.response.data.error,
					err.response.status
				);
			});
	};

	render() {
		const { detailShowtime } = this.props;
		return (
			<div className='checkoutInfomation col-3'>
				<form
					onSubmit={(event) => {
						this.handleBookingTicket(
							event,
							this.props.bookingSeatIds,
							detailShowtime._id,
							this.state.paymentMethod
						);
					}}
				>
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
							{this.props.showDate}
							<span>{this.props.startingTime}</span> -{" "}
							<span>{detailShowtime.theaterId.theaterName}</span>
						</p>
					</div>
					<div className='ticket__info'>
						<p>
							<span id='seatValue'>
								Ghế:{" "}
								{this.renderBookingSeats(
									this.props.bookingSeatsPosition
								)}
							</span>
						</p>
					</div>
					<div className='payment'>
						<p>Vui lòng chọn phương thức thanh toán :</p>
						<div className='payment__type'>
							<div className='payment__select'>
								<input
									name='eBanking'
									type='radio'
									id='byBank'
									onChange={this.handleChoosePayMethod}
								/>
								<label htmlFor='byBank'>
									Thanh toán điện tử
								</label>
							</div>
						</div>
					</div>
					<div className='complete'>
						<p id='summary'>
							<span id='total'>
								{this.renderTicketTotalPrice(
									this.props.ticketPrice
								)}
							</span>
						</p>
						<button type='submit' id='payAction'>
							Thanh toán
						</button>
					</div>
				</form>
			</div>
		);
	}
}
