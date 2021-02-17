import React, { Component } from 'react'

export default class SweetBox extends Component {
    render() {
        const { seatInfomation, rowPosition, colPosition } = this.props;
        return (
            <div id='sweetBox'></div>
        )
    }
}
