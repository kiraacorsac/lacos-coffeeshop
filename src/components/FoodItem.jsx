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
  const [feedbackIkon, setFeedbackIkon] = useState(farHeart);

  function switchFeedback() {
    if (feedbackIkon == farHeart) {
      setFeedbackIkon(fasHeart);
    } else {
      setFeedbackIkon(farHeart);
    }
  }

  function clickHandlerThumbsUp() {
    setbuttonClickedTimesThumbsUp(buttonClickedTimesThumbsUp + 1);
  }
  function clickHandlerThumbsDown() {
    setbuttonClickedTimesThumbsDown(buttonClickedTimesThumbsDown + 1);
  }

  const tagsRender = (
    <div className={style.tag}>{props.food.tags.join(", ")}</div>
  );

  // for (const tag of props.food.tags) {
  //     tagsRender.push(<div className={style.tag}>{tag},</div>)
  // }

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
          ></FontAwesomeIcon>
        </div>
        <div className={style.name}>{props.food.name}</div>
        <div className={style.tagsDate}>
          <div className={style.tags}>Tags: {tagsRender}</div>
          <div className={style.date}>Date: {props.food.date}</div>
        </div>
      </div>
    </div>
  );
}
