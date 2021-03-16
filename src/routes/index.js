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

// const routesHomeTemplate = [
// 	{
// 		exact: true,
// 		path: "/userLogin",
// 		component: UserLogin,
// 	},
// 	{
// 		exact: true,
// 		path: "/userRegister",
// 		component: UserRegister,
// 	},
// 	{
// 		exact: true,
// 		path: "/",
// 		component: HomePage,
// 	},
// 	{
// 		exact: true,
// 		path: "/home",
// 		component: HomePage,
// 	},
// 	{
// 		exact: true,
// 		path: "/films/:filmId",
// 		component: MovieDetail,
// 	},
// 	{
// 		exact: true,
// 		path: "/checkout/:showTimeId",
// 		component: Checkout,
// 	},
// 	{
// 		exact: false,
// 		path: "*",
// 		component: PageNotFound,
// 	}
// ];

