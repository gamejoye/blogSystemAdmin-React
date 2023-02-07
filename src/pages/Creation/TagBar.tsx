import { PlusOutlined } from "@ant-design/icons";
import { Col, Input, InputRef, Tag } from "antd"
import { useEffect, useRef, useState } from "react"

interface IProps {
    isPreview: boolean;
    tags: string[];
    setTags: (newTags: string[]) => void;
}

const TagBar = ({ isPreview, tags, setTags }: IProps) => {
    const [inputShow, setInputShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputShow) inputRef.current?.focus();
    }, [inputShow]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            const newTags = [...tags, inputValue];
            setTags(newTags);
        }
        setInputShow(false);
        setInputValue('');
    }

    const handleOnClose = (removeTag: string) => {
        const newTags = tags.filter(tag => tag !== removeTag);
        setTags(newTags);
    }

    const showInput = () => {
        setInputShow(true);
    }

    const tagInputStyle: React.CSSProperties = {
        width: 78,
        verticalAlign: 'top',
    }

    const tagPlusStyle: React.CSSProperties = {
        borderStyle: 'dashed',
    }

    return (
        <Col span={isPreview ? 0 : 24} offset={0} className="creation-component-interval">
            {tags.map((tag) => {
                return (<Tag
                    key={tag}
                    closable={true}
                    onClose={() => handleOnClose(tag)}
                >
                    {tag}
                </Tag>)
            })}
            {inputShow
                ? (<Input
                    ref={inputRef}
                    size="small"
                    style={tagInputStyle}
                    onChange={handleOnChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />)
                : tags.length < 5
                    ? (<Tag
                        style={tagPlusStyle}
                        onClick={showInput}
                    >
                        <PlusOutlined />newTag
                    </Tag>)
                    : null
            }
        </Col>
    )
}
export default TagBar;