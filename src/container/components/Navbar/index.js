import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import defaultAva from "../../../assets/img/avatar.png";
import axios from "axios";
class Navbar extends Component {
	handleLogout = (history) => {
		window.localStorage.removeItem("accessToken");
		history.push("/userLogin");
	};

	handleIsLogin = (isLoggedIn, user) => {
		const { history } = this.props;
		if (isLoggedIn) {
			return (
				<>
					<div className='userAvatar'>
						<img src={user.avatar} />
					</div>
					<div className='userName'>
						<p id='name'>{user.displayName}</p>
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
						<img src={defaultAva} />
					</div>
					<NavLink className='nav-link login_logout' to='/userLogin'>
						Đăng nhập
					</NavLink>	
				</>
			);
		}
	};

	render() {
		const { isLoggedIn, user } = this.props;
		return (
			<div>
				<div className='cine-navbar'>
					<nav className='navbar navbar-expand-lg'>
						<div className='container'>
							<div className='col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 nav__left__col'>
								<NavLink className='navbar-brand' to='/'>
									Fan Xi Nê
								</NavLink>
							</div>
							<div className='col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 nav__right__col'>
								<div
									className='collapse navbar-collapse'
									id='navbarNav'
								>
									<ul className='navbar-nav'>
										<button
											className='navbar-toggler'
											type='button'
											data-toggle='collapse'
											data-target='#navbarNav'
											aria-controls='navbarNav'
											aria-expanded='false'
											aria-label='Toggle navigation'
										>
											<span className='navbar-toggler-icon'>
												<i
													id='navHambuger'
													className='fa fa-bars'
												></i>
											</span>
										</button>
										<li className='nav-item active'>
											<NavLink
												activeClassName='selected'
												className='nav-link'
												to='/home'
											>
												Trang chủ
											</NavLink>
										</li>
										{/* <li className='nav-item'>
											<NavLink
												className='nav-link'
												to='/showtime'
											>
												Lịch chiếu
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink
												className='nav-link'
												to='/cinema'
											>
												Cụm rạp
											</NavLink>
										</li> */}
										<li className='nav-item'>
											<NavLink
												className='nav-link'
												to='/news'
											>
												Tin tức
											</NavLink>
										</li>
										<li className='nav-item'>
											{this.handleIsLogin(isLoggedIn, user)}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</nav>
				</div>
			</div>
		);
	}
}

export default withRouter(Navbar);
