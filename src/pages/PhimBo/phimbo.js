/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/loading'
import { getPhimBo } from '../../Api/api';
import Filterform from '../../components/FilterForm/filterform';

const SeriesMovie = () => {
    const [phimBo, setPhimBo] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    const handleClick = async (pageNumber) => {

        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const phimBoLS = localStorage.getItem("phimBo");
            const paginationLS = localStorage.getItem('pagination');

            if (phimBoLS && paginationLS) {
                setPhimBo(JSON.parse(phimBoLS));
                setPagination(JSON.parse(paginationLS));
            }
            const { phimBo, pagination } = await getPhimBo(pageNumber);
            setPhimBo(phimBo);
            setPagination(pagination);

            localStorage.setItem('phimBo', JSON.stringify(phimBo));
            localStorage.setItem('pagination', JSON.stringify(pagination));


            console.log("PhimBo:", phimBo);
            console.log("Pagination:", pagination);

        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        handleClick(1);
    }, []);

    return (
        <div>
            {phimBo ? (
                <div className='film_component'>
                    <Filterform />
                    <div className='category' style={{ color: "#f89e00"}}>#Phim Bộ</div>
                    <div className="list">
                        {phimBo && phimBo.map(movie => (
                            <div key={movie.id} className="movie">
                                <Link to={`/movie/detailsmovie/${movie.slug}`}>
                                    <div className="image-container">
                                        <img
                                            src={`https://img.phimapi.com/${movie.poster_url}`}
                                            alt={movie.title}
                                            placeholderSrc='https://movix-taupe.vercel.app/assets/movix-logo-d720c325.svg'
                                        />
                                        <div className="image-overlay">
                                            <p>{movie.name}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className='year'>
                                    <p>{movie.year}</p>
                                </div>
                                <div className='title'>
                                    <Link to={`/movie/detailsmovie/${movie.slug}`}>{movie.name}</Link>
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
