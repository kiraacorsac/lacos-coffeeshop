import style from "./FoodItem.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'

export default function FoodItem(props) {
    return <div className={style.item}>

        <img className={style.image} src="https://i.imgur.com/YBZacyX.jpeg" alt="test" />


        <div className={style.content}>
            <div className={style.buttons}>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>&nbsp;
                <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
            </div>
            <div className={style.name}>
                Pepperoni Pizza
            </div>
        </div>
    </div>
}