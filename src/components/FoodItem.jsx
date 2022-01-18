import style from "./FoodItem.module.css";

export default function FoodItem(props) {
    return <div className={style.item}>

        <img className={style.image} src="https://i.imgur.com/YBZacyX.jpeg" alt="test" />


        <div className={style.content}>
            <div className={style.buttons}>
                <span>L</span>
                <span>S</span>
            </div>
            <div className={style.name}>
                FoodItem bla bla bla bla bla bla
            </div>
        </div>
    </div>
}