import React from 'react';
import NavBar from '../../containers/NavBar';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import BestLayers from './BestLayers';
import Join from './Join';
import Footer from './Footer';

const HomePage = () => (
  <div className="Homepage">
    <NavBar />
    <Banner />
    <HowItWorks />
    <BestLayers />
    <Join />
    <Footer />
  </div>
);

export default HomePage;
