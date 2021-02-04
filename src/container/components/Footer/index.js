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
								<p>
									Trường đại học Công nghệ thông tin, Khu phố
									6, Phường Linh Trung, Quận Thủ Đức
								</p>
								<p>Internet và công nghệ Web - IE104.L11</p>
								<p>Sinh viên thực hiện :</p>
								<p>Liêu Gia Khánh - 18520291</p>
								<p>Nguyễn Minh Hiếu - 18529999</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
