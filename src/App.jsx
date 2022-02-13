import './App.css';
import FoodItemList from './components/FoodItemList';
import TagSearch from './components/TagSearch';
import Tags from './components/Tags';
import {useState} from 'react'
import style from "./App.module.css"

function App() {


  const data = [
    {
      id: 0,
      name: "Pepperoni Pizza",
      image: "https://i.imgur.com/YBZacyX.jpeg",
      likes: 5,
      dislikes: 1,
      fave: true,
      tags: [ "italian","meat","baked"]
    },
    {
      id: 1,
      name: "Meatball Spaghetti",
      image: "https://th.bing.com/th/id/R.b9461de6a6d92e22a0093e54f44aa766?rik=KyLC75MJQaLtHA&riu=http%3a%2f%2fwww.realfoodfinds.com%2fwp-content%2fuploads%2f2014%2f09%2fSpaghetti-Meatballs-10.jpg&ehk=XoDGoZkndS3itt6AQmeCu6oMkZK%2fEk0tnxrNjsJsjp4%3d&risl=&pid=ImgRaw&r=0",//"https://i.imgur.com/1JR95n3.jpeg",
      likes: 9,
      dislikes: 3,
      fave: false,
      tags: [ "italian", "meat","pasta"]
    },
    {
      id: 2,
      name: "Cake",
      image: "https://i.imgur.com/BgAvBzn.jpeg",
      likes: 15,
      dislikes: 3,
      fave: false,
      tags: ["dessert", "sweet", "baked"]
    },
    {
      id: 3,
      name: "Svieckova",
      image: "https://denzeny.sk/wp-content/uploads/2015/08/svieckova.jpg",
      likes: 15,
      dislikes: 3,
      fave: false,
      tags: ["Czech", "meat", "baked"]
    },
    {
      id: 4,
      name: "Halusky s bryndzou",
      image: "https://erecepty.eu/wp-content/uploads/cache/2020/05/571-bryndzov%C3%A9-halu%C5%A1ky-recept/1870343419.jpg",
      likes: 15,
      dislikes: 3,
      fave: false,
      tags: ["Slovakian", "potato", "sheep cheese", "boiled"]
    }
  ]

  const [tagList, setTagList] = useState(new Set([]));
  // const [existingTagsList, setExistingTagsList] = new Set([])
  // for (const food of data) {  
  //   console.log("Food existing :",food) }
  //   for (const tag of food.tags)

  return (
    <div className="App">
      <header className="App-header">
        Laco's Coffeeshop
      </header>
      <main className="App-main">
        <TagSearch tagListState={[tagList, setTagList]} />
        <div className={style.content}>
            <div>
          <Tags data={data}/></div>
          <div>
          <FoodItemList data={data} tagFilter={tagList} /> 
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
