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
  const { data: rawFoods, refetch: refetchFood } = useGet({
    path: "/foods/",
  });
  const { data: rawTags, refetch: refetchTags } = useGet({
    path: "/tags/",
  });

  const { mutate: del } = useMutate({
    verb: "DELETE",
    path: "/foods",
  });

  const { mutate: post } = useMutate({
    verb: "POST",
    path: "/foods/",
  });

  const { mutate: postTags } = useMutate({
    verb: "POST",
    path: "/tags/",
  });

  const { mutate: put } = useMutate({
    verb: "PUT",
    path: (id) => `/foods/${id}/`,
  });

  let foodsRaw = rawFoods ?? [];
  let tags = rawTags ?? [];

  let foods = [];
  foodsRaw.forEach((data) => {
    let tagsList = [];
    data.tags.forEach((datatags) => {
      tags.map((e) => {
        if (e.id === datatags) {
          tagsList.push(e.tag);
        }
      });
    });
    foods.push({
      id: data.id,
      name: data.name,
      image: data.image,
      likes: data.likes,
      dislikes: data.dislikes,
      fave: data.fave,
      tags: tagsList,
      date: data.date,
    });
  });

  const [data, setData] = useState([
    {
      id: 0,
      name: "Pepperoni Pizza",
      image: "https://i.imgur.com/YBZacyX.jpeg",
      likes: 5,
      dislikes: 1,
      fave: true,
      tags: ["italian", "meat", "baked"],
      date: "1 Feb 2018",
    },
    {
      id: 1,
      name: "Meatball Spaghetti",
      image:
        "https://th.bing.com/th/id/R.b9461de6a6d92e22a0093e54f44aa766?rik=KyLC75MJQaLtHA&riu=http%3a%2f%2fwww.realfoodfinds.com%2fwp-content%2fuploads%2f2014%2f09%2fSpaghetti-Meatballs-10.jpg&ehk=XoDGoZkndS3itt6AQmeCu6oMkZK%2fEk0tnxrNjsJsjp4%3d&risl=&pid=ImgRaw&r=0", //"https://i.imgur.com/1JR95n3.jpeg",
      likes: 9,
      dislikes: 3,
      fave: false,
      tags: ["italian", "meat", "pasta"],
      date: "1 Mar 2018",
    },
    {
      id: 2,
      name: "Cake",
      image: "https://i.imgur.com/BgAvBzn.jpeg",
      likes: 15,
      dislikes: 3,
      fave: false,
      tags: ["dessert", "sweet", "baked"],
      date: "15 Jul 2018",
    },
    {
      id: 3,
      name: "Svieckova",
      image: "https://denzeny.sk/wp-content/uploads/2015/08/svieckova.jpg",
      likes: 15,
      dislikes: 3,
      fave: false,
      tags: ["Czech", "meat", "baked"],
      date: "19 Sep 2020",
    },
    {
      id: 4,
      name: "Halusky s bryndzou",
      image:
        "https://th.bing.com/th/id/R.435c27a76b2d63c16da76e69bd93d876?rik=g3%2fjUrnXO8si3A&riu=http%3a%2f%2fwww.varenie.sk%2fcommon%2fir2%2frecepty%2f4250%2fzdet--c300xc225.jpg&ehk=EbeX9Yti0owJqRyC31cxqdJ6xo8C52u7CmY0GnG5q3w%3d&risl=&pid=ImgRaw&r=0",
      likes: 15,
      dislikes: 3,
      fave: false,
      tags: ["Slovakian", "potato", "sheep cheese", "boiled"],
      date: "15 Feb 2022",
    },
    {
      id: 5,
      name: "Turkish kebab",
      image:
        "https://www.thespruceeats.com/thmb/j1SF4NKfL3E7eEq3QB8LLftri58=/566x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/hands-744987451-5a71e9f56bf0690037b7b412.jpg",
      likes: 15,
      dislikes: 3,
      fave: false,
      tags: ["Turkey", "meat", "baked"],
      date: "2 Mar 2022",
    },
  ]);

  const [maxFoodId, setMaxFoodId] = useState(5);
  const [foodItemEditRender, setFoodItemEditRender] = useState(foods);
  const [modalNewFlag, setModalNewFlag] = useState(false);
  const [modalEditFlag, setModalEditFlag] = useState(false);

  const [filterTagList, setFilterTagList] = useState(new Set([]));

  //TODO: create unique ID for food item
  function handleNewFoodSave(foodItem) {
    let current_time = new Date().toLocaleDateString("en-ca", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    // let newData = data.slice();
    // let newFoodId = maxFoodId + 1;
    // setMaxFoodId(newFoodId);
    // foodItem.id = newFoodId;
    foodItem.likes = 0;
    foodItem.dislikes = 0;
    foodItem.fave = false;
    foodItem.date = current_time;
    // newData.push(foodItem);
    console.log("new foodItem", foodItem);
    post(foodItem).then(refetchFood);
    // setData(newData);
    setModalNewFlag(false);
  }

  function handleEditFoodSave(foodItem) {
    // handleNewTagSave(foodItem.tags);
    // let newData = data.filter((d) => d.id != foodItem.id);
    // newData.push(foodItem);
    // newData.sort((a, b) => a.id - b.id);
    put(foodItem, { pathParams: foodItem.id }).then(refetchFood);
    // setData(newData);
    setModalEditFlag(false);
  }

  function handleDeleteFood(foodItem) {
    // let newData = data.filter((d) => d.id != foodItem.id);
    // newData.sort((a, b) => a.id - b.id);
    // setData(newData);
    del(foodItem.id).then(refetchFood);
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
        <NewFood onFoodSave={handleNewFoodSave} />
      </Modal>
      <Modal visible={modalEditFlag} setModalFlag={setModalEditFlag}>
        <EditFood
          onFoodEditSave={handleEditFoodSave}
          onDeleteFood={handleDeleteFood}
          foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
          removeFromTagList={removeFromTagList}
          tags={[rawTags, refetchTags]}
        />
      </Modal>
      {/* TODO: Modal window for edititing foods */}
    </div>
  );
}
export default App;
