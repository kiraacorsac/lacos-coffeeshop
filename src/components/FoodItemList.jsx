import FoodItem from "./FoodItem";
import style from "./FoodItemList.module.css";

export default function FoodItemList(props) {
  const foodItemListRender = [];
  const [foodItemEditRender, setFoodItemEditRender] = props.foodItemEditRenderState
  const tagListRender = props.tagListRenderState;
  console.log("FoodItemListProps", props)

  if (props.sorting === "A-Z") {
    props.data.sort(function (a, b) {
      return a.name.localeCompare(b.name); //using String.prototype.localCompare()
    });
  } else if (props.sorting === "Z-A") {
    props.data.sort(function (a, b) {
      return b.name.localeCompare(a.name); //using String.prototype.localCompare()
    });
  } else if (props.sorting === "Popularity-ascending") {
    props.data.sort(function (a, b) {
      return b.likes - a.likes;
    });
  } else if (props.sorting === "Popularity-descending") {
    props.data.sort(function (a, b) {
      return a.likes - b.likes;
    });
  } else if (props.sorting === "Oldest")
    props.data.sort(function (a, b) {
      return a.id - b.id;
    });
  else if (props.sorting === "Newest")
    props.data.sort(function (a, b) {
      return b.id - a.id;
    });

  for (const food of props.data) {
    const filterTagsListRender = [];
    for (const filterTag of props.tagFilter) {
      console.log("tagFilter", props.tagFilter)
      console.log("filterTag", filterTag)
      console.log("food tags", food.tags)
      console.log("filterTagsListRender 1", filterTagsListRender)


      for (const tag of food.tags) {
        console.log("tag", tag)
        if (tag.tag === filterTag.tag) {
          filterTagsListRender.push(filterTag);
          console.log("Push filterTag", filterTag);
        } else {
          console.log("Did not find the tag in the food", tag, food)

        }
      }
    }

    console.log("filterTagsListRender length", filterTagsListRender.length)
    if (filterTagsListRender.length > 0) {
      foodItemListRender.push(<FoodItem
        key={food.id}
        food={food}
        setModalEditFlagTrue={props.setModalEditFlagTrue}
        onFoodEditSave={props.onFoodEditSave}
        foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]} />);
      console.log("filterTagsListRender 2", filterTagsListRender);
    }
  }
  if (foodItemListRender.length === 0) {
    for (let food of props.data) {
      console.log("Props", props.data)
      console.log("foodID", food.id, food.name)
      foodItemListRender.push(<FoodItem
        key={food.id}
        food={food}
        setModalEditFlagTrue={props.setModalEditFlagTrue}
        onFoodEditSave={props.onFoodEditSave}
        foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]} />);
      console.log("foodItemListRender = 0", foodItemListRender);
    }

  }
  console.log("foodItemListRender", foodItemListRender);
  return <div className={style.foodItemList}>{foodItemListRender}</div>;
}
