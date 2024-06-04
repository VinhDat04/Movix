/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import './phimle.css';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/loading'
import { getPhimLe } from '../../Api/api';
import Filterform from '../../components/FilterForm/filterform';

const SeriesMovie = () => {
    const [phimle, setPhimLe] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    const handleClick = async (pageNumber) => {
        try {
            window.scrollTo({ top: 0 , behavior: 'smooth' });
            const phimleLS = localStorage.getItem('phimle');
            const paginationLS = localStorage.getItem('pagination');
            if (phimleLS && paginationLS) {
                setPhimLe(JSON.parse(phimleLS));
                setPagination(JSON.parse(paginationLS));
            }
            const { phimLe, pagination } = await getPhimLe(pageNumber);
            setPhimLe(phimLe);
            setPagination(pagination);

            localStorage.setItem('phimle', JSON.stringify(phimLe));
            localStorage.setItem('pagination', JSON.stringify(pagination));

            console.log('PhimLe:', phimLe);
            console.log('Pagination:', pagination);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        handleClick(1);
    }, []);

    return (
        <div>
            {phimle ? (
                <div className='film_component'>
                <Filterform />
                    <div className='category'>Phim Lẻ</div>
                    <div className="list">
                        {phimle && phimle.map(movie => (
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
                            <button hidden={pagination.currentPage >= pagination.totalPages} onClick={() => handleClick(pagination.currentPage + 2)}>{pagination.currentPage + 2}</button>
                            <button onClick={() => handleClick(pagination.currentPage + 1)}><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
                        </div>
                        <div className='result'>
                            <p>Trang {pagination.currentPage}/{pagination.totalPages} | Tổng {pagination.totalItems} Kết quả</p>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading></Loading>
            )}

        </div>
    );
};

export default SeriesMovie;