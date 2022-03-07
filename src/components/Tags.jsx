import style from "./Tags.module.css";
import { useState } from "react";

export default function Tags(props) {
  // const allTagsList = [];
  const allTagsList = [props.allTagsListState];
  const tagList = props.tagListState;
  const existingTagsListRender = new Set([]);
  const [existingTagsList, setExistingTagsList] = useState(new Set([]));
  const uniqueTagList = [props.uniqueTagListState];

  function handleAddToTagList(tag) {
    //  let newTag = tag.target.value;
    //   if (id.checked){console.log("''''''")} else {console.log("not")}
    // }
    //   if(event.target.id.checked){console.log("checked")}else{console.log("not checked")}
    // }
    // if (tagList && Array.isArray(tagList))
    // var radList = uniqueTagList.getElementsById(tag);
    //   if(radList.checked) console.log("fff")// document.getElementById(radList[i].id).checked = false;
    // }

    // timesClicked++;
    // console.log("1");
    // if (timesClicked%2==0) {
    //   console.log("not-included",tag)
    //   props.addToTagList(tag);
    // } else {
    //   uncheckTag(tag)
    //   props.removeFromTagList(tag)
    // }}

    // function handleAddToTagList(tag) {
    console.log(tag);
    console.log("tagList: ", tagList);
    let newTags = Array.from(tagList);

    //console.log("tagListArray:", tagListArray);
    // if (tagList && Array.isArray(tagList)) {
    //   console.log("1");
    for (const tags of newTags) {
      //let newTagsList = Array.from(tags);
      let newTags = tags.toString()
      
      console.log("tags: ", newTags);
      console.log("tag: ", tag);
      if (newTags == tag) {
        console.log("included", newTags);
        props.removeFromTagList(tag);
        console.log("removeFromTagList_1", tag);
        uncheckTag(tag);
      } else {
        console.log("not-included", newTags);
        props.addToTagList(tag);
      }
    }
  }
  // else {
  //   console.log("aa",tag)
  //   props.addToTagList(tag);

  function uncheckTag(tag) {
    // let newText = newTextEvent.target.value;
    uniqueTagList.target.tag.checked = false;
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
