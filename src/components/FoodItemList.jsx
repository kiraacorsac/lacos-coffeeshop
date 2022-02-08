import FoodItem from "./FoodItem"

export default function FoodItemList(props) {

    const foodItemListRender = []

    //TODO: make it so FoodItem displays props of the food it's supposed to show
    for (const food of props.data) {
        foodItemListRender.push(
            <FoodItem key={food.id} />
        )
    }

    return foodItemListRender
}