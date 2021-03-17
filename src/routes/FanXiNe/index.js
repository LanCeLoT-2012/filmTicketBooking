import { Route } from "react-router-dom";
import Navbar from "../../container/components/Navbar/index";
import Partner from "../../container/homeTemplate/HomePage/Partner/index";
import Footer from "../../container/components/Footer/index";

import React from 'react'

// Home and FilmDetail Template
function HomeAndDetailTemplate(props) {
	return (
		<>
			<Navbar />
			{props.children}
			<Partner />
			<Footer />
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
