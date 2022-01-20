import './App.css';
import FoodItem from './components/FoodItem';
import TagSearch from './components/TagSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Laco's Coffeeshop
      </header>
      <main className="App-main">
        <TagSearch />
        <FoodItem />
      </main>
    </div>
  );
}

export default App;
