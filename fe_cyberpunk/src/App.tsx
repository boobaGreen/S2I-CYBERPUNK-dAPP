import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAccount } from 'wagmi';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import MyOrders from './pages/MyOrders';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';

function App() {
  const { address, chain } = useAccount();

  const prevAddressRef = useRef(address);
  const prevChainRef = useRef(chain);

  useEffect(() => {
    if (prevAddressRef.current !== address || prevChainRef.current !== chain) {
      prevAddressRef.current = address;
      prevChainRef.current = chain;
      window.location.reload();
    }
  }, [address, chain]);

  return (
    <Router>
      <div className='relative min-h-screen w-full bg-contain bg-center bg-repeat text-secondary-dark dark:text-secondary-light font-orbitron shadow-sm'>
        <div className='absolute inset-0 bg-tertiary-light dark:bg-tertiary-dark opacity-90'></div>
        <div className='relative z-10'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='products' element={<Products />} />
            <Route path='my-orders' element={<MyOrders />} />
            <Route path='about-us' element={<AboutUs />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
