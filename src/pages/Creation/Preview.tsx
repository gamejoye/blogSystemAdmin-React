import { Col, Divider } from "antd";
import Markdown from "../../component/Markdown";
import './index.scss'
interface IProps {
    isPreview: boolean;
    titleValue: string;
    contentValue: string
}
const Preview = ({ isPreview, titleValue, contentValue }: IProps) => {
    return (
        <Col span={isPreview ? 24 : 0} offset={0} className="preview-container">
            <Divider orientation="right" >
                博客标题
            </Divider>
            <Markdown markdown={titleValue} isPreview={true} />
            <Divider orientation="right" >
                博客内容
            </Divider>
            <Markdown markdown={contentValue} isPreview={true} />
        </Col>
    )
}
export default Preview;