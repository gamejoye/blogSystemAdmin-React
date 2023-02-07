import { HomeOutlined, SettingOutlined, MenuOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { useNavigate } from "react-router";
import { CREATION, ESSAY, HOME, TALKS } from "../../contants/routeName";
import { removeUserInfo } from "../../redux/reducers/userInfoReducer";
import { useAppDispatch } from "../../redux/store";
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem('主页', HOME, <HomeOutlined />),
    getItem('动态', '/dynamic', <MenuOutlined />, [
        getItem('说说', TALKS),
        getItem('随笔', ESSAY),
    ]),
    getItem('设置', '/settings', <SettingOutlined />, [
        getItem('发表博客', CREATION),
        getItem('退出登陆', 'logout'),
    ])
];
const Nav = () => {
    const navigation = useNavigate();
    const dispatch = useAppDispatch();
    const handleClick = ({ key }: MenuInfo) => {
        if (key === 'logout') {
            localStorage.removeItem('token');
            dispatch(removeUserInfo());
        } else {
            navigation(key);
        }
    }
    return (
        <Menu
            mode="inline"
            style={{
                height: '100%',
                width: 256,
                position: 'fixed'
            }}
            items={items}
            onClick={handleClick}
        />
    )
}

export default Nav;