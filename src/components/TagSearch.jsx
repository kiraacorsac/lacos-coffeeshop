import { useState } from "react"
import style from "./TagSearch.module.css"


//just a component
// TODO: style
// TODO: replace X with appropriate FA icon
function Tag(props) {
    return <div className={style.tag}>
        <span>X</span> Tag
    </div>
}

//also a component
export default function TagSearch(props) {
    const [tagList, setTagList] = useState(["salat", "chicken", "tofu", "beef"])

    const tagListRender = [];
    for (const tag of tagList) {
        console.log(tag)
        tagListRender.push(
            <Tag />
        )
    }

    return <div className={style.searchBox}>
        <input type="text" className={style.tagInput} />
        <div className={style.tagList}>
            {tagListRender}
        </div>
    </div>
}