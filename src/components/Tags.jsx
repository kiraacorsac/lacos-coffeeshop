import style from "./Tags.module.css";
import { useState } from "react";

export default function Tags(props) {
  // const allTagsList = [];
  const allTagsList = [props.allTagsListState];
  const existingTagsListRender = new Set([]);
  const [existingTagsList, setExistingTagsList] = useState(new Set([]));
  const tagList = props.tagListState;
  const uniqueTagList = [props.uniqueTagListState];

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

   let tagsId = 0;
  for (const food of props.data) {
    for (const tag of food.tags) {
      if (allTagsList && Array.isArray(allTagsList))
        if (allTagsList.includes(tag)) {
        } else {
          allTagsList.push(tag);
          tagsId++; // tagId = tagId + 1
        }
      else {
        allTagsList = [tag];
      }
    }
  }

  //sorting from A-Z
  allTagsList.sort(function (a, b) {
    return a.localeCompare(b); //using String.prototype.localCompare()
  });

  let tagId = 0;
  for (const tag of allTagsList) {
    if (uniqueTagList.includes(tag)) {
    } else if (tag == "") {
    } else {
      uniqueTagList.push(
        <form action="mailto:lfilka@intl.att.com" key={tagId}>
          <div className={style.tag}>
            <input
              type="radio"
              checked = {newTagListArray.includes(tag)}
              name="tag"
              id={tag}
              key={tag}
              onClick={() => handleAddToTagList(tag)}
            />
            {tag},
          </div>
        </form>
      );
      tagId++; // tagId = tagId + 1
    }
  }

  return (
    <div className={style.tags}>
      Tags:
      {uniqueTagList}
    </div>
  );
}