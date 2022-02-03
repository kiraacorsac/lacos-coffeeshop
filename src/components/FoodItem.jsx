import style from "./FoodItem.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'



//TODO: Make it so when you click the heart, number next to it goes up by one
export default function FoodItem(props) {
    return <div className={style.item}>

        <img className={style.image} src="https://i.imgur.com/YBZacyX.jpeg" alt="test" />


        <div className={style.content}>
            <div className={style.buttons}>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon><span>0</span>&nbsp;
                <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
            </div>
            <div className={style.name}>
                Pepperoni Pizza
            </div>
        </div>
    </div>
}