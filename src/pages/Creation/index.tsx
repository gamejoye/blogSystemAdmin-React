import { useState } from "react";
import { Row } from "antd";
import Edit from "./Edit";
import ToolBar from "./Toolbar";
import TagBar from "./TagBar";
import Submission from "./Submission";
import Preview from "./Preview";
import './index.scss'
const Creation = () => {
    const [isPreview, setIsPreview] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [contentValue, setContentValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [selectionStart, setSelectionStart] = useState<number>(1);
    const [selectionEnd, setSelectionEnd] = useState<number>(1);
    const [formData] = useState(new FormData());
    return (
        <Row className="creation-container" wrap={true}>
            <ToolBar
                isPreview={isPreview}
                selectionStart={selectionStart}
                selectionEnd={selectionEnd}
                formData={formData}
                setIsPreview={setIsPreview}
                setContentValue={setContentValue}
                setSelectionStart={setSelectionStart}
                setSelectionEnd={setSelectionEnd}
            />
            <Preview
                isPreview={isPreview}
                titleValue={titleValue}
                contentValue={contentValue}
            />
            <Edit
                titleValue={titleValue}
                contentValue={contentValue}
                isPreview={isPreview}
                setTitleValue={setTitleValue}
                setContentValue={setContentValue}
                setSelectionStart={setSelectionStart}
                setSelectionEnd={setSelectionEnd}
            />
            <TagBar
                isPreview={isPreview}
                tags={tags}
                setTags={setTags}
            />
            <Submission
                isPreview={isPreview}
                titleValue={titleValue}
                contentValue={contentValue}
                formData={formData}
                tags={tags}
            />
        </Row>
    )
}
export default Creation;