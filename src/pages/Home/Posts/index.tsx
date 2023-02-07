import { message, List, Button, Divider, Modal, Card } from "antd";
import { useState } from "react";
import { removeBlog } from "../../../redux/reducers/blogsReducer";
import { useAppDispatch } from "../../../redux/store";
import { IBlog } from "../../../types";
import '../index.scss'


interface IProps {
    blogs: IBlog[];
}

interface ICardExtraStyle {
    paddingLeft: number,
    paddingRight: number
}

const cardExtraStyle: ICardExtraStyle = {
    paddingLeft: 5,
    paddingRight: 5
}

const Posts = ({ blogs }: IProps) => {
    const dispatch = useAppDispatch();
    const [selectedBlog, setSelectedBlog] = useState<IBlog>();
    const [isModalShow, setIsModalShow] = useState(false);
    const showModal = (blog: IBlog) => {
        setIsModalShow(true);
        setSelectedBlog(blog);
    }
    const handleOnOk = async () => {
        setIsModalShow(false);
        if (selectedBlog) {
            const ok = await dispatch(removeBlog(selectedBlog)).unwrap();
            if (ok) message.success('删除成功', 1);
            else message.error('删除失败', 1);
        }
    }
    const handleOnCancel = () => {
        setIsModalShow(false);
    }
    const posts = (<List
        size="large"
        dataSource={blogs}
        pagination={{
            pageSize: 5
        }}
        itemLayout="horizontal"
        style={{ borderRadius: 25, marginTop: '3%' }}
        renderItem={blog => (<Card
            title={blog.title}
            extra={[
                <a style={cardExtraStyle} key="list-edit">查看</a>,
                <a style={cardExtraStyle} onClick={() => showModal(blog)} key="list-more">删除</a>
            ]}
        >
            <div className="blog-content">
                {blog.content}
            </div>
        </Card>)}
    >
    </List>)
    return (
        <>
            <Divider orientation="left">
                筛选结果:
            </Divider>
            {posts}
            <Modal open={isModalShow} onOk={handleOnOk} onCancel={handleOnCancel}>
                确定删除这篇博客吗
            </Modal>
        </>
    )
}

export default Posts;