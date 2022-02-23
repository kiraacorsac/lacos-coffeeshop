import style from "./Tags.module.css";
import { useState } from "react";

export default function Tags(props) {
  // const allTagsList = [];
  const allTagsList = [props.allTagsListState];
  const existingTagsListRender = new Set([]);
  const [existingTagsList, setExistingTagsList] = useState(new Set([]));
  // let existingTagsListAray = [...existingTagsList]
  // let newExistingTagsListSet = new Set(existingTagsListAray)
  // let tagListArray = [...props.data]
  // let tagListLowerCase = tagListArray.map(str => str.toLowerCase());
  for (const food of props.data) {
    //console.log("Food existing :", typeof food);
    for (const tag of food.tags) {
      //console.log("item existing :", tag);

      //     if (existingTagsList && Array.isArray(existingTagsList)) { console.log("tag pushed :",tag)
      //     let newExistingTagsList = new Set(existingTagsList);
      //     newExistingTagsList.push(<form action="mailto:lfilka@intl.att.com"><div className={style.tag}><input type="radio" name="tag" id={tag} />{tag},
      //     </div></form>)
      //     setExistingTagsList(newExistingTagsList)

      //   }

      if (allTagsList && Array.isArray(allTagsList))
        if (allTagsList.includes(tag)) {
          //console.log("Tag already included:", tag);
        } else {
          //console.log("tag pushed :", tag);
          allTagsList.push(
            <form action="mailto:lfilka@intl.att.com">
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
        }
      else {
        //console.log("tag added:", tag);
        allTagsList = [tag];
      }
    }
    //console.log("allTagsList:", existingTagsList);
  }

  return (
    <div className={style.tags}>
      {" "}
      Tags:
      {allTagsList}
    </div>
  );
}
