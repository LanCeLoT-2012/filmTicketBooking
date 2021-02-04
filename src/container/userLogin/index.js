import React, { Component } from "react";
import "../../sass/Layout/_userLogin.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
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
			url: "http://localhost:5000/api/users/signIn",
			method: "POST",
			data: this.state,
		})
			.then((result) => {
				this.props.userLoginSuccess(result.data.user);
				window.localStorage.setItem(
					"accessToken",
					result.data.accessToken
				);
				document.getElementById("resNoti").innerHTML = result.data.message;
				setTimeout(() => {
					this.props.history.push("/");
				}, 1000)
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

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.userLogonReducer.isLoggedIn,
		user: state.userLogonReducer.user,
		loading: state.userLogonReducer.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLoginSuccess: (data) => {
			dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
