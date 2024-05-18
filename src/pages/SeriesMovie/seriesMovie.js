/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { getAllMovie } from '../../Api/api';
// import { Link } from 'react-router-dom';
import './style.css';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/loading'

const SeriesMovie = () => {
    const [allMovies, setAllMovies] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    const handleClick = async (pageNumber) => {
        try {
            const { movies, pagination } = await getAllMovie(pageNumber);
            setAllMovies(movies);
            setPagination(pagination);
            console.log("Movies:", movies);
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
            {allMovies ? (
                <div >
                    <div className="movie_list">
                        {allMovies && allMovies.map(movie => (
                            <div key={movie.id} className="movie">
                                <img src={`https://img.ophim.live/uploads/movies/${movie.thumb_url}`} alt={movie.title} />
                                <Link to={`/movie/detailsmovie/${movie.slug}`} ><p>{movie.name}</p></Link>
                                <p>{movie.year}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button hidden={pagination.currentPage <= 1} onClick={() => handleClick(pagination.currentPage - 1)}>Prev</button>
                        <button hidden={pagination.currentPage <= 2} onClick={() => handleClick(pagination.currentPage - 2)}>{pagination.currentPage - 2}</button>
                        <button hidden={pagination.currentPage <= 1} onClick={() => handleClick(pagination.currentPage - 1)}>{pagination.currentPage - 1}</button>
                        <button style={{ backgroundColor: 'red' }}>{pagination.currentPage}</button>
                        <button hidden={pagination.currentPage >= pagination.totalPages} onClick={() => handleClick(pagination.currentPage + 1)}>{pagination.currentPage + 1}</button>
                        <button hidden={pagination.currentPage >= pagination.totalPages} onClick={() => handleClick(pagination.currentPage + 2)}>{pagination.currentPage + 2}</button>
                        <button onClick={() => handleClick(pagination.currentPage + 1)}>Next</button>
                    </div>
                </div>
            ) : (
                <Loading></Loading>
            )}

        </div>
    );
};

export default SeriesMovie;
