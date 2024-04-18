import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './../components/layout/Navbar';
import Home from '../page/home/Home';
import Hero from '../components/Page/ui/Hero';
import { listNoHero } from '../constant/common';

const PraviteLayout = () => {
   const location  = useLocation();
   const isNotHero = listNoHero.includes(location.pathname) || listNoHero.some(i => location.pathname.includes(i))
   return (
    <div className="App">
      <div className='header-container'>
        <Navbar />
      </div>
      <div className='app-content'>
        <div className='app-hero'>
       {!isNotHero &&  <Hero />}
        </div>
       <div>
       
       <Outlet />
       </div>
        {/* <Home /> */}
      </div>
    </div>
  );
}

export default PraviteLayout;
