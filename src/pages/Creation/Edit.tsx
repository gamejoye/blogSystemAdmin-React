import { Col, Input } from "antd";
import React from "react";
import './index.scss'

interface IProps {
    titleValue: string;
    contentValue: string;
    isPreview: boolean;
    setContentValue: (content: string) => void;
    setTitleValue: (title: string) => void;
    setSelectionStart: (start: number) => void;
    setSelectionEnd: (start: number) => void;
}

const Edit = ({ titleValue, contentValue, isPreview, setContentValue, setTitleValue, setSelectionStart, setSelectionEnd }: IProps) => {
    const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value);
    }
    const updateContentSelection = (currentTarget: HTMLTextAreaElement) => {
        setSelectionStart(currentTarget.selectionStart);
        setSelectionEnd(currentTarget.selectionEnd);
    }
    const handleContentOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentValue(e.currentTarget.value);
        updateContentSelection(e.currentTarget);
    }
    const handleContentOnFocus = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        updateContentSelection(e.currentTarget);
    }
    const handleContentOnKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        updateContentSelection(e.currentTarget);
    }
    return (
        <Col span={isPreview ? 0 : 24} offset={0}>
            <Input
                value={titleValue}
                placeholder="博客标题~"
                size="large"
                maxLength={30}
                showCount
                className="creation-component-interval"
                onChange={handleTitleOnChange}
            />
            <Input.TextArea
                value={contentValue}
                placeholder="博客内容~"
                maxLength={10000}
                showCount
                rows={25}
                className="creation-component-interval"
                onChange={handleContentOnChange}
                onClick={handleContentOnFocus}
                onKeyUp={handleContentOnKeyUp}
            />
        </Col>
    )
}
export default Edit;