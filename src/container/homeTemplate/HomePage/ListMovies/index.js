import React, { Component } from "react";
import MoviesTab from "./MoviesTab";

export default class ListMovies extends Component {
	renderListMovies = (listMovies) => {
		return this.renderMoviesTabs(listMovies);
	};

	renderMoviesTabs = (listMovies) => {
		if (listMovies && listMovies.length > 0) {
			let moviesInTab = []; // Mảng lưu các phim trong một trang
			let pageNumber = 0; // Số trang đã được tạo ra
			let moviesAdded = 0; // Số phim đã được duyệt qua
			return listMovies.map((movie) => {
				if (listMovies.length <= 8) {
					// Nếu số phim đang chiếu hoặc sắp chiếu ít hơn 8
					moviesInTab.push(movie); // Thêm phim vào trang
					if (moviesInTab.length === listMovies.length) {
						// Nếu số phim thêm vào trang bằng số phim đang chiếu hoặc sắp chiếu
						return (
							// Tạo ra một trang mới
							<MoviesTab
								key={pageNumber}
								activeClass='active'
								moviesInTab={moviesInTab}
							/>
						);
					}
				} else if (listMovies.length > 8) {
					//  Nếu số phim đang chiếu hoặc sắp chiếu lớn hơn 8
					moviesInTab.push(movie); // Thêm phim vào trang
					moviesAdded += 1; // Tăng số phim được thêm lên 1 ( Số phim đã duyệt qua )
					if (moviesInTab.length === 8) {
						let moviesAddedInTab = [];
						// Nếu số phim được thêm vào một trang bằng 8
						moviesAddedInTab = [...moviesInTab]; // Tạo một mảng mới sao chép mảng các phim đã thêm
						moviesInTab.splice(0, moviesInTab.length); // Xóa các phim đã thêm trong danh sách cũ
						pageNumber += 1; // Tăng số trang lên 1
						if (pageNumber === 1) {
							// Tạo ra một trang mới có lớp là active ( Do xuất hiện đầu tiên )
							return (
								<MoviesTab
									key={pageNumber}
									activeClass='active'
									moviesInTab={moviesAddedInTab}
								/>
							);
						} else {
							// Tạo ra một trang mới không có lớp active ( Do xuất hiện sau )
							return (
								<MoviesTab
									key={pageNumber + 1}
									activeClass=''
									moviesInTab={moviesAddedInTab}
								/>
							);
						}
					} else {
						if (moviesAdded === listMovies.length) {
							// Nếu số phim đã thêm và số phim bằng nhau và số phim trong 1 trang không đủ 8
							return (
								<MoviesTab
									key={pageNumber + 1}
									activeClass=''
									moviesInTab={moviesInTab}
								/>
							);
						}
					}
				}
			});
		}
	};

	render() {
		return (
			<div id='showtimes' className='comingSoon'>
				<div className='comingSoon__content tix__container container'>
					<div className='moviesSection'>
						<ul className='nav nav-tabs' id='myTab' role='tablist'>
							<li className='nav-item active' role='presentation'>
								<a
									className='nav-link active'
									id='home-tab'
									data-toggle='tab'
									href='#playingMovie'
									role='tab'
									aria-controls='home'
									aria-selected='true'
								>
									Phim đang chiếu
								</a>
							</li>
							<li className='nav-item' role='presentation'>
								<a
									className='nav-link'
									id='home-tab'
									data-toggle='tab'
									href='#comingMovie'
									role='tab'
									aria-controls='home'
									aria-selected='true'
								>
									Phim sắp chiếu
								</a>
							</li>
							<div className='tab-content' id='myTabContent'>
								<div
									className='tab-pane fade show active single-item'
									id='playingMovie'
									role='tabpanel'
									aria-labelledby='home-tab'
								>
									<div
										id='playingMoviesCarousel'
										className='carousel slide'
										data-ride='carousel'
										data-interval='false'
									>
										<div className='carousel-inner'>
											{this.renderListMovies(
												this.props.showingFilms
											)}
										</div>
										<a
											className='carousel-control-prev left__control'
											href='#playingMoviesCarousel'
											role='button'
											data-slide='prev'
										>
											<i className='ionicons ion-ios-arrow-left' />
										</a>
										<a
											className='carousel-control-next right__control'
											href='#playingMoviesCarousel'
											role='button'
											data-slide='next'
										>
											<i className='ionicons ion-ios-arrow-right' />
										</a>
									</div>
								</div>
								<div
									className='tab-pane fade show single-item'
									id='comingMovie'
									role='tabpanel'
									aria-labelledby='home-tab'
								>
									<div
										id='comingMoviesCarousel'
										className='carousel slide'
										data-ride='carousel'
										data-interval='false'
									>
										<div className='carousel-inner'>
											{this.renderListMovies(
												this.props.commingFilms
											)}
										</div>
										<a
											className='carousel-control-prev left__control'
											href='#comingMoviesCarousel'
											role='button'
											data-slide='prev'
										>
											<i className='ionicons ion-ios-arrow-left' />
										</a>
										<a
											className='carousel-control-next right__control'
											href='#comingMoviesCarousel'
											role='button'
											data-slide='next'
										>
											<i className='ionicons ion-ios-arrow-right' />
										</a>
									</div>
								</div>
							</div>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
