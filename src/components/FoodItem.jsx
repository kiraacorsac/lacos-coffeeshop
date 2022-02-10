import style from "./FoodItem.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'


export default function FoodItem(props) {

    const [buttonClickedTimesThumbsUp, setbuttonClickedTimesThumbsUp] = useState(0);
    const [buttonClickedTimesThumbsDown, setbuttonClickedTimesThumbsDown] = useState(0);
    const [feedbackIkon, setFeedbackIkon] = useState(farHeart);

    function switchFeedback() {
        if (feedbackIkon == farHeart) {
            setFeedbackIkon(fasHeart)
        } else {
            setFeedbackIkon(farHeart)
        }
    }
    
    function clickHandlerThumbsUp() {
        setbuttonClickedTimesThumbsUp(buttonClickedTimesThumbsUp + 1);
    }
    function clickHandlerThumbsDown() {
        setbuttonClickedTimesThumbsDown(buttonClickedTimesThumbsDown + 1);
      }
console.log(props.food)
    return <div className={style.item}>

        <img className={style.image} src={props.food.image} alt="test" />

        <div className={style.content}>
            <div className={style.buttons}>
                <FontAwesomeIcon icon={feedbackIkon} onClick={switchFeedback}></FontAwesomeIcon>&nbsp;
                <FontAwesomeIcon icon={faThumbsUp} onClick={clickHandlerThumbsUp}></FontAwesomeIcon><span>{buttonClickedTimesThumbsUp}</span>&nbsp;
                <FontAwesomeIcon icon={faThumbsDown} onClick={clickHandlerThumbsDown}></FontAwesomeIcon><span>{buttonClickedTimesThumbsDown}</span>&nbsp;
                <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
            </div>
            <div className={style.name}>
                {props.food.name}
            </div>
        </div>
    </div>
}
