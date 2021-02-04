import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class CinemaNew extends Component {
    isBordered = (newOrder) => {
        let borderClass = "haveBorder";
        if (newOrder % 2 === 0) {
            return borderClass;
        }
        else {
            return null;
        }
    };

	render() {
		const { cinemaNew, newOrder } = this.props;
		return (
			<div className='col-6'>
				<div className={`cinemaNew row ` + this.isBordered(newOrder)}>
					<div className='newThumbnail col-5'>
						<img src={cinemaNew.thumbnailLink} />
					</div>
					<div className='newPost col-7'>
						<NavLink id='newTitle' to={`/newDetail/${cinemaNew.newsId}`}>
							{cinemaNew.title}
						</NavLink>
						<p id='newContent'>{cinemaNew.content}</p>
					</div>
				</div>
			</div>
		);
	}
}
