import React, { Component } from 'react'
import ratingStar from "../../../assets/img/star1.png";
import "../../../sass/Layout/_viewerComment.scss"

export default class ViewerComment extends Component {
    render() {
        return (
			<div className='viewerComment'>
				<div className='firstRow row'>
					<div className='col-8'>
						<div className='user__info'>
							<div className='user__avatar'>
								<i class='fa fa-user'></i>
							</div>
							<p>Liêu Gia Khánh</p>
						</div>
					</div>
					<div className='col-4'>
						<div className='viewerRating'>
							<div>
								<img src={ratingStar} />
								<img src={ratingStar}/>
								<img src={ratingStar}/>
								<img src={ratingStar}/>
								<img src={ratingStar}/>
							</div>
						</div>
					</div>
				</div>
				<div className='secondRow row'>
					<div className='comment col-12'>Phim này có vẻ hay !</div>
				</div>
			</div>
		);
    }
}
