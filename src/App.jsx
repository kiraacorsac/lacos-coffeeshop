import './App.css';
import FoodItemList from './components/FoodItemList';
import TagSearch from './components/TagSearch';

function App() {

  const data = [
    {
      id: 0,
      name: "Pepperoni Pizza",
      image: "https://i.imgur.com/YBZacyX.jpeg",
      likes: 5,
      dislikes: 1,
      fave: true,
      tags: ["italian", "meat", "bread"]
    },
    {
      id: 1,
      name: "Meatball Spaghetti",
      //TODO: find image
      image: "",
      likes: 9,
      dislikes: 3,
      fave: false,
      tags: ["italian", "meat", "pasta"]
    },
    {
      id: 2,
      name: "Cake",
      //TODO: find image
      image: "",
      likes: 15,
      dislikes: 3,
      fave: false,
      tags: ["dessert", "sweet"]
    },

  ]


  return (
    <div className="App">
      <header className="App-header">
        Laco's Coffeeshop
      </header>
      <main className="App-main">
        <TagSearch />
        <FoodItemList data={data} />
      </main>
    </div>
  );
}

export default App;
