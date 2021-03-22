import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Admin from './components/Admin';
import Form from './components/Form';
import Home from './components/Home';
import UserAdmin from './components/UserForm'

const App = (props: AppProps) => {

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/form" component={Form} />
				<Route exact path="/api/user/:id?/Admin" component={UserAdmin} />
				<Route exact path="/api/chirps/:id?/Admin" component={Admin} />
			</Switch>
		</BrowserRouter>
	);
}

interface AppProps { }

export default App;
// class App extends React.Component<IAppProps, IAppState> {
// 	constructor(props: IAppProps) {
// 		super(props);
// 		this.state = {
// 			name: null
// 		};
// 	}

// 	async componentDidMount() {
// 		try {
// 			let r = await fetch('/api/hello');
// 			let name = await r.json();
// 			this.setState({ name });
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	render() {
// 		return (
// 			<main className="container my-5">
// 				<h1 className="text-primary text-center">Hello {this.state.name}!</h1>
// 			</main>
// 		);
// 	}
// }

// export interface IAppProps {}

// export interface IAppState {
// 	name: string;
// }

// export default App;

