import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import defaultAva from "../../../assets/img/avatar.png";
class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn: false, userInformation: null }
	}

	handleLogout = (history) => {
		window.localStorage.clear();
		history.push("/userLogin");
	};

	handleIsLogin = (isLoggedIn, userInformation) => {
		const { history } = this.props;
		if (isLoggedIn) {
			return (
				<>
					<div className='userAvatar'>
						<img src={userInformation.avatar} alt="loginAvatar" />
					</div>
					<div className='userName'>
						<p id='name'>{userInformation.displayName}</p>
					</div>
					<button
						className='login_logout'
						onClick={() => {
							this.handleLogout(history);
						}}
						type='button'
					>
						Đăng xuất
					</button>
				</>
			);
		} else {
			return (
				<>
					<div className='userAvatar'>
						<img src={defaultAva} alt="defaultAvatar" />
					</div>
					<button
						className='login_logout'
						onClick={() => {
							history.push("/userLogin");
						}}
						type='button'
					>
						Đăng nhập
					</button>
				</>
			);
		}
	};

	UNSAFE_componentWillMount = () => {
		const accessToken = window.localStorage.getItem("accessToken");
		if (!accessToken) {
			this.setState({ isLoggedIn: false, userInformation: null });
		} else {
			const tokenExpTime = window.localStorage.getItem("expTime");
			const currentDate = new Date();
			if (tokenExpTime * 1000 < currentDate.getTime()) {
				this.props.history.push("/userLogin");
			} else {
				const userInformation = JSON.parse(window.localStorage.getItem("userInformation"));
				this.setState({ isLoggedIn: true, userInformation: userInformation });
			}
		}
	};

	render() {
		const { isLoggedIn, userInformation } = this.state;
		return (
			<div className='cine-navbar'>
				<div className='container'>
					<nav className='navbar navbar-expand-md row'>
						<NavHashLink className='navbar-brand' smooth to='/#top'>
							FAN XI NÊ
						</NavHashLink>
						<button
							className='navbar-toggler'
							type='button'
							data-toggle='collapse'
							data-target='#collapsibleNavbar'
						>
							<span className='navbar-toggler-icon' />
							<i className='fa fa-bars'></i>
						</button>
						<div
							className='collapse navbar-collapse'
							id='collapsibleNavbar'
						>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<NavHashLink
										className='nav-link'
										smooth
										to='/#showtimes'
									>
										Lịch Chiếu
									</NavHashLink>
								</li>
								<li className='nav-item'>
									<NavHashLink
										className='nav-link'
										activeClassName='active'
										smooth
										to='/#cinemas'
									>
										Cụm rạp
									</NavHashLink>
								</li>
								<li className='nav-item'>
									<NavHashLink
										className='nav-link'
										activeClassName='active'
										smooth
										to='/#news'
									>
										Tin tức
									</NavHashLink>
								</li>
								<li className='nav-item'>
									{this.handleIsLogin(
										isLoggedIn,
										userInformation
									)}
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		);
	}
}

export default withRouter(Navbar);