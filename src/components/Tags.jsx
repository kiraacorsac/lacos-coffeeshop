import style from "./Tags.module.css";
import { useState } from "react";

export default function Tags(props) {
  const tagList = props.tagListState;
  const allTagsList = [];
  const renderedTagToggleList = [];

  let newTagListArray = [...tagList];

  function handleAddToTagList(tag) {

    console.log("typeof tag: ", typeof tag);
    if (newTagListArray && Array.isArray(newTagListArray)) {
      if (newTagListArray.includes(tag)) {
        //console.log("included", val);
        props.removeFromTagList(tag);
        console.log("removeFromTagList_1", tag);
        //  uncheckTag(tag);
      } else {
        console.log("not included", tag);
        console.log("newTagListArray", newTagListArray);
        props.addToTagList(tag);
      }
    }
  }

  for (const food of props.data) {
    for (const tag of food.tags) {
      if (allTagsList && Array.isArray(allTagsList)) {
        if (!allTagsList.includes(tag.name)) {
          allTagsList.push(tag.name);
        }
      } else {
        allTagsList = [tag.name];
      }
    }
  }

  //sorting from A-Z
  allTagsList.sort(function (a, b) {
    return String(a).localeCompare(String(b)); //using String.prototype.localCompare()
  });

  let tagId = 0;
  for (const tag of allTagsList) {
    renderedTagToggleList.push(
      <div className={style.tag} key={tagId}>
        <input
          type="checkbox"
          checked={newTagListArray.includes(tag)}
          name="tag"
          id={tag}
          key={tag}
          onChange={() => handleAddToTagList(tag)}
        />
        <label htmlFor={tag} >
          {tag}
        </label>
      </div>
    );
    tagId++; // tagId = tagId + 1
  }

  return (
    <div className={style.tags}>
      Tags:
      {renderedTagToggleList}
    </div>
  );
}