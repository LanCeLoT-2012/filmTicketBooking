import React, { Component } from "react";
import CarouselItem from "./CarouselItem";
import CarouselIndicators from "./CarouselIndicators";
import "./../../../../sass/Layout/_carousel.scss";
import Axios from "../../../../api/index";
export default class Carousel extends Component {
	constructor(props) {
		super(props);
	}

	renderCarouselIndicators = (listMovies) => {
		if (listMovies && listMovies.length > 0) {
			return listMovies.map((movie, index) => {
				return (
					<CarouselIndicators
						key={index}
						slideTo={index}
						itemOrder={index}
					/>
				);
			});
		}
	};

	renderCarouselItem = (listMovies) => {
		if (listMovies && listMovies.length > 0) {
			return listMovies.map((movie, index) => {
				return <CarouselItem key={index} movie={movie} itemOrder={index} />;
			});
		}
	};

	render() {
		return (
			<div className='carouselSection'>
				<div className='navbarSection'></div>
				<div className='carousel__content'>
					<div
						id='carouselExampleIndicators'
						className='carousel slide'
						data-ride='carousel'
					>
						<ol className='carousel-indicators'>
							{this.renderCarouselIndicators(this.props.carousels)}
						</ol>
						<div className='carousel-inner'>
							{this.renderCarouselItem(this.props.carousels)}
						</div>
						<a
							className='carousel-control-prev left__control'
							href='#carouselExampleIndicators'
							role='button'
							data-slide='prev'
						>
							<i className='ionicons ion-ios-arrow-left' />
						</a>
						<a
							className='carousel-control-next right__control'
							href='#carouselExampleIndicators'
							role='button'
							data-slide='next'
						>
							<i className='ionicons ion-ios-arrow-right' />
						</a>
					</div>
				</div>
			</div>
		);
	}
}
