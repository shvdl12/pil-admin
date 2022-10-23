import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';

const App = () => {

	const location = useLocation();
	// const isLoggedIn = () => {
		
	// }

	console.log('create')
	return (
		<div className='App'>
			<div>
				asdfsdf
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/main" element={<Main />}></Route>
				</Routes>
			</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
