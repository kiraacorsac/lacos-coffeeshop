import "./App.css";
import FoodItemList from "./components/FoodItemList";
import TagInput from "./components/TagInput";
import Tags from "./components/Tags";
import { useState } from "react";
import style from "./App.module.css";
import NewFood from "./components/NewFood";

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
      likes: 1,
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

  let [foodId, setFoodId] = useState(5);

  //TODO: create unique ID for food item
  function handleNewFoodSave(foodItem) {
    let current_time = new Date().toLocaleDateString("en-uk", {
      day: "numeric",
      year: "numeric",
      month: "short",
    });
    let newData = data.slice();
    let newFoodId = foodId + 1;
    setFoodId(newFoodId);
    foodItem.id = newFoodId;
    foodItem.likes = 0;
    foodItem.dislikes = 0;
    foodItem.fave = false;
    foodItem.date = current_time;

    newData.push(foodItem);
    setData(newData);
  }

  const [tagList, setTagList] = useState(new Set([]));
  const uniqueTagList = [];
  // const [existingTagsList, setExistingTagsList] = new Set([])
  // for (const food of data) {
  //   console.log("Food existing :",food) }
  //   for (const tag of food.tags)

  function addToTagList(tag) {
    let tagListArray = [...tagList];
    let tagListLowerCase = tagListArray.map((str) => str.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);
    if (tag === "") {
      return;
    } else if (newTagListSet.has(tag.toLowerCase())) {
      return;
    }

    let newTagList = new Set(tagList); // slice for sets
    newTagList.add(tag); // push for set
    setTagList(newTagList);
  }

  const allTagsList = [];

  function removeFromTagList(tag) {
    console.log("removeFromTagList",tag)
    let newTagList = new Set(tagList); // slice for sets
    newTagList.delete(tag); // push for set
    setTagList(newTagList);
    uniqueTagList.tag.checked = false;
  }

  const [sorting, setSorting] = useState("");

  function handleChangeSorting(event) {
    setSorting(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">Laco's Coffeeshop</header>
      <main className="App-main">
        <NewFood onFoodSave={handleNewFoodSave} />
        <div className={style.mainbox}>
          <TagInput
            tagListState={[tagList]}
            addToTagList={addToTagList}
            removeFromTagList={removeFromTagList}
          />
          <div className={style.rightbox}>
            <form>
              <label for="sorting">Sorting: </label>
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
            <input className={style.button} type="button" value="Add Food" />
            <input className={style.button} type="button" value="Edit Food" />
          </div>
        </div>
        <div className={style.content}>
          <div>
            <Tags
              data={data}
              allTagsListState={[allTagsList]}
              tagListState={tagList}
              addToTagList={addToTagList}
              removeFromTagList={removeFromTagList}
              uniqueTagListState={uniqueTagList}
            />
          </div>
          <div>
            <FoodItemList data={data} tagFilter={tagList} sorting={sorting} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
