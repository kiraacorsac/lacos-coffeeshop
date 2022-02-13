import style from "./FoodItem.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
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

    const tagsItemListRender = []
    for (const tag of props.food.tags) {  
        //console.log("Tag name :",tag)  
        tagsItemListRender.push(<div className={style.tag}>{tag},</div>)
    }

    return <div className={style.item}>

        <img className={style.image} src={props.food.image} alt="test" />

        <div className={style.content}>
            <div className={style.buttons}>
                <FontAwesomeIcon className={style.icons} icon={feedbackIkon} onClick={switchFeedback}></FontAwesomeIcon>
                <FontAwesomeIcon className={style.icons} icon={faThumbsUp} onClick={clickHandlerThumbsUp}></FontAwesomeIcon><span className={style.icons}>{buttonClickedTimesThumbsUp}</span>
                <FontAwesomeIcon className={style.icons} icon={faThumbsDown} onClick={clickHandlerThumbsDown}></FontAwesomeIcon><span className={style.icons}>{buttonClickedTimesThumbsDown}</span>
                <FontAwesomeIcon className={style.icons} icon={faCog}></FontAwesomeIcon>
            </div>
            <div className={style.name}>Name: 
                {props.food.name}
            </div>
            <div className={style.tags}> Tags: 
            {tagsItemListRender}
            </div>
        </div>
    </div>
}
