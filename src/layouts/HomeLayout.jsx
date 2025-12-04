import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import PopularGames from '../components/PopularGames';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import AllGames from '../components/AllGames';
import Reviews from '../components/Reviews';

import FeaturedGames from '../components/featuredGames';

const HomeLayout = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <div>
            <header>
                <Banner />
                <PopularGames />
                
                {/* Send data to Reviews */}
                <Reviews reviews={reviews} />
               <FeaturedGames></FeaturedGames>
            </header>

            <main>
                <Outlet />
            </main>

            <Newsletter />

            <footer>
               
            </footer>
        </div>
    );
};

export default HomeLayout;
