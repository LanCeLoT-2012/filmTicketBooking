import React, { Component } from "react";

export default class UserComment extends Component {
	render() {
    const { comment } = this.props;
		return (
			<div className='oneComment'>
				<div className='comment__header d-flex'>
					<div className='userAvatar'>
						<img src={comment.userId.avatar} />
					</div>
					<span id='userName'>{comment.userId.displayName}</span>
				</div>
				<div className='comment__body'>
					<p id='userComment'>{comment.content}</p>
				</div>
			</div>
		);
	}
}
