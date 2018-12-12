import React from 'react';
import './Homepage.scss';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import BestLayers from './BestLayers';
import Join from './Join';
import Footer from './Footer';

const HomePage = () => (
  <div className="Homepage">
    <Banner />
    <HowItWorks />
    <BestLayers />
    <Join />
    <Footer />
  </div>
);

export default HomePage;
