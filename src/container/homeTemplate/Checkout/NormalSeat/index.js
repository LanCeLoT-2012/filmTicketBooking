import React, { Component } from 'react'

export default class NormalSeat extends Component {
	render() {
		const { seatInfomation, rowPosition, colPosition } = this.props;
        return (
			<div id='normalSeat'></div>
		);
    }
}
