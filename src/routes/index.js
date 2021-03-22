import HomePage from "../container/homeTemplate/HomePage/index";
import MovieDetail from "../container/homeTemplate/MovieDetail/index";

const homeAndDetailRoutes = [
	{
		exact: true,
		path: "/",
		component: HomePage,
	},
	{
		exact: true,
		path: "/films/:filmId",
		component: MovieDetail,
	},
];

export { homeAndDetailRoutes };


