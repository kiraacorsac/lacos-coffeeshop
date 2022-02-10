import FoodItem from "./FoodItem"
import style from "./FoodItemList.module.css"


export default function FoodItemList(props) {

    const foodItemListRender = []
    

    //TODO: implement tag filtering
    //example:
    // tagFilter = { 'italian' }
    // food.tags = ['italian', 'baked', 'meat'] => pass
    // food.tags = ['italian', 'meat', 'pasta'] => pass
    // food.tags = ['baked', 'sweet'] => not
    
    // tagFilter = {'italian', 'baked'}
    // food.tags = ['italian', 'baked', 'meat'] => pass
    // food.tags = ['italian', 'meat', 'pasta'] => not
    // food.tags = ['baked', 'sweet'] => not

    // tagFilter = {'tofu'}
    // nothing of the above passes
    console.log(props.tagFilter)
    for (const food of props.data) {
        console.log(food.tags)
        const foodTagsListRender = []
        for (const tag of food.tags) {
            foodTagsListRender.push(tag)
        }
       if (foodTagsListRender == props.tagFilter){
        foodItemListRender.push(
            <FoodItem key={food.id} food={food}/>
        )
    }  
}

    return   <div className={style.foodItemList}>
    {foodItemListRender}
</div>
    }