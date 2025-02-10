import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import MyOrders from './pages/MyOrders';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className='relative min-h-screen w-full bg-contain bg-center bg-repeat  text-secondary-dark dark:text-secondary-light font-orbitron shadow-sm'>
        <div className='absolute inset-0 bg-tertiary-light  dark:bg-tertiary-dark opacity-90 '></div>
        <div className='relative z-10'>
          <Header />
          <div className='w-full flex justify-center items-center py-8 mb-6 lg:text-7xl md:text-5xl text-3xl'>
            <h1 className='text-secondary-dark dark:text-secondary-light'>CYBERPUNK SHOP</h1>
          </div>

          <Routes>
            <Route path='/' element={<Home />} />y
            <Route path='products' element={<Products />} />
            <Route path='my-orders' element={<MyOrders />} />
            <Route path='about-us' element={<AboutUs />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
