import React, { Component } from 'react'

export default class VipSeat extends Component {
	render() {
		const { seatInfomation, rowPosition, colPosition } = this.props;
        return (
			<div id='vipSeat'></div>
		);
    }
}
