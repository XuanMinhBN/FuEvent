import React, { useState } from 'react';
import { Banner } from './home_components/banner';
import { Categories } from './home_components/category';
import { TrendingEvents } from './home_components/trending';
import { EventCarousel } from './home_components/carousel';
import { PopularEvents } from './home_components/popular';
import InterestingDestinations from './home_components/destination';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  return (
    <div>
      <Header />
      <main>
        <Banner />
        <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <TrendingEvents />
        <EventCarousel />
        <PopularEvents selectedCategory="Career" />
        <PopularEvents selectedCategory="Festival" />
        <InterestingDestinations />
      </main>
      <Footer />
    </div>
  );
};
