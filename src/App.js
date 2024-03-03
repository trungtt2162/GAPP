import logo from './logo.svg';
import './App.css';
import Navbar from './components/Page/Navbar';
import Home from './components/Page/Home';

const App = () => {
  return (
    <div className="App">
      <div className='header-container'>
        <Navbar />
      </div>
      <div className='app-content'>
        {/* <Outlet /> */}
        <Home />
      </div>
    </div>
  );
}

export default App;
