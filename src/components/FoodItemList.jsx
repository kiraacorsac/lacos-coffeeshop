import FoodItem from "./FoodItem";
import style from "./FoodItemList.module.css";

export default function FoodItemList(props) {
  const foodItemListRender = [];
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;
  const tagListRender = props.tagListRenderState;

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
      if (!food.tags.find((e) => e.id == filterTag.id)) {
        filterTagsListRender.push(filterTag);
      }
    }
    if (filterTagsListRender.length === 0) {
      foodItemListRender.push(
        <FoodItem
          key={food.id}
          food={food}
          setModalEditFlagTrue={props.setModalEditFlagTrue}
          onFoodEditSave={props.onFoodEditSave}
          foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
        />
      );
    }
  }

  return <div className={style.foodItemList}>{foodItemListRender}</div>;
}
