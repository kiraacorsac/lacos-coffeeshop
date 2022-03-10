import { useState } from "react";
import TagInput from "./TagInput";
import style from "./NewFood.module.css"
// import datetime from datetime
// now = datetime.now()


//TODO: add rest of the inputs
//TODO: style
export default function NewFood(props) {

    const [tagSet, setTagSet] = useState(new Set());
    const [imgLink, setImgLink] = useState("");
    const [name, setName] = useState("");
    
    function handleImgChange(event) {
        setImgLink(event.target.value);
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function addToTagList(tag) {
        let tagListArray = [...tagSet]
        let tagListLowerCase = tagListArray.map(str => str.toLowerCase());
        let newTagListSet = new Set(tagListLowerCase)
        if (tag === "") {
            return;
        }
        else if (newTagListSet.has(tag.toLowerCase())) {
            return;
        }

        let newTagList = new Set(tagSet); // slice for sets
        newTagList.add(tag); // push for set
        setTagSet(newTagList);
    }

    function makeFoodRecord() {
        return {
            name: name,
            image: imgLink,
            tags: [...tagSet],
        }
    }


    return <div>
        <input type="text" placeholder="Name" onChange={handleNameChange} />
        <TagInput tagListState={[tagSet, setTagSet]} addToTagList={addToTagList} />
        <input type="button" value="Save" onClick={() => props.onFoodSave(makeFoodRecord())} />

        <input type="url" placeholder="http://image-url" onChange={handleImgChange} />
        <img className={style.image} src={imgLink} alt="Image Link Preview" />
    </div>

}