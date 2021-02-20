import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import defaultAva from "../../../assets/img/avatar.png";
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

	render() {
		const { isLoggedIn, user } = this.props;
		return (
			<div>
				<div className='cine-navbar'>
					<nav className='navbar navbar-expand-lg'>
						<div className='container'>
							<div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 nav__left__col'>
								<NavLink className='navbar-brand' to='/'>
									Fan Xi Nê
								</NavLink>
							</div>
							<div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 nav__right__col'>
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
										<li className='nav-item'>
											<NavLink
												className='nav-link'
												to=''
											>
												Lịch chiếu
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink
												className='nav-link'
												to=''
											>
												Cụm rạp
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink
												className='nav-link'
												to=''
											>
												Tin tức
											</NavLink>
										</li>
										<li className='nav-item'>
											{this.handleIsLogin(
												isLoggedIn,
												user
											)}
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
