import React, { Component } from 'react'
import "../../../sass/Components/_pageNotFound.scss";

export default class index extends Component {
    render() {
        return (
			<div className='pageNotFound'>
				<div class='site'>
					<div class='sketch'>
						<div class='bee-sketch red'></div>
						<div class='bee-sketch blue'></div>
					</div>

					<h1 id="pnfTitle">
						404:
						<small>Players Not Found</small>
					</h1>
				</div>
			</div>
		);
    }
}
