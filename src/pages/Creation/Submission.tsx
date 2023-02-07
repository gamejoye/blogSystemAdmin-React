import { Button, Col, message } from "antd"
import { useNavigate } from "react-router";
import { HOME } from "../../contants/routeName";
import { addBlog } from "../../redux/reducers/blogsReducer";
import { useAppDispatch } from "../../redux/store";

interface IProps {
    isPreview: boolean;
    formData: FormData;
    titleValue: string;
    contentValue: string;
    tags: string[];
}

const Submission = ({ isPreview, formData, titleValue, contentValue, tags }: IProps) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const handleOnClick = async () => {
        formData.append('content', contentValue);
        const ok = await dispatch(addBlog({
            blog: {
                id: 0,
                ordered: 1,
                name: 'gamejoye',
                title: titleValue,
                content: contentValue,
                tags,
            },
            formData
        })).unwrap();
        navigation(HOME);
        if(ok) message.success('博客发表成功', 1);
        else message.error('博客发表失败', 1);
    }
    return (
        <Col span={isPreview ? 0 : 24} offset={0} className="creation-component-interval">
            <Button type="primary" onClick={handleOnClick}>
                发表博客
            </Button>
        </Col>
    )
}
export default Submission;