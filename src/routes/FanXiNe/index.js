import { Route } from "react-router-dom";
import Navbar from "../../container/components/Navbar/index";
import React from 'react'

// Home and FilmDetail Template
function HomeAndDetailTemplate(props) {
	return (
		<>
			<Navbar />
			{props.children}
		</>
	);  
}

export default function FanXiNe({ Component, ...props }) {
	return (
		<Route
			{...props}
			render={(propsComponent) => (
				<HomeAndDetailTemplate>
					<Component {...propsComponent} />
				</HomeAndDetailTemplate>
			)}
		/>
	);
}
