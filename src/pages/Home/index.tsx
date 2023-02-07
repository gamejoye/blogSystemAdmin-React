import { useState } from "react"
import { useSelector } from "react-redux";
import { selectFilterTagsBlogs } from "../../redux/selectors/blogSelector";
import { IRootState } from "../../redux/store";
import Posts from "./Posts";
import SearchBar from "./SearchBar";
import './index.scss'

const Home = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const allFiterTagsAndSearchTermBlogs = useSelector(
        (state: IRootState) => selectFilterTagsBlogs(state, selectedTags)
    ).filter(
        blog => blog.title.toUpperCase().includes(searchTerm.toUpperCase())
    );

    const handleTagOnClick = (tag: string, isSelected: boolean) => {
        if (isSelected) setSelectedTags(selectedTags.filter(seletedTag => seletedTag !== tag));
        else setSelectedTags([...selectedTags, tag]);
    }

    

    return (
        <div>
            <div className="home-left">
                <SearchBar selectedTags={selectedTags} setSearchTerm={setSearchTerm} handleTagOnClick={handleTagOnClick} />
                <Posts blogs={allFiterTagsAndSearchTermBlogs} />
            </div>
            <div className="home-right"></div>
        </div>
    )
}

export default Home;