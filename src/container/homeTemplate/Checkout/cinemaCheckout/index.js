import React, { Component } from 'react'

// Import CinemaLogos
import CGVLogo from "../../../../assets/img/cgv.png";
import BHDStarLogo from "../../../../assets/img/bhd.png";
import GalaxyCinemaLogo from "../../../../assets/img/galaxycine.png";
import CinestarLogo from "../../../../assets/img/cinestar.png";
import LotteCinemaLogo from "../../../../assets/img/lotte.png";
import MegaGSLogo from "../../../../assets/img/megags.png";

export default class CinemaCheckout extends Component {
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

	render() {
		const { detailShowtime } = this.props;
		// Get Cinema's brand name
		let cinemaBrandName = detailShowtime.cinemaId.cinemaBrand.brandName.replace(
			" ",
			""
		);

        return (
            <>
                <div className='cinema'>
				{this.renderCinemaLogo(
					detailShowtime.cinemaId.cinemaBrand.brandName
				)}
				<div className='information'>
					<div>
						<p>
							<span id={cinemaBrandName}>
								{detailShowtime.cinemaId.cinemaBrand.brandName}
							</span>
							<span> - {detailShowtime.cinemaId.cinemaName}</span>
						</p>
						<p id='showTimes'>
							{this.props.showDate} -{" "}
							<span>{this.props.startingTime}</span> -{" "}
							<span>{detailShowtime.theaterId.theaterName}</span>
						</p>
					</div>
				</div>
            </div>
            <div className='screen'>
				<div id='mainScreen'></div>
				<p>Màn hình</p>
		    </div>
            </>
		);
	}
}
