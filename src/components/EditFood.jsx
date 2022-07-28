import { useState } from "react";
import TagInput from "./TagInput";
import style from "./FoodForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useGet, useMutate } from "restful-react";

//TODO: add rest of the inputs
//TODO: style
export default function EditFood(props) {
  const { data: rawTags } = useGet({
    path: "/tags/",
  });
  let tags = rawTags ?? [];
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;
  const [tagSet, setTagSet] = useState(new Set(foodItemEditRender.tags));
  const [imgLink, setImgLink] = useState(foodItemEditRender.image);
  const [name, setName] = useState(foodItemEditRender.name);

  let tagsList = [];
  tagSet.forEach((tag) => {
    tags.map((e) => {
      if (e.tag === tag) {
        tagsList.push(e.id);
      }
    });
  });

  function handleImgChange(event) {
    setImgLink(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function addToTagSet(tag) {
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
    let newTagSet = new Set(tagSet); // slice for sets
    newTagSet.delete(tag); // push for set
    setTagSet(newTagSet);
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
    } else console.log("foodItemEditRender", foodItemEditRender);
    return {
      ...foodItemEditRender,
      id: foodItemEditRender.id,
      name: name,
      image: imgLink,
      tags: tagsList,
      // id: foodItemEditRender.id,
      // name: name,
      // image: imgLink,
      // tags: tagsList,
      // likes: foodItemEditRender.likes,
      // dislikes: foodItemEditRender.dislikes,
      // fave: foodItemEditRender.fave,
      // date: foodItemEditRender.date,
    };
  }

  return (
    <>
      <div className={style.header}>
        <div className={style.projectname}>
          {" "}
          <FontAwesomeIcon
            className={style.icon}
            icon={faCoffee}
          ></FontAwesomeIcon>{" "}
          LACO"S COFFEESHOP
        </div>
        <div className={style.newfood}>EDIT FOOD</div>
      </div>
      <div className={style.form}>
        <img className={style.image} src={imgLink} alt="Image Link Preview" />
        <div className={style.inputs}>
          <input
            type="text"
            className={style.foodName}
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <TagInput
            tagListState={[tagSet, setTagSet]}
            addToTagList={addToTagSet}
            removeFromTagList={removeFromTagSet}
          />
          <input
            type="url"
            className={style.imgLink}
            placeholder="http://image-url"
            onChange={handleImgChange}
            value={imgLink}
          />
          <input
            className={style.saveButton}
            type="button"
            value="Save"
            onClick={() => props.onFoodEditSave(makeFoodRecord())}
          />

          <input
            className={style.deleteButton}
            type="button"
            value="Delete"
            onClick={() => props.onDeleteFood(makeFoodRecord())}
          />
        </div>
      </div>
    </>
  );
}
