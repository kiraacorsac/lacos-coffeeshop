import style from "./FoodItem.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function FoodItem(props) {
  const [buttonClickedTimesThumbsUp, setbuttonClickedTimesThumbsUp] = useState(
    props.food.likes
  );
  const [buttonClickedTimesThumbsDown, setbuttonClickedTimesThumbsDown] =
    useState(props.food.dislikes);
  // const [feedbackIkon, setFeedbackIkon] = useState(props.food.fave);
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;
  // const tagListRender = props.tagListRenderState;
  // const foodItemRender = [];

  function handlePushFoodToEditRender() {
    // console.log("handlePushFoodToEditRender", props.food);
    setFoodItemEditRender(props.food);
    // console.log("props.food.tags: ", props.food.tags);
    props.setModalEditFlagTrue();
  }

  function switchFeedback() {
    let newFood = { ...props.food };
    newFood.fave = !props.food.fave;
    props.onFoodEditSave(newFood);
  }

  function clickHandlerThumbsUp() {
    setbuttonClickedTimesThumbsUp(buttonClickedTimesThumbsUp + 1)
    let newFood = {
      ...props.food
    }
    newFood.likes = newFood.likes + 1
    props.onFoodEditSave(newFood);
  }


  function clickHandlerThumbsDown() {
    setbuttonClickedTimesThumbsDown(buttonClickedTimesThumbsDown + 1)
    let newFood = {
      ...props.food
    }
    newFood.dislikes = newFood.dislikes + 1
    props.onFoodEditSave(newFood);
  }

  function ikonRender() {
    if (props.food.fave == true) {
      let ikonRef = fasHeart;
      return ikonRef
    } else {
      let ikonRef = farHeart;
      return ikonRef
    }


  }

  let tagNames = [];


  for (let tag of props.food.tags) {
    tagNames.push(tag.tag)

  }

  const tagsRender = (<div className={style.tags}>{tagNames.join(", ")}</div>);





  return (
    <div className={style.item}>
      <img className={style.image} src={props.food.image} alt="test" />

      <div className={style.content}>
        <div className={style.buttons}>
          <FontAwesomeIcon
            className={style.icons}
            icon={ikonRender()}
            onClick={switchFeedback}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className={style.icons}
            icon={faThumbsUp}
            onClick={clickHandlerThumbsUp}
          ></FontAwesomeIcon>
          <div className={style.iconsclick}>{buttonClickedTimesThumbsUp}</div>
          <FontAwesomeIcon
            className={style.icons}
            icon={faThumbsDown}
            onClick={clickHandlerThumbsDown}
          ></FontAwesomeIcon>
          <div className={style.iconsclick}>{buttonClickedTimesThumbsDown}</div>
          <FontAwesomeIcon
            className={style.icons}
            icon={faCog}
            onClick={handlePushFoodToEditRender}
          ></FontAwesomeIcon>
        </div>
        <div className={style.nametagsbox}>
          <div className={style.name}>{props.food.name}</div>

          <div className={style.tagsDate}>
            <div className={style.tags}>Tags: {tagsRender}</div>

            <div className={style.date}>Date: {props.food.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
