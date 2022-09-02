import './App.css';
import Search from './components/Search/search';

function App() {
  const handleOnSearch = ({seachData}) =>{
    console.log(seachData)
  }
  return (
    <div className="App">
      <Search onSearchChange={handleOnSearch}
      />
    </div>
  );
}

export default App;
