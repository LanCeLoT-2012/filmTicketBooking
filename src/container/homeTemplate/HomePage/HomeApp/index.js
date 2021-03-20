import React, { Component } from "react";
import mobileLogo from "../../../../assets/img/mobile.png";
import slide2 from "../../../../assets/img/slide2.jpg";
export default class HomeApp extends Component {
	render() {
		return (
			<section id='apps' className='apps'>
				<div className='apps__bg'>
					<div className='tix__container container'>
						<div className='row apps__row '>
							<div className='col-12 col-lg-6 d-flex align-items-center'>
								<div className='text-white'>
									<h2 className='mb-3'>
										Ứng dụng tiện lợi dành cho
									</h2>
									<h2 className='mb-4'>người yêu điện ảnh</h2>
									<p className='mb-4 pr-5'>
										Không chỉ đặt vé, bạn còn có thể bình
										luận phim, chấm điểm rạp và đổi quà hấp
										dẫn.
									</p>
									<button className='mb-2'>
										App miễn phí - Tải về ngay!
									</button>
									<p className='textAppUnder'>
										Fan Xi Nê có hai phiên bản{" "}
										<span> </span>
										<a
											className='tagA'
											href='https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8'
										>
											iOS
										</a>{" "}
										&amp;&nbsp;
										<a
											className='tagA'
											href='https://play.google.com/store/apps/details?id=vn.com.vng.phim123'
										>
											Android
										</a>
									</p>
								</div>
							</div>
							<div className='col-12 col-lg-6 apps__img text-center'>
								<img
									className='img__bg'
									src={mobileLogo}
									alt='MobileLogo'
								/>
								<div className='apps__carousel'>
									<div className='slick__carousel'>
										<div className='img__items'>
											<img src={slide2} alt='slide2img' />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
