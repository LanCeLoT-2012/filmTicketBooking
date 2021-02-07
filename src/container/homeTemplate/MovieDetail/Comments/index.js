import React, { Component, Alert } from "react";
import ratingStar from "../../../../assets/img/star1.png";
import UserComment from "./userComment";
import { connect } from "react-redux";
import axios from "axios";
class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filmComments: [],
			userComment: {
				content: "",
			},
		};
	}

	handleGetUserComment = (event) => {
		const { name, value } = event.target;
		this.setState({
			userComment: {
				[name]: value,
			},
		});
	};

	loginToComment = () => {
		const { isLoggedIn } = this.props;
		if (!isLoggedIn) {
			document.getElementById("login_Required").style.display = "block";
			document.getElementById("commentInput").disabled = true;
		}
	};

	handleAddComment = (event) => {
		event.preventDefault();
		axios({
			url: "http://localhost:5000/api/users/comment",
			method: "POST",
			data: {
				userId: this.props.user._id,
				content: this.state.userComment.content,
				filmId: this.props.filmId,
			},
		}).then(() => {
			event.target.reset();
			axios({
				url:
					`http://localhost:5000/api/films/getComments/${this.props.filmId}`,
				method: "GET",
			}).then((result) => {
				this.setState({
					filmComments: result.data.comments,
				})
			})
		});
	};

	renderAllComments = (allComments) => {
		if (allComments.length === 0) {
			return (
				<div id="noComments" className="alert alert-warning">
					<p>
						Hiện chưa có đánh giá nào cho bộ phim này !
					</p>
				</div>
			);
		} else {
			return allComments.map((comment, index) => {
				return <UserComment comment={comment} key={index} />;
			});
		}
	};

	UNSAFE_componentWillMount = () => {
		this.setState({
			filmComments: this.props.filmComments,
		});
	}

	render() {
		const { user } = this.props;
		return (
			<div>
				<div className='comments'>
					<form id='commentBox' onSubmit={this.handleAddComment}>
						<div className='write__comment row'>
							<div className='avatar col-9'>
								<div className='user__avatar'>
									<img src={user.avatar} />
								</div>
								<input
									id='commentInput'
									type='text'
									name='content'
									onChange={this.handleGetUserComment}
									onFocus={this.loginToComment}
									placeholder='Bạn nghĩ gì về phim này ... ?'
								/>
							</div>
							<div className='rate__stars col-3'>
								<img src={ratingStar} />
								<img src={ratingStar} />
								<img src={ratingStar} />
								<img src={ratingStar} />
								<img src={ratingStar} />
							</div>
						</div>
					</form>
				</div>
				<div id='viewersComments' className='viewer__commnent'>
					<div id='login_Required' className='alert alert-danger'>
						Bạn cần phải đăng nhập để bình luận về bộ phim này
					</div>
					{this.renderAllComments(this.state.filmComments)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.userLogonReducer.isLoggedIn,
	};
};

export default connect(mapStateToProps, null)(Comments);
