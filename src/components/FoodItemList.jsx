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
    //console.log(props.tagFilter)
    for (const food of props.data) {
        //console.log(food.tags)
        const filterTagsListRender = []

        for (const filterTag of props.tagFilter) {
            //console.log("filterTag",filterTag)
            if (food.tags.includes(filterTag)) {
                //console.log("filterTag included",filterTag)
            } 
                else {//console.log("filterTag not-included",filterTag)
                filterTagsListRender.push(filterTag)
            } } 
            if (filterTagsListRender == "") {foodItemListRender.push(
                <FoodItem key={food.id} food={food}/>
            ) }
    }

    return   <div className={style.foodItemList}>
    {foodItemListRender}
</div>
    }