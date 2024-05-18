import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSearch } from '../../Api/api';
import './search.css';
import Loading from '../../components/Loading/loading';

const Search = () => {
    // Trích xuất tham số từ URL
    const { keyword } = useParams();
    console.log("Keyword", keyword);
    const [timkiem, setTimKiem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { timkiem } = await getSearch(keyword);
                setTimKiem(timkiem);
                console.log("Kết quả tìm kiếm:", timkiem);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchData();
    }, [keyword]);

    return (
        <div>
            {timkiem ? (
                <div className="search_component">
                    <div className='category'>phim mới cập nhật</div>
                    <div className='search_row'>
                        {timkiem !== null && timkiem.length > 0 ? (
                            timkiem.map(movie => (
                                <div key={movie.id} className="movie">
                                    <img src={`https://img.phimapi.com/${movie.poster_url}`} alt={movie.title} />
                                    <div className='year'>
                                        <p>{movie.year}</p>
                                    </div>
                                    <div className='title'>
                                        <Link to={`/movie/detailsmovie/${movie.slug}`} >{movie.name}</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='category'>Không Tìm Thấy Phim</div>
                        )}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Search;
