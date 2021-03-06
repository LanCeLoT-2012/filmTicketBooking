import React, { Component } from 'react'
export default class MovieInfo extends Component {
    render() {
		const { movieInformation } = this.props;
		let releaseDate = new Date(`${movieInformation.releaseDate}`);
		return (
			<div className='information__row row'>
				<div className='information__left col-12 col-sm-6'>
					<table className='text-white'>
						<tbody>
							<tr>
								<td>
									<p className="movieInfo">Ngày công chiếu :</p>
								</td>
								<td>
									<p>{releaseDate = releaseDate.toLocaleDateString()}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="movieInfo">Đạo diễn :</p>
								</td>
								<td>
									<p>{movieInformation.director}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="movieInfo">Diễn viên :</p>
								</td>
								<td>
									<p>{movieInformation.actors}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="movieInfo">Thể loại :</p>
								</td>
								<td>
									<p>{movieInformation.type}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="movieInfo">Quốc gia sản xuất :</p>
								</td>
								<td>
									<p>{movieInformation.madeIn}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='information__right text-white col-12 col-sm-6'>
					<p className="movieInfo">Nội dung :</p>
					<p>{movieInformation.description}</p>
				</div>
			</div>
		);
	}
}
