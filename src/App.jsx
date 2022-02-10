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
      image: "https://natashaskitchen.com/wp-content/uploads/2015/01/spaghetti-and-meatballs.jpg",//"https://i.imgur.com/1JR95n3.jpeg",
      likes: 9,
      dislikes: 3,
      fave: false,
      tags: ["italian", "meat", "pasta"]
    },
    {
      id: 2,
      name: "Cake",
      image: "https://i.imgur.com/BgAvBzn.jpeg",
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
