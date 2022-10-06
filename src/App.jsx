import FoodItemList from "./components/FoodItemList";
import TagInput from "./components/TagInput";
import Tags from "./components/Tags";
import { useState, useEffect } from "react";
import style from "./App.module.css";
import NewFood from "./components/NewFood";
import EditFood from "./components/EditFood";
import Modal from "./components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useGet, useMutate } from "restful-react";

function App() {

  const { data: rawFoods, refetch } = useGet({
    path: "/foods/",
  });

  const { mutate: post } = useMutate({
    verb: "POST",
    path: "/foods/",
  });

  const { mutate: put } = useMutate({
    verb: "PUT",
    path: "/foods",
  });

  const { mutate: del } = useMutate({
    verb: "DELETE",
    path: "/foods",
  });

  const { data: rawtags } = useGet({ path: "/tags/", });

  const tags = rawtags ?? [];

  

  // if (rawFoods == null) {
  //   foods = []
  // } else {
  //   foods = rawFoods;
  // }
  let rawFoodsArray = rawFoods ?? [];
  let foods = [];
  for (let food of rawFoodsArray) {
    let stringTagList = [];
    for (let tag of food.tags) {
      stringTagList.push(tags.find(element => element.id === tag)?.tag);
      // food.tags.push(tags.find(element => element.id === tag)?.tag);
    }
    // //foods.push({
    // //  id: food.id,
    //   name: food.name,
    //   image: food.image,
    //   likes: food.likes,
    //   dislikes: food.dislikes,
    //   fave: food.fave,
    //   tags: stringTagList,
    //   date: food.date,
    // })
    foods.push({
      ...food,
      tags: stringTagList,
    })
  }

  const [data, setData] = useState([
    // {
    //   id: 0,
    //   name: "Pepperoni Pizza",
    //   image: "https://i.imgur.com/YBZacyX.jpeg",
    //   likes: 5,
    //   dislikes: 1,
    //   fave: true,
    //   tags: ["italian", "meat", "baked"],
    //   date: "1 Feb 2018",
    // },

  ]);

  const [maxFoodId, setMaxFoodId] = useState(5);
  const [foodItemEditRender, setFoodItemEditRender] = useState(null);
  const [modalNewFlag, setModalNewFlag] = useState(false);
  const [modalEditFlag, setModalEditFlag] = useState(false);

  const [filterTagList, setFilterTagList] = useState(new Set([]));

  //TODO: create unique ID for food item
  function handleNewFoodSave(foodItem) {
    let current_time = new Date().toISOString().substring(0, 10);
    foodItem.likes = 0;
    foodItem.dislikes = 0;
    foodItem.fave = false;
    foodItem.date = current_time;
    post(foodItem).then(refetch)
    setModalNewFlag(false);
  }

  function handleEditFoodSave(foodItem) {
    //let newData = data.filter((d) => d.id != foodItem.id);
    //newData.push(foodItem);
    //newData.sort((a, b) => a.id - b.id);
    //setData(newData);
    put(foodItem.id).then(refetch)
    setModalEditFlag(false);
  }

  function handleDeleteFood(foodItem) {
    //let newData = data.filter((d) => d.id != foodItem.id);
    //newData.sort((a, b) => a.id - b.id);
    //setData(newData);
    del(foodItem.id).then(refetch)
    setModalEditFlag(false);
  }

  function addToTagList(tag) {
    let tagListArray = [...filterTagList];
    let tagListLowerCase = tagListArray.map((str) => str.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);
    if (tag === "") {
      return;
    } else if (newTagListSet.has(tag.toLowerCase())) {
      return;
    }

    let newTagList = new Set(filterTagList); // slice for sets
    newTagList.add(tag); // push for set
    setFilterTagList(newTagList);
  }

  function removeFromTagList(tag) {
    let newTagList = new Set(filterTagList); // slice for sets
    newTagList.delete(tag); // push for set
    setFilterTagList(newTagList);
  }

  function setModalFlagTrue(flag) {
    setModalNewFlag(true);
  }

  function setModalEditFlagTrue(flag) {
    //   console.log("setModalEditFlagTrue");
    setModalEditFlag(true);
  }

  const [sorting, setSorting] = useState("");
  function handleChangeSorting(event) {
    setSorting(event.target.value);
  }


  return (
    <div className={style.App}>
      <header className={style.Appheader}>
        <FontAwesomeIcon
          className={style.icon}
          icon={faCoffee}
        ></FontAwesomeIcon>{" "}
        Laco's Coffeeshop
      </header>
      <main className={style.Appmain}>
        <div className={style.tagInputWrapper}>
          <TagInput
            tagListState={[filterTagList, setFilterTagList]}
            addToTagList={addToTagList}
            removeFromTagList={removeFromTagList}
          />
        </div>
        <div className={style.content}>
          <div className={style.sortags}>
            <form>
              <label className={style.labelsorting} htmlFor="sorting">
                Sorting:{" "}
              </label>
              <select
                className={style.sorting}
                name="sorting"
                id="option"
                onChange={handleChangeSorting}
              >
                <option> ---Choose sorting--- </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Popularity-ascending">
                  Popularity-ascending
                </option>
                <option value="Popularity-descending">
                  Popularity-descending
                </option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </form>
            <div>
              <Tags
                data={foods}
                tagListState={filterTagList}
                addToTagList={addToTagList}
                removeFromTagList={removeFromTagList}
              />
            </div>
          </div>
          <div>
            <FoodItemList
              data={foods}
              tagFilter={filterTagList}
              sorting={sorting}
              setModalEditFlagTrue={setModalEditFlagTrue}
              foodItemEditRenderState={[
                foodItemEditRender,
                setFoodItemEditRender,
              ]}
              addToTagList={addToTagList}
            />
          </div>
        </div>
        {/* <input type="button" value="Add new food" onClick={setModalFlagTrue}></input> */}
        <FontAwesomeIcon
          className={style.addNew}
          icon={faPlusCircle}
          onClick={setModalFlagTrue}
        ></FontAwesomeIcon>
      </main>
      <Modal visible={modalNewFlag} setModalFlag={setModalNewFlag}>
        <NewFood onFoodSave={handleNewFoodSave} />
      </Modal>
      <Modal visible={modalEditFlag} setModalFlag={setModalEditFlag}>
        <EditFood
          onFoodEditSave={handleEditFoodSave}
          onDeleteFood={handleDeleteFood}
          foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
          removeFromTagList={removeFromTagList}
        />
      </Modal>
      {/* TODO: Modal window for edititing foods */}
    </div>
  );
}

export default App;
