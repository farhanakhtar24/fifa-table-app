import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { tournamentNamesFetcher } from "../redux/tournamentsSlice";

store.dispatch(tournamentNamesFetcher());

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<div className="text-primary_dark_blue">
				<Component {...pageProps} />
			</div>
		</Provider>
	);
}

export default MyApp;
