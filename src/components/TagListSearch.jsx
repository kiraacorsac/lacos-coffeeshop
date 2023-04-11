import { useState } from "react";
import style from "./TagSearch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

//just a component
function Tag(props) {
  return (
    <div className={style.tag}>
      <FontAwesomeIcon
        icon={faTimesCircle}
        onClick={props.onTagDelete}
      ></FontAwesomeIcon>{" "}
      {props.tag.tag}
    </div>
  );
}

//also a component
// TODO: style everytnig
export default function TagListSearch(props) {
  const [searchedTag, setSearchedTag] = useState("");
  const [tagList, setTagList] = props.tagListState;

  function addSearchTagToTagList(props) {
    console.log("Searched Tag:", searchedTag);
    console.log("Props:", props);
    props.addToFilterTagList(searchedTag);
    setSearchedTag("");
  }


  function handleChange(event) {
    setSearchedTag(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addSearchTagToTagList(props);
    }
  }


  function handleTagDelete(tag) {
    console.log("tag delete", tag)
    console.log("props", props)
    props.removeFromTagList(tag);
    console.log("removeFromTagList_2", tag);

  }

  const tagListRender = [];


  for (const tag of tagList) {
    tagListRender.push(
      <Tag tag={tag} key={tag.id} onTagDelete={() => handleTagDelete(tag)} />
    );
  }

  return (
    <div className={style.searchBox}>
      <input
        type="text"
        className={style.tagInput}
        placeholder="enter tags"
        value={searchedTag}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <div className={style.tagList}>{tagListRender}</div>
    </div>
  );
}
