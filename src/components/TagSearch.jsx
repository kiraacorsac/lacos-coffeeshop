import { useState } from "react"
import style from "./TagSearch.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'


//just a component
function Tag(props) {
    return <div className={style.tag}>
        <FontAwesomeIcon icon={faTimesCircle} onClick={props.onTagDelete}></FontAwesomeIcon> {props.tag}
    </div>
}

//also a component
// TODO: style everytnig
export default function TagSearch(props) {
    const [searchedTag, setSearchedTag] = useState("");
    const [tagList, setTagList] = props.tagListState;


    function addToTagList(tag) {
        let tagListArray = [...tagList]
        let tagListLowerCase = tagListArray.map(str => str.toLowerCase());
        let newTagListSet = new Set(tagListLowerCase)
        if (tag === "") {
            return;
        }
        else if (newTagListSet.has(tag.toLowerCase())) {
            return;
        }

        let newTagList = new Set(tagList); // slice for sets
        newTagList.add(tag); // push for set
        setTagList(newTagList);
    }

    function removeFromTagList(tag) {
        let newTagList = new Set(tagList); // slice for sets
        newTagList.delete(tag); // push for set
        setTagList(newTagList);
    }


    function addSearchTagToTagList() {
        addToTagList(searchedTag);
        setSearchedTag("");
    }

    function handleChange(event) {
        setSearchedTag(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addSearchTagToTagList();
        }
    }

    function handleTagDelete(tag) {
        removeFromTagList(tag)
    }



    const tagListRender = [];
    for (const tag of tagList) {
        tagListRender.push(
            <Tag tag={tag} key={tag} onTagDelete={() => handleTagDelete(tag)} />
        )
    }

    return <div className={style.searchBox}>
        <input type="text"
            className={style.tagInput}
            placeholder="enter tags"
            value={searchedTag}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
        />
        <div className={style.tagList}>
            {tagListRender}
        </div>
    </div>
}