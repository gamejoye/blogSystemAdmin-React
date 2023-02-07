import { RedoOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, InputRef, List, Row, Tag } from "antd";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectAllTags } from "../../../redux/selectors/blogSelector";

interface IProps {
    selectedTags: string[];
    setSearchTerm: (searchTerm: string) => void;
    handleTagOnClick: (tag: string, isSelected: boolean) => void;
}


const SearchBar = ({ selectedTags, setSearchTerm, handleTagOnClick }: IProps) => {
    const unSeletedTags = useSelector(selectAllTags).filter(tag => !selectedTags.includes(tag));
    const handleOnClose = (e: React.MouseEvent<HTMLElement>, tag: string) => {
        e.preventDefault();
        handleTagOnClick(tag, true);
    }

    const tagStyle: React.CSSProperties = {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5
    }
    
    const tagItemStyle: React.CSSProperties = {
        display: 'inline-block',
        padding: 5
    }

    const unselectedTagItems = (
        <List
            locale={{ emptyText: '没有更多标签了' }}
            dataSource={unSeletedTags}
            split={false}
            renderItem={tag => (<List.Item style={tagItemStyle}>
                <Tag style={{ ...tagStyle, cursor: 'pointer' }} color="blue" onClick={() => handleTagOnClick(tag, false)}>{tag}</Tag>
            </List.Item>)}
        />
    )
    const selectedTagItems = (
        <List
            locale={{ emptyText: '未选择标签' }}
            dataSource={selectedTags}
            split={false}
            renderItem={tag => (<List.Item style={tagItemStyle}>
                <Tag style={tagStyle} color="green" closable={true} onClose={(e) => handleOnClose(e, tag)}>{tag}</Tag>
            </List.Item>)}
        />
    )
    return (
        <div>
            <Row>
                <Col span={12}>
                    <Input
                        placeholder="搜索关键词"
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                        allowClear={{ clearIcon: <RedoOutlined /> }}
                    />
                </Col>
            </Row>
            <Divider orientation="left">
                可供选择的标签:
            </Divider>
            {unselectedTagItems}
            <Divider orientation="left">
                已经选择的标签:
            </Divider>
            {selectedTagItems}
        </div>
    )
}

export default SearchBar;