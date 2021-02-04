import React, { Component } from "react";
import ModalVideo from "react-modal-video";
export default class CarouselItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		this.openModal = this.openModal.bind(this);
	}

	openModal() {
		this.setState({ isOpen: true });
	}

	getVideoId = (youtubeUrl) => {
		var videoId = youtubeUrl.match(
			/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
		);
		return videoId[1];
	};

	render() {
		const { itemOrder } = this.props;
		return (
			<div
				className={"carousel-item " + (itemOrder === 0 ? "active" : "")}
			>
				<img src={this.props.movie.banner} />
				<ModalVideo
					channel='youtube'
					isOpen={this.state.isOpen}
					videoId={this.getVideoId(this.props.movie.trailerLink)}
					onClose={() => this.setState({ isOpen: false })}
				/>
				<button onClick={this.openModal}>
					<i className='fa fa-play' />
				</button>
			</div>
		);
	}
}
