import React, { Component } from 'react'
import "../../../sass/Components/_loader.scss";

export default class Loader extends Component {
    render() {
        return (
			<div className='lds-ring'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
    }
}
