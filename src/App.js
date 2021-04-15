import { homeAndDetailRoutes } from "./routes/index";
import { Route, Switch } from "react-router-dom";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import "./sass/main.scss";
import { Component } from "react";
import loadable from "@loadable/component";

// Import Component using @loadable/component
const UserLogin = loadable(() => import("./container/userLogin/index"));
const UserRegister = loadable(() => import("./container/userRegister/index"));
const FanXiNe = loadable(() => import("./routes/FanXiNe/index"));
const Checkout = loadable(() => import("./container/homeTemplate/Checkout/index"));
const PageNotFound = loadable(() => import("./container/components/PageNotFound/index"));
class App extends Component {
	renderHomeAndDetailTemplate = (homeAndDetailRoutes) => {
		if (homeAndDetailRoutes && homeAndDetailRoutes.length > 0) {
			return homeAndDetailRoutes.map((route, index) => {
				return (
					<FanXiNe key={index} exact={route.exact} path={route.path} Component={route.component} />
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
				<Route exact={false} path="*" render={(props) => <PageNotFound {...props} />} />
			</Switch>
		);
	}
}

export default App;
