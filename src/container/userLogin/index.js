import React, { Component } from "react";
import "../../sass/Layout/_userLogin.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import JWT from "jsonwebtoken";
class UserLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			loading: false,
		};
	}

	handleOnChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleUserLogin = (event) => {
		event.preventDefault();
		axios({
			url: "https://fanxine-be.herokuapp.com/api/users/signIn",
			method: "POST",
			data: this.state,
		})
			.then((result) => {
				const decodedToken = JWT.decode(result.data.accessToken);
				const userInformation = decodedToken.foundedUser;
				// Set user's accessToken to localStorage
				window.localStorage.setItem(
					"accessToken",
					result.data.accessToken
				);
				// Set token expired's time to localStorage
				window.localStorage.setItem("expTime", decodedToken.exp);
				// Set userInformation to localStorage
				window.localStorage.setItem(
					"userInformation",
					JSON.stringify(userInformation)
				);
				document.getElementById("resNoti").innerHTML =
					result.data.message;
				// Direct user to HomePage
				this.props.userAlreadyLoggedIn();
				setTimeout(() => {
					this.props.history.push("/");
				}, 1000);
			})
			.catch((err) => {
				const errNoti = err.response.data.error;
				document.getElementById("resNoti").innerHTML = errNoti;
			});
	};

	render() {
		return (
			<div className='userLogin'>
				<div className='userLoginForm'>
					<form onSubmit={this.handleUserLogin}>
						<div className='header__form'>
							<h1>Đăng nhập</h1>
						</div>
						<div className='header__body'>
							<label htmlfor='emailOrPhone'>Email :</label>
							<input
								type='text'
								id='emailOrPhone'
								placeholder='Email ...'
								name='email'
								onChange={this.handleOnChange}
							/>
							<label htmlfor='password'>Mật khẩu :</label>
							<input
								type='password'
								id='password'
								placeholder='Mật khẩu ...'
								name='password'
								onChange={this.handleOnChange}
							/>
							<div className='notification'>
								<p id='resNoti'></p>
							</div>
							<p>
								<NavLink to=''>Quên mật khẩu ?</NavLink> /{" "}
								<NavLink to='/userRegister'>
									{" "}
									Tạo tài khoản{" "}
								</NavLink>
							</p>
						</div>
						<div className='form__footer'>
							<button type='submit'>Đăng nhập</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		userAlreadyLoggedIn: (data) => {
			dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
		},
	};
};

export default connect(null, mapDispatchToProps)(UserLogin);

