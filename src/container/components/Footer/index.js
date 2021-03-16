import React, { Component } from "react";
import "./../../../sass/Layout/_footer.scss";

export default class Footer extends Component {
	render() {
		return (
			<footer>
				<div className='tix__container py-4'>
					<div className='container'>
						<div className='footer__content'>
							<div className='footer__text'>
								<p className='footer__label'>Fan Xi Nê</p>
								<p>Đồ án tốt nghiệp cuối khóa - FrontEnd 52E</p>
								<p>Học viên thực hiện : Liêu Gia Khánh</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
