import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, List, message, Modal, Tag, Space, Input, FloatButton, Radio, Divider } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { colors, Moods } from "../../contants/mood";
import { addTalk, loadTalks, removeTalk } from "../../redux/reducers/talksReducer";
import { selectAllTalks, selectTalksStatus } from "../../redux/selectors/talkSelector";
import { selectUserInfo } from "../../redux/selectors/userInfoSelector";
import { useAppDispatch } from "../../redux/store";
import { ITalk } from "../../types";
import Aside from "./Aside";
import moment from "moment";
import './index.scss'

const getColorByMood = (mood: string): string => {
    const color = colors.get(mood) ?? "";
    return color;
}

const Talks = () => {
    const userInfo = useSelector(selectUserInfo);
    const talks = useSelector(selectAllTalks);
    const talksStatus = useSelector(selectTalksStatus);
    const dispatch = useAppDispatch();
    const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
    const [isWriteTalkModalShow, setIsWriteTalkModalShow] = useState(false);
    const [selectedTalk, setSelectedTalk] = useState<ITalk | null>(null);
    const [talkContent, setTalkContent] = useState('');
    const [talkMood, setTalkMood] = useState('');
    useEffect(() => {
        if (talksStatus === 'idle') {
            dispatch(loadTalks('gamejoye'));
        }
    }, [talksStatus]);
    const handleDeleteTalk = (talk: ITalk) => {
        setIsDeleteModalShow(true);
        setSelectedTalk(talk);
    }
    const handleDeleteOk = async () => {
        setIsDeleteModalShow(false);
        if (selectedTalk) {
            const ok = await dispatch(removeTalk(selectedTalk)).unwrap();
            if (ok) message.success('删除成功', 1);
            else message.error('删除失败', 1);
        }
    }
    const handleDeleteCancel = () => {
        setIsDeleteModalShow(false);
        setSelectedTalk(null);
    }
    const handleWriteTalk = () => {
        setIsWriteTalkModalShow(true);
    }
    const handleWriteTalkOk = async () => {
        setIsWriteTalkModalShow(false);
        const ok = await dispatch(addTalk({
            id: 0,
            userInfo,
            content: talkContent,
            releaseTime: Date.now(),
            mood: talkMood
        })).unwrap();
        if (ok) message.success('说说分享成功', 1);
        else message.error('说说分享失败');
    }
    const handleWriteTalkCancel = () => {
        setIsWriteTalkModalShow(false);
    }
    console.log(talks)
    const talkItems = (
        <List
            dataSource={talks}
            size="large"
            pagination={{
                pageSize: 8
            }}
            itemLayout="horizontal"
            renderItem={(talk) => <List.Item
                actions={[<a onClick={() => handleDeleteTalk(talk)}>删除</a>]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={talk.userInfo?.avatarUrl} />}
                    title={<Space size={8}>
                        {talk.userInfo?.name}
                        {talk.mood
                            ? <Tag style={{ borderRadius: 5 }} color={getColorByMood(talk.mood)}>{talk.mood}</Tag>
                            : null}
                    </Space>}
                    description={moment(talk.releaseTime, "x").format("YYYY-MM-DD HH:mm:ss")}
                />
                {talk.content}
            </List.Item>}
        />
    )
    return (
        <div className="talks-container">
            <div className="left">
                {talkItems}
            </div>
            <div className="right">
                <Aside />
            </div>
            <Modal title="确定删除这条说说吗? " open={isDeleteModalShow} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
                {selectedTalk?.content}
            </Modal>
            <Modal
                open={isWriteTalkModalShow} 
                onOk={handleWriteTalkOk}
                onCancel={handleWriteTalkCancel}
                bodyStyle={{ padding: '5% 0%' }}
            >
                <Input.TextArea
                    rows={5}
                    size="large"
                    showCount
                    maxLength={40}
                    placeholder="在这里留下你的说说吧! ~ "
                    onChange={(e) => setTalkContent(e.currentTarget.value)}
                />
                <Divider orientation="left" style={{ marginTop: 16 }} >心情(可选): </Divider>
                <Radio.Group onChange={e => setTalkMood(e.target.value)}>
                    <Radio.Button value="happy">happy</Radio.Button>
                    <Radio.Button value="sad">sad</Radio.Button>
                    <Radio.Button value="angry">angry</Radio.Button>
                    <Radio.Button value="peaceful">peaceful</Radio.Button>
                </Radio.Group>
            </Modal>
            <FloatButton
                onClick={handleWriteTalk}
                icon={<PlusOutlined />}
            />
        </div>
    )
}
export default Talks;