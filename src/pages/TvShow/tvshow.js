/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/loading'
import { getTvShow } from '../../Api/api';
import Filterform from '../../components/FilterForm/filterform';

const SeriesMovie = () => {
    const [tvShow, setTvShow] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    const handleClick = async (pageNumber) => {
        try {
            window.scrollTo({ top: 0 , behavior: 'smooth' });
            const tvShowLS = localStorage.getItem('tvShow');
            const paginationLS = localStorage.getItem('pagination');

            if (tvShowLS && paginationLS) {
                setTvShow(JSON.parse(tvShowLS));
                setPagination(JSON.parse(paginationLS));
            }
            const { tvShow, pagination } = await getTvShow(pageNumber);
            setTvShow(tvShow);
            setPagination(pagination);
            console.log("TVShow:", tvShow);
            console.log("Pagination:", pagination);

            localStorage.setItem("tvShow",JSON.stringify(tvShow));
            localStorage.setItem('pagination', JSON.stringify(pagination));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        handleClick(1);
    }, []);

    return (
        <div>
            {tvShow ? (
                <>
                    <div className='film_component'>
                    <Filterform />
                        <div className='category'>Tv Show</div>
                        <div className="list">
                            {tvShow && tvShow.map(movie => (
                                <div key={movie.id} className="movie">
                                    <Link to={`/movie/detailsmovie/${movie.slug}`} ><img src={`https://img.phimapi.com/${movie.poster_url}`} alt={movie.title} /></Link>
                                    <div className='year'>
                                        <p>{movie.year}</p>
                                    </div>
                                    <div className='title'>
                                        <Link to={`/movie/detailsmovie/${movie.slug}`} >{movie.name}</Link>
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className='pagination'>
                            <div className='page'>
                                <button hidden={pagination.currentPage <= 1} onClick={() => handleClick(pagination.currentPage - 1)}><i class="fa-sharp fa-solid fa-arrow-left"></i></button>
                                <button hidden={pagination.currentPage <= 2} onClick={() => handleClick(pagination.currentPage - 2)}>{pagination.currentPage - 2}</button>
                                <button hidden={pagination.currentPage <= 1} onClick={() => handleClick(pagination.currentPage - 1)}>{pagination.currentPage - 1}</button>
                                <button style={{ backgroundColor: 'rgb(139 92 246 )', color: "#fff" }}>{pagination.currentPage}</button>
                                <button hidden={pagination.currentPage >= pagination.totalPages} onClick={() => handleClick(pagination.currentPage + 1)}>{pagination.currentPage + 1}</button>
                                <button hidden={pagination.currentPage >= pagination.totalPages || pagination.currentPage + 1 >= pagination.totalPages} onClick={() => handleClick(pagination.currentPage + 2)}>{pagination.currentPage + 2}</button>
                                <button hidden={pagination.currentPage === pagination.totalPages} onClick={() => handleClick(pagination.currentPage + 1)}><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
                            </div>
                            <div className='result'>
                                <p>Trang {pagination.currentPage}/{pagination.totalPages} | Tổng {pagination.totalItems} Kết quả</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Loading></Loading>
            )}

        </div>
    );
};

export default SeriesMovie;
