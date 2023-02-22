import { EditOutlined, EllipsisOutlined, SettingOutlined, UndoOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Descriptions, Divider, Drawer, Input, InputRef, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { updateUserInfo, uploadUserImage } from "../../redux/reducers/userInfoReducer";
import { selectUserInfo } from "../../redux/selectors/userInfoSelector";
import { useAppDispatch } from "../../redux/store";
import './index.scss'

const { Item } = Descriptions;
const { Meta } = Card

const AboutMe = () => {
    const userInfo = useSelector(selectUserInfo);
    const dispatch = useAppDispatch();
    const [drawerShow, setDrowShow] = useState(false);
    const [aboutMeEdit, setAboutMeEdit] = useState(false);
    const [aboutMeInput, setAboutMeInput] = useState(userInfo.aboutMe);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const aboutMeInputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (aboutMeEdit) aboutMeInputRef.current?.focus();
    }, [aboutMeEdit]);

    const showDrawer = () => {
        setDrowShow(true);
    }
    const closeDrawer = () => {
        setDrowShow(false);
    }
    const showInputFile = () => {
        fileInputRef.current?.click();
    }
    const showAboutMeEdit = () => {
        setAboutMeEdit(true);
    }
    const closeAboutMeEdit = () => {
        setAboutMeEdit(false);
    }
    const handleAboutMeEditConfirm = async () => {
        closeAboutMeEdit();
        const ok = await dispatch(updateUserInfo({
            ...userInfo,
            aboutMe: aboutMeInput
        })).unwrap();
        if (ok) message.success('个人标签修改成功');
        else message.error('个人标签修改失败');
    }
    const handleAboutMeEditCancel = () => {
        setAboutMeInput(userInfo.aboutMe);
        closeAboutMeEdit();
    }
    const handleAboutMeInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAboutMeInput(e.currentTarget.value);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        closeDrawer();
        const image = e.currentTarget?.files?.[0];
        if (!image) return;
        const url = window.URL.createObjectURL(image);
        const formData = new FormData();
        formData.append('name', 'gamejoye');
        formData.append(url, image);
        dispatch(uploadUserImage(formData));
        e.currentTarget.value = "";
    }
    return (
        <div className="about-me-container">
            <Card
                cover={<img src={userInfo.avatarUrl} />}
                bordered={true}
                actions={[
                    <SettingOutlined />,
                    <EditOutlined />,
                    <EllipsisOutlined />,
                ]}
            >
                <Meta
                    avatar={<Avatar
                        size={64}
                        src={userInfo.avatarUrl}
                        onClick={showDrawer}
                    />}
                    title="gamejoye"
                    description={
                        aboutMeEdit
                            ? <Input
                                placeholder="编辑个性标签~"
                                defaultValue={userInfo.aboutMe}
                                onChange={handleAboutMeInputOnChange}
                                onBlur={handleAboutMeEditCancel}
                                onPressEnter={handleAboutMeEditConfirm}
                                ref={aboutMeInputRef}
                            />
                            : <span
                                onDoubleClick={showAboutMeEdit}
                            >
                                {userInfo.aboutMe || "暂无个人标签～"}
                            </span>
                    } />
                <Divider orientation="left">about gamejoye: </Divider>
                <Descriptions
                    layout="horizontal"
                    bordered
                    column={2}
                >
                    <Item label="性别" span={1}>
                        {userInfo.sex}
                    </Item>
                    <Item label="生日" span={1}>
                        {userInfo.birthday}
                    </Item>
                    <Item label="地址" span={2}>
                        {userInfo.address || "冰岛是我未曾谋面第二个家乡"}
                    </Item>
                </Descriptions>
            </Card>
            <Drawer
                open={drawerShow}
                onClose={closeDrawer}
            >
                <Button
                    onClick={showInputFile}
                    type="primary"
                >
                    更换头像
                </Button>
                <input
                    id="img-upload"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                />
            </Drawer>
        </div>
    )
}
export default AboutMe;