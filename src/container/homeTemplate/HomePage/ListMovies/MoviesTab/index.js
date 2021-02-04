import React, { Component } from "react";
import Movie from "./../Movie";

export default class MoviesTab extends Component {
	renderMoviesTab = (moviesInTab) => {
		return moviesInTab.map((movie, index) => {
			return <Movie key={index} movie={movie} />;
		});
	};

	render() {
		return (
			<div className={`carousel-item ` + this.props.activeClass}>
				<div className='movies__tab'>
					<div className='moviesList row'>
						{this.renderMoviesTab(this.props.moviesInTab)}
					</div>
				</div>
			</div>
		);
	}
}
