import { homeAndDetailRoutes } from "./routes/index";
import { Route, Switch } from "react-router-dom";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import "./sass/main.scss";
import axios from "axios";
import UserLogin from "./container/userLogin";
import UserRegister from "./container/userRegister";
import FanXiNe from "./routes/FanXiNe/index";
import Checkout from "./container/homeTemplate/Checkout/index"
import { Component } from "react";

axios.defaults.withCredentials = true;
class App extends Component {
	renderHomeAndDetailTemplate = (homeAndDetailRoutes) => {
		if (homeAndDetailRoutes && homeAndDetailRoutes.length > 0) {
			return homeAndDetailRoutes.map((route, index) => {
				return (
					<FanXiNe
						key={index}
						exact={route.exact}
						path={route.path}
						component={route.component}
					/>
				);
			})
		}
	}

	render(){
		return (
			<Switch>
				<Route exact={true} path="/userLogin" render={(props) => <UserLogin {...props} />} />
				<Route exact={true} path="/userRegister" render={(props) => <UserRegister {...props} />} />
				{this.renderHomeAndDetailTemplate(homeAndDetailRoutes)}
				<Route exact={true} path="/checkout/:showTimeId" render={(props) => <Checkout {...props} />} />
			</Switch>
		);
	}
}

export default App;
