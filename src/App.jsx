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
  const { data: rawFoods, refetch: refetchFoods } = useGet({
    path: "/foods/",
  });

  const { mutate: postFood } = useMutate({
    verb: "POST",
    path: "/foods/",
  });

  const { mutate: putFood } = useMutate({
    verb: "PUT",
    path: makePutPath,
  });

  function makePutPath(foodID) {
    return `/foods/${foodID}/`;
  }

  const { mutate: delFood } = useMutate({
    verb: "DELETE",
    path: "/foods",
  });

  const { data: rawtags, refetch: refetchTags } = useGet({ path: "/tags/" });
  const { mutate: postTag } = useMutate({
    verb: "POST",
    path: "/tags/",
  });

  const tags = rawtags ?? [];

  // if (rawFoods == null) {
  //   foods = []
  // } else {
  //   foods = rawFoods;
  // }
  let rawFoodsArray = rawFoods ?? [];
  let foods = [];
  for (let food of rawFoodsArray) {
    // let stringTagList = [];
    let tagObjectList = [];

    for (let tagId of food.tags) {
      // stringTagList.push(tags.find(element => element.id === tag)?.tag);
      tagObjectList.push({
        id: tagId,
        tag: tags.find((element) => element.id === tagId)?.tag,
      });
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
      tags: tagObjectList,
    });
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
    let trimmedFoodItem = { ...foodItem };
    let trimmedTagsList = [];
    trimmedFoodItem.likes = 0;
    trimmedFoodItem.dislikes = 0;
    trimmedFoodItem.fave = false;
    trimmedFoodItem.date = current_time;
    for (let tag of trimmedFoodItem.tags) {
      console.log("Tag", tag.id);
      trimmedTagsList.push(tag.id);
    }
    trimmedFoodItem.tags = trimmedTagsList;
    postFood(trimmedFoodItem).then(() => {
      refetchFoods();
      refetchTags();
    });
    setModalNewFlag(false);
  }

  function handleEditFoodSave(foodItem) {
    let trimmedFoodItem = { ...foodItem };
    let trimmedTagsList = [];
    console.log("FoodItem", trimmedFoodItem);
    for (let tag of trimmedFoodItem.tags) {
      console.log("Tag", tag.id);
      trimmedTagsList.push(tag.id);
    }
    trimmedFoodItem.tags = trimmedTagsList;
    console.log("TrimmedFoodItem", trimmedFoodItem);

    //let newData = data.filter((d) => d.id != foodItem.id);
    //newData.push(foodItem);
    //newData.sort((a, b) => a.id - b.id);
    //setData(newData);
    putFood(trimmedFoodItem, { pathParams: trimmedFoodItem.id }).then(() => {
      refetchFoods();
      refetchTags();
    });
    setModalEditFlag(false);
  }

  function handleDeleteFood(foodItem) {
    //let newData = data.filter((d) => d.id != foodItem.id);
    //newData.sort((a, b) => a.id - b.id);
    //setData(newData);
    delFood(foodItem.id).then(refetchFoods);
    setModalEditFlag(false);
  }

  /// TODO: resolve promise chain of different length
  function handleAddTag(tag) {
    return refetchTags().then(() => {
      let tagListArray = [...tags];
      // let newFoodItem = { ...foodItem };

      let tagListLowerCase = tagListArray.map((existingTag) =>
        existingTag.tag.toLowerCase()
      );
      if (!tagListLowerCase.includes(tag.toLowerCase())) {
        console.log("tag not included");
        return postTag({ tag: tag }).then((newTag) => {
          console.log(newTag);
          return newTag;

          // newFoodItem.tags.push(newTag);
          // handleEditFoodSave(newFoodItem);
        });
      } else {
        console.log("tag included");
        let existingTag = tagListArray.filter(
          (tagObject) => tagObject.tag.toLowerCase() == tag.toLowerCase()
        );
        return existingTag[0];
      }
    });
    // console.log(foodItem);
  }

  function addToTagList(tag) {
    let tagListArray = [...filterTagList];
    let tagListLowerCase = tagListArray.map((str) => str.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);
    if (tag.tag === "") {
      return;
    } else if (newTagListSet.has(tag.tag.toLowerCase())) {
      return;
    }

    let newTagList = new Set(filterTagList); // slice for sets
    newTagList.add(tag.id); // push for set
    setFilterTagList(newTagList);
  }

  function removeFromTagList(tag) {
    let newTagList = new Set(filterTagList); // slice for sets
    newTagList.delete(tag.id); // push for set
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
              onFoodEditSave={handleEditFoodSave}
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
        <NewFood
          onFoodNewSave={handleNewFoodSave}
          onAddTag={handleAddTag}
          removeFromTagList={removeFromTagList}
        />
      </Modal>
      <Modal visible={modalEditFlag} setModalFlag={setModalEditFlag}>
        <EditFood
          onFoodEditSave={handleEditFoodSave}
          onDeleteFood={handleDeleteFood}
          onAddTag={handleAddTag}
          foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
          removeFromTagList={removeFromTagList}
        />
      </Modal>
      {/* TODO: Modal window for edititing foods */}
    </div>
  );
}

export default App;
