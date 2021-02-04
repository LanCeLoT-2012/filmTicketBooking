import { routesHomeTemplate } from "./routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import "./sass/main.scss";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
	const homeTemplateRoute = (routesHomeTemplate) => {
		if (routesHomeTemplate && routesHomeTemplate.length > 0) {
			return routesHomeTemplate.map((item, index) => {
				return (
					<Route
						key={index}
						exact={item.exact}
						path={item.path}
						component={item.component}
					/>
				);
			});
		}
	};

	return (
		<BrowserRouter>
			<Switch>{homeTemplateRoute(routesHomeTemplate)}</Switch>
		</BrowserRouter>
	);
}

export default App;
