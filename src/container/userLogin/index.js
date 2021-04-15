import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import callApi from "../../api/index";
import JWT from "jsonwebtoken";
export default class UserLogin extends Component {
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
    callApi.post("/users/signIn", this.state)
			.then((result) => {
				const decodedToken = JWT.decode(result.data.accessToken);
				const userInformation = decodedToken.foundedUser;
				// Set user's accessToken to localStorage
				window.localStorage.setItem(
					"accessToken",
					result.data.accessToken
				);
				// Set token's expired time to localStorage
				window.localStorage.setItem("expTime", decodedToken.exp);
				// Set userInformation to localStorage
				window.localStorage.setItem(
					"userInformation",
					JSON.stringify(userInformation)
				);
				document.getElementById("resNoti").innerHTML =
					result.data.message;
				// Direct user to HomePage
				setTimeout(() => {
					this.props.history.push("/");
				}, 1000);
			})
      .catch((err) => {
				const errNoti = err.response.data.error;
				document.getElementById("resNoti").innerHTML = errNoti;
			});
	};

  componentDidMount = () => {
    const { state } = this.props.location;
    if (state) {
      document.getElementById("resNoti").innerHTML = state.message;
    }
  }

	render() {
		return (
			<div className='userLogin'>
				<div className='userLoginForm'>
					<form onSubmit={this.handleUserLogin}>
						<div className='header__form'>
							<h1>Đăng nhập</h1>
						</div>
						<div className='header__body'>
							<label htmlFor='emailOrPhone'>Email :</label>
							<input
								type='text'
								id='emailOrPhone'
								placeholder='Email ...'
								name='email'
								onChange={this.handleOnChange}
							/>
							<label htmlFor='password'>Mật khẩu :</label>
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


