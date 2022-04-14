import FoodItemList from "./components/FoodItemList";
import TagInput from "./components/TagInput";
import Tags from "./components/Tags";
import { useState } from "react";
import style from "./App.module.css";
import NewFood from "./components/NewFood";
import EditFood from "./components/EditFood";
import Modal from "./components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function App() {
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
  const [foodItemEditRender, setFoodItemEditRender] = useState(null);
  const [modalNewFlag, setModalNewFlag] = useState(false);
  const [modalEditFlag, setModalEditFlag] = useState(false);

  const [filterTagList, setFilterTagList] = useState(new Set([]));

  //TODO: create unique ID for food item
  function handleNewFoodSave(foodItem) {
    let current_time = new Date().toLocaleDateString("en-uk", {
      day: "numeric",
      year: "numeric",
      month: "short",
    });
    let newData = data.slice();
    let newFoodId = maxFoodId + 1;
    setMaxFoodId(newFoodId);
    foodItem.id = newFoodId;
    foodItem.likes = 0;
    foodItem.dislikes = 0;
    foodItem.fave = false;
    foodItem.date = current_time;

    newData.push(foodItem);
    setData(newData);
    setModalNewFlag(false);
  }

  //homework: implement this function
  //find food item in data by ID and delete it
  //insert food item in data with the same ID
  function handleEditFoodSave(foodItem) {
    console.log(foodItem);


  }


  // const [existingTagsList, setExistingTagsList] = new Set([])
  // for (const food of data) {
  //   console.log("Food existing :",food) }
  //   for (const tag of food.tags)

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
    console.log("setModalEditFlagTrue");
    setModalEditFlag(true);
  }

  const [sorting, setSorting] = useState("");
  function handleChangeSorting(event) {
    setSorting(event.target.value);
  }

  return (
    <div className={style.App}>
      <header className={style.Appheader}>Laco's Coffeeshop</header>
      <main className={style.Appmain}>
        <TagInput
          tagListState={[filterTagList, setFilterTagList]}
          addToTagList={addToTagList}
          removeFromTagList={removeFromTagList}
        />
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
                data={data}
                tagListState={filterTagList}
                addToTagList={addToTagList}
                removeFromTagList={removeFromTagList}
              />
            </div>
          </div>
          <div>
            <FoodItemList
              data={data}
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
        <NewFood
          onFoodSave={handleNewFoodSave}
        />
      </Modal>
      <Modal
        visible={modalEditFlag}
        setModalFlag={setModalEditFlag}
      >
        <EditFood
          onFoodEditSave={handleEditFoodSave}
          foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
          removeFromTagList={removeFromTagList}
        />
      </Modal>
      {/* TODO: Modal window for edititing foods */}
    </div>
  );
}

export default App;
