import HomePage from "./../container/homeTemplate/HomePage";
import ShowtimePage from "./../container/homeTemplate/ShowtimePage";
import CinemaPage from "./../container/homeTemplate/CinemaPage";
import NewsPage from "./../container/homeTemplate/NewsPage";
import MovieDetail from "../container/homeTemplate/MovieDetail";
import UserLogin from "../container/userLogin/index"
import UserRegister from "../container/userRegister";
import NewDetail from "../container/homeTemplate/NewDetail/index";
import Checkout from "../container/homeTemplate/Checkout/index";

const routesHomeTemplate = [
	{
		exact: true,
		path: "/userLogin",
		component: UserLogin,
	},
	{
		exact: true,
		path: "/userRegister",
		component: UserRegister,
	},
	{
		exact: true,
		path: "/",
		component: HomePage,
	},
	{
		exact: true,
		path: "/home",
		component: HomePage,
	},
	{
		exact: true,
		path: "/films/:filmId",
		component: MovieDetail,
	},
	{
		exact: true,
		path: "/showtime",
		component: ShowtimePage,
	},
	{
		exact: true,
		path: "/cinema",
		component: CinemaPage,
	},
	{
		exact: true,
		path: "/news",
		component: NewsPage,
	},
	{
		exact: true,
		path: "/checkout/:showTimeId",
		component: Checkout,
	},
	{
		exact: true,
		path: "/newDetail/:newsId",
		component: NewDetail,
	},
];

export { routesHomeTemplate };
