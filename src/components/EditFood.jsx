import { useState } from "react";
import TagInput from "./TagInput";
import style from "./NewFood.module.css";

//TODO: add rest of the inputs
//TODO: style
export default function EditFood(props) {
  const [tagSet, setTagSet] = props.tagSetState;
  const [imgLink, setImgLink] = props.imgLinkState;
  const [name, setName] = props.nameState;
  const food = props.foodState;
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;

  function handleImgChange(event) {
    setImgLink(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
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

  for (const tag of foodItemEditRender.tags) {
    addToTagList(tag);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        defaultValue={foodItemEditRender.name}
        onChange={handleNameChange}
      />
      <TagInput
        tagListState={[tagSet, setTagSet]}
        addToTagList={addToTagList}
        removeFromTagList={props.removeFromTagList}
      />
      <input
        type="button"
        value="Save"
        onClick={() => props.onFoodEditSave(makeFoodRecord())}
      />

      <input
        type="url"
        placeholder="http://image-url"
        onChange={handleImgChange}
        defaultValue={foodItemEditRender.image}
      />
      <img
        className={style.image}
        src={foodItemEditRender.image}
        alt="Image Link Preview"
      />
    </div>
  );
}
