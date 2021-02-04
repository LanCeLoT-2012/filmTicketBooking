import React, { Component } from "react";
import NormalSeat from "./NormalSeat";
import SweetBox from "./SweetBox";
import VipSeat from "./vipSeat";

import cgvLogo from "../../assets/img/cgv.png";
import bhdLogo from "../../assets/img/bhd.png";
import galaxyLogo from "../../assets/img/galaxycine.png";
import cineLogo from "../../assets/img/cinestar.png";
import lotteLogo from "../../assets/img/lotte.png";
import megaLogo from "../../assets/img/megags.png";

import Axios from "../../api/index";
export default class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filmData: {},
			cinemaId: "",
		};
	}

	renderCinemaLogo = (cinemaId) => {
		switch (cinemaId) {
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

	renderCinemaName = (cinemaId) => {
		switch (cinemaId) {
			case "c0":
				return <span>BHD - Star Cinema</span>;
			case "c1":
				return <span>CGV Cinema</span>;
			case "c2":
				return <span>CineStar Cinema</span>;
			case "c3":
				return <span>Galaxy Cinema</span>;
			case "c4":
				return <span>Lotte Cinema</span>;
			case "c5":
				return <span>MegaGS Cinema</span>;
		}
	};

	getQueryVariable = (variable) => {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return false;
	};

	UNSAFE_componentWillMount = () => {
		const { filmId } = this.props.match.params;
		const cinemaId = this.getQueryVariable("cinemaId");
		this.setState({ cinemaId: cinemaId });
		Axios.get(`/film/${filmId}`).then((result) => {
			console.log(result.data);
			this.setState({ filmData: result.data });
		});
	};

	render() {
		const { filmData } = this.state;
		return (
			<div className='chooseYourSeat'>
				<div className='container'>
					<div className='row'>
						<div className='cineSection col-9'>
							<div className='cineInformation'>
								<div className='cinema'>
									{this.renderCinemaLogo(this.state.cinemaId)}
									<div className='information'>
										<div>
											<p id='cinemaName'>
												{this.renderCinemaName(
													this.state.cinemaId
												)}
											</p>
											<p id='showTimes'>
												{this.getQueryVariable(
													"showDate"
												)} - {this.getQueryVariable("showTime")}
											</p>
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
								<p id='movieName'>{filmData.filmName}</p>
								<p id='cineInfo'>
									{this.renderCinemaName(this.state.cinemaId)}
								</p>
								<p id='movieTime'>
									{this.getQueryVariable("showDate")}
								</p>
							</div>
							<div className='ticket__info'>
								<p>
									<span id='seatValue'>Ghế:</span>
								</p>
								<input type='text' placeholder='Email ...' />
								<input type='text' placeholder='Phone ...' />
							</div>
							<div className='payment'>
								<p>Vui lòng chọn hình thức thanh toán</p>
								<div className='payment__type'>
									<div className='payment__select'>
										<input
											name='paySelect'
											type='radio'
											id='byCast'
											checked
										/>
										<label for='byCast'>
											Thanh toán bằng tiền mặt
										</label>
									</div>
									<div className='payment__select'>
										<input
											name='paySelect'
											type='radio'
											id='byBank'
										/>
										<label for='byBank'>
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
