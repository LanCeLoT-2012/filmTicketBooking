import React, { Component } from 'react'
export default class MovieInfo extends Component {
    render() {
        const { movieInformation } = this.props;
		return (
			<div className='information__row row'>
				<div className='information__left col-12 col-sm-6'>
					<table className='text-white'>
						<tr key=''>
							<td>
								<p>Ngày công chiếu :</p>
							</td>
							<td>
								<p>{movieInformation.releaseDate}</p>
							</td>
						</tr>
						<tr key=''>
							<td>
								<p>Đạo diễn :</p>
							</td>
							<td>
								<p>{movieInformation.director}</p>
							</td>
						</tr>
						<tr key=''>
							<td>
								<p>Diễn viên :</p>
							</td>
							<td>
								<p>{movieInformation.actors}</p>
							</td>
						</tr>
						<tr key=''>
							<td>
								<p>Thể loại :</p>
							</td>
							<td>
								<p>{movieInformation.type}</p>
							</td>
						</tr>
						<tr key=''>
							<td>
								<p>Quốc gia sản xuất :</p>
							</td>
							<td>
								<p>{movieInformation.madeIn}</p>
							</td>
						</tr>
					</table>
				</div>
				<div className='information__right text-white col-12 col-sm-6'>
					<p>Nội dung :</p>
					<p>{movieInformation.description}</p>
				</div>
			</div>
		);
	}
}
