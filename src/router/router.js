import React from 'react';
import Home from '../pages/Home/home';
import SeriesMovie from '../pages/SeriesMovie/seriesMovie';
import DetailsMovie from '../pages/Details/details';
import WatchMovie from '../pages/Watch/watch';
import Search from "../pages/Search/search"
import { Route, Routes } from 'react-router-dom';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/series-movies" element={<SeriesMovie />} />
                <Route path="/movie/detailsmovie/:slug" element={<DetailsMovie />} />
                <Route path="/movie/detailsmovie/watch/:slug" element={<WatchMovie />} />
                <Route path="/movie/search/keyword/:keyword" element={<Search />} />

            </Routes>
        </div>
    );
};

export default Router;
