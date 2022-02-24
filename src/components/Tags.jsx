import style from "./Tags.module.css";
import { useState } from "react";

export default function Tags(props) {
  // const allTagsList = [];
  const allTagsList = [props.allTagsListState];
  const existingTagsListRender = new Set([]);
  const [existingTagsList, setExistingTagsList] = useState(new Set([]));



  let tagId = 0;
  for (const food of props.data) {
    console.log("Food existing :", typeof food);
    for (const tag of food.tags) {
      console.log("item existing :", tag);
      if (allTagsList && Array.isArray(allTagsList))
        if (allTagsList.includes(tag)) {
          console.log("Tag already included:", tag);
        } else {
          console.log("tag pushed :", tag);
          allTagsList.push(
            <form action="mailto:lfilka@intl.att.com" key={tagId} >
              <div className={style.tag}>
                <input
                  type="radio"
                  name="tag"
                  id={tag}
                  onClick={() => props.addToTagList(tag)}
                />
                {tag},
              </div>
            </form>
          );
          tagId++; // tagId = tagId + 1
        }
      else {
        console.log("tag added:", tag);
        allTagsList = [tag];
      }
    }
    console.log("allTagsList:", existingTagsList);
  }

  return (
    <div className={style.tags}>
      {" "}
      Tags:
      {allTagsList}
    </div>
  );
}
