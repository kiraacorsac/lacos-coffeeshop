import { useState } from "react"
import style from "./TagSearch.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'


//just a component
function Tag(props) {
    return <div className={style.tag}>
        <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon> {props.tag}
    </div>
}

//also a component
// TODO: clear input after adding tag
// TODO: input tag on pressing enter (same as pressing the add tag button)
// TODO: style everytnig
// TODO (hard!): implement deleting tags when X is clicked on the tag 
export default function TagSearch(props) {
    const [tagList, setTagList] = useState(["salat", "chicken", "tofu", "beef"])
    const [searchedTag, setSearchedTag] = useState("");


    function addToTagList(tag) {
        let newTagList = tagList.slice();
        newTagList.push(tag);
        setTagList(newTagList);
    }

    function handleChange(e) {
        setSearchedTag(e.target.value)
    }


    function handleClick(e){
        addToTagList(searchedTag)
    }


    const tagListRender = [];
    for (const tag of tagList) {
        tagListRender.push(
            <Tag tag={tag} />
        )
    }

    return <div className={style.searchBox}>
        <input type="text" className={style.tagInput} value={searchedTag} onChange={handleChange} />
        <button onClick={handleClick}>Add Tag</button>
        <div className={style.tagList}>
            {tagListRender}
        </div>
    </div>
}