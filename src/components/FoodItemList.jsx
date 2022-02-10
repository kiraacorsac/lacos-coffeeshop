import FoodItem from "./FoodItem"
import style from "./FoodItemList.module.css"


export default function FoodItemList(props) {

    const foodItemListRender = []

    for (const food of props.data) {
        foodItemListRender.push(
            <FoodItem key={food.id} food={food}/>
        )
    }

    return   <div className={style.foodItemList}>
    {foodItemListRender}
</div>
}