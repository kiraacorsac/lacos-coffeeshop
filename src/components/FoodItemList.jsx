import FoodItem from "./FoodItem"
import style from "./FoodItemList.module.css"


export default function FoodItemList(props) {

    const foodItemListRender = []
    const foodTagsListRender = []
    const filterTagsListRender = []
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
    // for ( let i=0 ; i< props.tagFilter.length ; ++i)
    // {
    //     for(var j=0 ; j<food.tags.length ; ++j) {
    //         if(props.tagFilter[i] == food.tags[j]){
    //             filterTagsListRender.push(filterTagsListRender[i])
    //         } else if(props.tagFilter[i] != food.tags[j]){
    //             return
    //         }
    //     }
    // }
    
    // {foodItemListRender.push(
    //     <FoodItem key={food.id} food={food}/>
    // )}}

    for (const foodTag of food.tags) {    
    for (const filterTag of props.tagFilter) 
        if (foodTag != filterTag) {return;} else {
            filterTagsListRender.push(filterTag)
        }  }
       {foodItemListRender.push(
            <FoodItem key={food.id} food={food}/>
        )
    }}


    return   <div className={style.foodItemList}>
    {foodItemListRender}
</div>
    }