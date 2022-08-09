import style from "./FoodItem.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useGet, useMutate } from "restful-react";

export default function FoodItem(props) {
  const { data: rawTags } = useGet({
    path: "/tags/",
  });
  let tags = rawTags ?? [];

  let buttonClickedTimesThumbsUp = props.food.likes;
  let buttonClickedTimesThumbsDown = props.food.dislikes;
  let feedbackIkon = fasHeart;
  let feedbackBoolean = props.food.fave;
  let tagSet = [props.food.tags];
  // const [tagSet, setTagSet] = useState(new Set(props.food.tags));
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;
  const tagListRender = props.tagListRenderState;
  const foodItemRender = [];

  if (props.food.fave === false) {
    feedbackIkon = farHeart;
  } else {
    feedbackIkon = fasHeart;
  }

  let tagsList = [];
  tagSet.forEach((tag) => {
    tags.map((e) => {
      if (e.tag === tag) {
        tagsList.push(e.id);
      }
    });
  });

  function handlePushFoodToEditRender() {
    setFoodItemEditRender(props.food);
    props.setModalEditFlagTrue();
  }

  function switchFeedback() {
    if (props.food.fave == false) {
      feedbackBoolean = true;
      handleEditFoodSave();
    } else {
      feedbackBoolean = false;
      handleEditFoodSave();
    }
  }

  function clickHandlerThumbsUp() {
    buttonClickedTimesThumbsUp = buttonClickedTimesThumbsUp + 1;
    handleEditFoodSave();
  }
  function clickHandlerThumbsDown() {
    buttonClickedTimesThumbsDown = buttonClickedTimesThumbsDown + 1;
    handleEditFoodSave();
  }

  function makeFoodRecord() {
    return {
      ...props.food,
      id: props.food.id,
      likes: buttonClickedTimesThumbsUp,
      dislikes: buttonClickedTimesThumbsDown,
      fave: feedbackBoolean,
      tags: tagsList,
    };
  }

  function handleEditFoodSave() {
    props.onFoodEditSave(makeFoodRecord());
  }
  const tagsRender = (
    <div className={style.tag}>{props.food.tags.join(", ")}</div>
  );

  return (
    <div className={style.item}>
      <img className={style.image} src={props.food.image} alt="test" />

      <div className={style.content}>
        <div className={style.buttons}>
          <FontAwesomeIcon
            className={style.icons}
            icon={feedbackIkon}
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
            <div className={style.date}>
              Date:{" "}
              {new Date(props.food.date).toLocaleDateString("en-uk", {
                day: "numeric",
                year: "numeric",
                month: "short",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
