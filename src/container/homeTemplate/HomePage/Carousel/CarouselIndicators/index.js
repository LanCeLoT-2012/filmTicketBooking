import React, { Component } from 'react'

export default class CarouselIndicators extends Component {
    render() {
        const { itemOrder } = this.props;
        return (
			<li
				className={(itemOrder === 0 ? "active" : "")}
				data-target='#carouselExampleIndicators'
				data-slide-to={this.props.slideTo}
			/>
		);
    }
}
