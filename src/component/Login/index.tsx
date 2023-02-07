import { Button, Form, Input } from "antd";
import { setUserInfo } from "../../redux/reducers/userInfoReducer";
import { useAppDispatch } from "../../redux/store";
import { authenticateUser, IAuthenticationResult } from "../../utils/axios";
import './index.scss'

const Login = () => {
    const dispatch = useAppDispatch();
    const handleOnFinish = async (values: any) => {
        const { name, password } = values;
        const data: IAuthenticationResult = (await authenticateUser({
            name,
            password
        })).data;
        if (data.code === 200) {
            dispatch(setUserInfo(data.userInfo));
            localStorage.setItem("token", data.token);
        }
    }
    const { Item } = Form;
    return (
        <div className="login-container">
            <Form
                size="large"
                labelCol={{ span: 8, offset: 4 }}
                wrapperCol={{ span: 4 }}
                onFinish={handleOnFinish}
            >
                <Item
                    label="用户名"
                    name="name"

                    rules={[{ required: true, message: '用户名不能为空' }]}
                >
                    <Input />
                </Item>
                <Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '密码不能为空' }]}
                >
                    <Input.Password />
                </Item>
                <Item
                    wrapperCol={{ span: 12, offset: 12 }}
                >
                    <Button type="primary" htmlType="submit">登陆</Button>
                </Item>
            </Form>
        </div>
    )
}
export default Login;