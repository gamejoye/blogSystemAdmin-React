import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Main from "./component/Main";
import { loadBlogs, removeAllBlogs } from "./redux/reducers/blogsReducer";
import { loadUserInfo } from "./redux/reducers/userInfoReducer";
import { selectUserInfo } from "./redux/selectors/userInfoSelector";
import { useAppDispatch } from "./redux/store";
import 'antd/dist/reset.css';
import './index.scss'
import Nav from "./component/Nav";
import Login from "./component/Login";
import { removeAllTalks } from "./redux/reducers/talksReducer";

const App = () => {
	const dispatch = useAppDispatch();
	const userInfo = useSelector(selectUserInfo);
	const token = localStorage.getItem('token');
	const [isLogin, setIsLogin] = useState(!!token);
	useEffect(() => {
		if (token) {
			const fetchData = async () => {
				const data = await dispatch(loadUserInfo(token)).unwrap();
				if (!!data) {
					dispatch(loadBlogs('gamejoye'));
				} 
				setIsLogin(true && !!data);
			}
			fetchData();
		} else {
			setIsLogin(false);
		}
		return () => {
			dispatch(removeAllBlogs());
			dispatch(removeAllTalks());
		}
	}, [userInfo.name]);
	if (!isLogin) {
		return (
			<Login />
		)
	}
	return (
		<div className="app">
			<Nav />
			<Main />
		</div>
	)
}
export default App;