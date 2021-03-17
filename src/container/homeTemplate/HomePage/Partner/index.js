import React, { Component } from "react";

import cgvLogo from "../../../../assets/img/cgv.png";
import bhdLogo from "../../../../assets/img/bhd.png";
import galaxyLogo from "../../../../assets/img/galaxycine.png";
import cineLogo from "../../../../assets/img/cinestar.png";
import lotteLogo from "../../../../assets/img/lotte.png";

import megaLogo from "../../../../assets/img/megags.png";
import btLogo from "../../../../assets/img/bt.jpg";
import dongCaLogo from "../../../../assets/img/dongdacinema.png";
import touchLogo from "../../../../assets/img/TOUCH.png"
import cnxLogo from "../../../../assets/img/cnx.jpg";

import starLightLogo from "../../../../assets/img/STARLIGHT.png";
import dcineLogo from "../../../../assets/img/dcine.png";
import zaloPayLogo from "../../../../assets/img/zalo-logo.png";
import payooLogo from "../../../../assets/img/payoo.jpg";
import vcbLogo from "../../../../assets/img/VCB.png";

import agribankLogo from "../../../../assets/img/AGRIBANK.png";
import viettinbankLogo from "../../../../assets/img/VIETTINBANK.png";
import ivbLogo from "../../../../assets/img/IVB.png";
import goLogo from "../../../../assets/img/123go.png";
import labanLogo from "../../../../assets/img/laban.png";

import androidLogo from "../../../../assets/img/android-logo.png";
import appleLogo from "../../../../assets/img/apple-logo.png";

import facebookLogo from "../../../../assets/img/facebook-logo.png";
import zaloLogo from "../../../../assets/img/zalo-logo.png";

export default class Partner extends Component {
	render() {
		return (
			<section className='partners'>
				<div className='container'>
					<div className='tix__container py-4'>
						<div className='row'>
							<div className='d-none d-lg-block col-lg-2'>
								<h3>Về chúng tôi</h3>
								<button>FAQ</button>
								<button>Brand Guidelines</button>
							</div>
							<div className='partners__item2 d-lg-block col- col-md-4 col-lg-2 d-flex align-items-center'>
								<div>
									<h3 className='index__none d-none d-lg-block'>
										Fan Xi Nê
									</h3>
									<button className='d-inline d-lg-block' href="#">
										Thỏa thuận sử dụng
									</button>
									<button className='d-inline d-lg-block' href="#">
										Chính sách bảo mật
									</button>
								</div>
							</div>
							<div className='partners__item3 d-none d-lg-block  col-lg-4 partners__img'>
								<h3 className='mb-2'>Đối tác</h3>
								<div className='d-flex mb-3'>
									<img
										className='img__border'
										src={cgvLogo}
										alt="CGVLogo"
									/>
									<img src={bhdLogo} alt="BHDLogo" />
									<img src={galaxyLogo} alt="GalaxyLogo" />
									<img src={cineLogo} alt="CinestarLogo" />
									<img src={lotteLogo} alt="LotteLogo" />
								</div>
								<div className='d-flex mb-3'>
									<img src={megaLogo} alt="MegaGSLogo" />
									<img
										className='img__border'
										src={btLogo}
										alt="BtLogo"
									/>
									<img
										className='img__border'
										src={dongCaLogo}
										alt="DongCaLogo"
									/>
									<img src={touchLogo} alt="TouchLogo" />
									<img
										className='img__border'
										src={cnxLogo}
										alt="CNXLogo"
									/>
								</div>
								<div className='d-flex mb-3'>
									<img src={starLightLogo} alt="StarlightLogo" />
									<img
										className='img__border'
										src={dcineLogo}
										alt="DCineLogo"
									/>
									<img src={zaloPayLogo} alt="ZaloLogo" />
									<img
										className='img__border'
										src={payooLogo}
										alt="PayooLogo"
									/>
									<img src={vcbLogo} alt="VCBLogo" />
								</div>
								<div className='d-flex'>
									<img src={agribankLogo} alt="AgribankLogo" />
									<img src={viettinbankLogo} alt="ViettinbankLogo" />
									<img src={ivbLogo} alt="IVBLogo" />
									<img
										className='img__border img__123go'
										src={goLogo}
										alt="GoLogo"
									/>
									<img src={labanLogo} alt="LabanLogo" />
								</div>
							</div>
							<div className='partners__item4 d-none d-lg-block  col-lg-2 partners__app text-center'>
								<h3>MOBILE APP</h3>
								<div className='d-flex'>
									<img src={androidLogo} alt="AndroidLogo" />
									<img src={appleLogo} alt="AppleLogo" />
								</div>
							</div>
							<div className='partners__item4 d-lg-block col- col-md-4 col-lg-2 partners__app text-center'>
								<h3 className='d-none d-lg-block'>SOCIAL</h3>
								<div className='d-flex'>
									<img src={facebookLogo} alt="FacebookLogo" />
									<img src={zaloLogo} alt="ZaloLogo" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
