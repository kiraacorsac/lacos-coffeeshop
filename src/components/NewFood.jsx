import { useState } from "react";
import TagInput from "./TagInput";
import style from "./FoodForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

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

  function addToTagSet(tag) {
    let tagListArray = [...tagSet];
    console.log("taglistarray", tagListArray)
    let tagListLowerCase = tagListArray.map((tagObject) => tagObject.tag.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);
    if (tag === "") {
      return;
    } else if (newTagListSet.has(tag.toLowerCase())) {
      return;
    }
    let output = props.onAddTag(tag).then((newTag) => {

      let newTagList = new Set(tagSet); // slice for sets
      newTagList.add(newTag); // push for set
      setTagSet(newTagList);
    });
  }

  // function addToTagList(tag) {
  //   let tagListArray = [...tagSet];
  //   let tagListLowerCase = tagListArray.map((str) => str.toLowerCase());
  //   let newTagListSet = new Set(tagListLowerCase);
  //   if (tag === "") {
  //     return;
  //   } else if (newTagListSet.has(tag.toLowerCase())) {
  //     return;
  //   }

  //   let newTagList = new Set(tagSet); // slice for sets
  //   newTagList.add(tag); // push for set
  //   setTagSet(newTagList);
  // }

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
        <div className={style.newfood}>NEW FOOD</div>
      </div>
      <div className={style.form}>
        <img className={style.image} src={imgLink} alt="Image Link Preview" />
        <div className={style.secondbox}>
          <input type="text" className={style.foodName} placeholder="Name" onChange={handleNameChange} />
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
          />
          <input
            type="button"
            className={style.saveButton}
            value="Save"
            onClick={() => props.onFoodNewSave(makeFoodRecord())}
          />
        </div>
      </div>
    </>
  );
}
