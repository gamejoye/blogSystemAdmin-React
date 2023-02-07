import { CodeOutlined, EditOutlined, EyeOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, InputRef, Select, Space, Tooltip } from "antd";
import { TextAreaRef } from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import './index.scss'

interface IProps {
    isPreview: boolean;
    selectionStart: number;
    selectionEnd: number;
    formData: FormData
    setIsPreview: (isPreview: boolean) => void;
    setContentValue: (content: string) => void;
    setSelectionStart: (start: number) => void;
    setSelectionEnd: (end: number) => void;
}

const ToolBar = ({ isPreview, setIsPreview, selectionStart, selectionEnd, formData, setContentValue, setSelectionStart, setSelectionEnd }: IProps) => {
    const [drawerShow, setDrowShow] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const showDrawer = () => {
        setDrowShow(true);
    }
    const closeDrawer = () => {
        setDrowShow(false);
    }
    const showPreview = () => {
        setIsPreview(true);
    }
    const showEdit = () => {
        setIsPreview(false);
    }
    const contentInsert = (value: string) => {
        const textareaDom = document.querySelector<HTMLInputElement>('textarea');
        if (!textareaDom) return;
        const { value: oldContentValue } = textareaDom;
        const beforeValue = oldContentValue.substring(0, selectionStart);
        const afterValue = oldContentValue.substring(selectionEnd);
        const newContentValue = beforeValue + value + afterValue;
        const pos = newContentValue.length;
        setContentValue(newContentValue);
        setSelectionStart(pos);
        setSelectionEnd(pos);
    }
    const handleInsertTitle = (value: string) => {
        contentInsert('\n' + value + '\n');
    }
    const handleInsertCodeBlock = () => {
        contentInsert('\n```\ncode block\n```\n');
    }
    const handleInsertPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        closeDrawer();
        const image = e.currentTarget.files?.[0];
        if (!image) return;
        const url = window.URL.createObjectURL(image);
        const imageNode = new Image();
        imageNode.src = url;
        imageNode.onload = () => {
            contentInsert(`\n![${imageNode.naturalWidth}-${imageNode.naturalHeight}](${url})\n`);
            formData.append(url, image);
        };
        e.currentTarget.value = "";
    }
    const showInputFile = () => {
        inputFileRef.current?.click();
    }
    return (
        <Col span={24} offset={0} className="creation-component-interval">
            <Space size={20}>
                <Tooltip title="预览" placement="bottom">
                    <EyeOutlined onClick={showPreview} className="feature-bar-label" />
                </Tooltip>
                <Tooltip title="编辑" placement="bottom">
                    <EditOutlined onClick={showEdit} className="feature-bar-label" />
                </Tooltip>
                <Select
                    disabled={isPreview}
                    size="small"
                    placeholder="插入标题"
                    style={{ width: 100 }}
                    onSelect={handleInsertTitle}
                    options={[{
                        value: '# ',
                        label: "一级标题"
                    }, {
                        value: '## ',
                        label: "二级标题"
                    }, {
                        value: '### ',
                        label: "三级标题"
                    }]}
                />
                {isPreview
                    ? null
                    : <>
                        <Tooltip title="代码块" placement="bottom">
                            <CodeOutlined
                                className="feature-bar-label"
                                onClick={handleInsertCodeBlock}
                            />
                        </Tooltip>
                        <Tooltip title="图片" placement="bottom">
                            <PictureOutlined
                                className="feature-bar-label"
                                onClick={showDrawer}
                            />
                        </Tooltip>
                        <Drawer placement="right"
                            open={drawerShow}
                            onClose={closeDrawer}
                            style={{ textAlign: 'center' }}
                        >
                            <Button type="primary" onClick={showInputFile}>
                                上传图片
                            </Button>
                            <input
                                id="img-upload"
                                type="file"
                                ref={inputFileRef}
                                onChange={handleInsertPicture}
                            />
                        </Drawer>
                    </>}
            </Space>
        </Col>
    )
}
export default ToolBar;