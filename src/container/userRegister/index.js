import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../sass/Layout/_userLogin.scss";
import avatar from "../../assets/img/avatar.png";
import axios from "axios";
export default class UserRegister extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			displayName: "",
			avatar: avatar,
		};
	}

	handleOnChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleUserRegister = (event) => {
		event.preventDefault();
		const { history } = this.props;
		axios({
			url: "http://localhost:5000/api/users/signUp",
			method: "POST",
			data: this.state,
		}).then((result) => {
			document.getElementById("resNoti").innerHTML = result.data.message;
			setTimeout(() => {
				history.push("/userLogin");
			}, 1000);
		}).catch((err) => {
			document.getElementById("resNoti").innerHTML = err.response.data.error;
		})
	};

	handleChooseAvatar = (avatarImg) => {
		this.setState({
			avatar: `https://firebasestorage.googleapis.com/v0/b/filmticketbooking-cae81.appspot.com/o/avatar-${avatarImg}.png?alt=media`,
		});
	};

	handleRenderAvatars = () => {
		const avatarsName = [
			"batman",
			"chaplin",
			"cloud",
			"harleyQuinn",
			"japaneseWoman",
			"jason",
			"noFace",
			"nun",
			"pencil",
			"sheep",
			"sloth",
			"spider",
			"Trump",
			"zombie",
		];
		return avatarsName.map((avatarImg) => {
			return (
				<div
					onClick={() => {
						this.handleChooseAvatar(avatarImg);
					}}
					className='col-3 avatar__img'
				>
					<img
						data-dismiss='modal'
						src={`https://firebasestorage.googleapis.com/v0/b/filmticketbooking-cae81.appspot.com/o/avatar-${avatarImg}.png?alt=media`}
					/>
				</div>
			);
		});
	};

	render() {
		return (
			<div className='userRegister'>
				<div className='userRegisterForm'>
					<form onSubmit={this.handleUserRegister}>
						<div className='header__form'>
							<h1>Đăng kí tài khoản</h1>
						</div>
						<div className='header__body'>
							<div className='d-flex align-items-center justify-content-center'>
								<div className='userAvatar'>
									<button
										type='button'
										data-toggle='modal'
										data-target='#avatars'
									>
										<img src={this.state.avatar} />
										<i class='fa fa-plus-circle'></i>
									</button>
								</div>
							</div>
							<label for='loginEmail'>Email :</label>
							<input
								type='text'
								id='loginEmail'
								name='email'
								placeholder='Email đăng nhập ...'
								onChange={this.handleOnChange}
							/>
							<label for='loginPass'>Mật khẩu :</label>
							<input
								type='password'
								id='loginPass'
								name='password'
								placeholder='Mật khẩu ...'
								onChange={this.handleOnChange}
							/>
							<label for='confirmPass'>Xác nhận mật khẩu :</label>
							<input
								type='password'
								id='confirmPass'
								name='confirmPassword'
								placeholder='Xác nhận mật khẩu ...'
								onChange={this.handleOnChange}
							/>
							<label for='accountName'>Tên hiển thị :</label>
							<input
								type='text'
								id='accountName'
								name='displayName'
								placeholder='Tên hiển thị'
								onChange={this.handleOnChange}
							/>
							<div className='notification'>
								<p id='resNoti'></p>
							</div>
							<p>
								<NavLink to='/userLogin'>
									Bạn đã có tài khoản ?
								</NavLink>
							</p>
						</div>
						<div className='form__footer'>
							<button type='submit'>Đăng kí</button>
						</div>
					</form>
				</div>

				<div
					className='modal fade'
					id='avatars'
					tabIndex={-1}
					role='dialog'
					aria-labelledby='exampleModalLabel'
					aria-hidden='true'
				>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h3>Chọn ảnh đại diện</h3>
								<button
									type='button'
									className='close'
									data-dismiss='modal'
									aria-label='Close'
								>
									<span aria-hidden='true'>
										<i class='fa fa-times'></i>
									</span>
								</button>
							</div>
							<div className='modal-body'>
								<div className='row avatars__row'>
									{this.handleRenderAvatars()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
