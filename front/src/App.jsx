import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './layout/Layout'
import Login from './pages/Login';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import AccountManagement from './pages/AccountManagement';


const App = () => {

return (
	<div>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="main" element={<Main />}> </Route>
					<Route path="mypage" element={<MyPage />}> </Route>
					<Route path="account/management" element={<AccountManagement />}> </Route>

					
					{/* <Route path="*" element={<div>
						asfsd
					</div>}> </Route> */}
				</Route>
			</Routes>

		</BrowserRouter>
	</div>
);
}

export default App;