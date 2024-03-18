import { Outlet } from 'react-router-dom';
import Navbar from './../components/layout/Navbar';
import Home from '../page/home/Home';

const PraviteLayout = () => {
  return (
    <div className="App">
      <div className='header-container'>
        <Navbar />
      </div>
      <div className='app-content'>
        <Outlet />
        {/* <Home /> */}
      </div>
    </div>
  );
}

export default PraviteLayout;
