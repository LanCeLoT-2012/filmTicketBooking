import React, { Component } from "react";
import UserComment from "./userComment";
import defaultAvatar from "../../../../assets/img/avatar.png";
import { withRouter } from "react-router-dom";
import callApi from "../../../../api/index";
class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInformation: {
				_id: null,
				email: "",
				displayName: "",
				avatar: defaultAvatar,
			} ,
			filmComments: [],
			userComment: {
				content: "",
			},
		};
	}

	handleGetUserComment = (event) => {
		this.setState({
			userComment: {
        content: event.target.value
			},
		});
	};

	handleAddComment = (event) => {
    event.preventDefault();
    const accessToken = window.localStorage.getItem("accessToken")
    callApi.post("/users/comment", {
        filmId: this.props.filmId,
        content: this.state.userComment.content
    } ,{
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        callApi.get(`films/getComments/${this.props.filmId}`)
          .then((result) => {
            this.setState({
              filmComments: result.data.comments,
              userComment: {
                content: ""
              }
			      });
          })
      }) 
      .catch((err) => {
        const { status } = err.response;
        const { error, message } = err.response.data;
        if (status === 401 && error === "Unauthorized !") {
          const userCommentInput = document.getElementById("login_Required");
          userCommentInput.style.display = "block";
          userCommentInput.disabled = true;
        } else if (status === 401 && error === "Expired Token !") {
          this.props.history.push({ pathname: "/userLogin", state: { message } });
        }
      })
	};

  renderAllComments = (allComments) => {
		if (allComments.length === 0) {
			return (
				<div id='noComments' className='alert alert-warning'>
					<p>Hiện chưa có đánh giá nào cho bộ phim này !</p>
				</div>
			);
		} else if (allComments && allComments.length > 0) {
			return allComments.map((comment, index) => {
				return <UserComment comment={comment} key={index} />;
			});
		}
	};

  UNSAFE_componentWillMount = () => {
    this.setState({filmComments: this.props.filmComments})
    const userInformation = JSON.parse(window.localStorage.getItem("userInformation"));
    if (userInformation !== null) {
      this.setState({
        userInformation
      })
    } 
	}

	render() {
		return (
			<div>
				<div className='comments'>
					<form id='commentBox' onSubmit={this.handleAddComment}>
						<div className='write__comment row'>
							<div className='avatar col-12'>
								<div className='user__avatar'>
									<img
										src={this.state.userInformation.avatar}
									/>
								</div>
								<input
									id='commentInput'
									type='text'
									name='content'
									value={this.state.userComment.content}
									onChange={this.handleGetUserComment}
									onFocus={this.loginToComment}
									placeholder='Bạn nghĩ gì về phim này ... ?'
                />
                <button className="send__message" type="submit">Gửi</button>
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

export default withRouter(Comments)