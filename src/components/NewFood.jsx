import { useState } from "react";
import TagInput from "./TagInput";
import style from "./FoodForm.module.css";

//TODO: add rest of the inputs
//TODO: style
export default function NewFood(props) {
  const [imgLink, setImgLink] = useState("");
  const [name, setName] = useState("");
  const [tagSet, setTagSet] = useState(new Set());

  function handleImgChange(event) {
    setImgLink(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function compareTags(tag1, tag2) {
    let tag1LowerCase = tag1.toLowerCase();
    let tag2LowerCase = tag2.toLowerCase();
    return tag1LowerCase == tag2LowerCase;
  }

  function addToTagList(tag) {
    let tagListArray = [...tagSet];
    let tagListLowerCase = tagListArray.map((str) => str.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);
    if (tag === "") {
      return;
    } else if (newTagListSet.has(tag.toLowerCase())) {
      return;
    }

    let newTagList = new Set(tagSet); // slice for sets
    newTagList.add(tag); // push for set
    setTagSet(newTagList);
  }

  function removeFromTagSet(tag) {
    let newTagList = new Set(tagSet); // slice for sets
    newTagList.delete(tag); // push for set
    setTagSet(newTagList);
  }

  function makeFoodRecord() {
    if (name === "" && imgLink === "" && tagSet === "") {
      alert("Name , Image, Tags can not be empty");
    } else if (imgLink === "" && tagSet === "") {
      alert("Image, Tags can not be empty");
    } else if (name === "" && tagSet === "") {
      alert("Name , Tags can not be empty");
    } else if (name === "") {
      alert("Name can not be empty");
    } else if (imgLink === "") {
      alert("Image can not be empty");
    } else if (tagSet === "") {
      alert("Tags can not be empty");
    } else
      return {
        name: name,
        image: imgLink,
        tags: [...tagSet],
      };
  }

  return (
    <div>
      <input type="text" placeholder="Name" onChange={handleNameChange} />
      <TagInput
        tagListState={[tagSet, setTagSet]}
        addToTagList={addToTagList}
        removeFromTagList={removeFromTagSet}
      />
      <input
        type="button"
        value="Save"
        onClick={() => props.onFoodSave(makeFoodRecord())}
      />

      <input
        type="url"
        placeholder="http://image-url"
        onChange={handleImgChange}
      />
      <img className={style.image} src={imgLink} alt="Image Link Preview" />
    </div>
  );
}
