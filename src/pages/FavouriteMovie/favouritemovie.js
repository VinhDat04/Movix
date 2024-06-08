// listfavourite.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFilterMovie, getPhimCapNhat } from '../../Api/api';  // Sửa đường dẫn tới tệp API của bạn nếu cần thiết
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPaginate from 'react-paginate';
import Filterform from '../../components/FilterForm/filterform';

const ListFavourite = () => {
    const [favourite, setFavourite] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);
    const [phimCapNhat, setPhimCapNhat] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { filterMovie } = await getFilterMovie();
                setPhimCapNhat(filterMovie);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchData();

        const storedFavourites = localStorage.getItem('favourite');
        if (storedFavourites) {
            setFavourite(JSON.parse(storedFavourites));
        }
    }, []);

    const handlePageClick = (data) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(data.selected);
    };

    const handleRemoveFavourite = (slug) => {
        const updatedFavourites = favourite.filter(item => item !== slug);
        setFavourite(updatedFavourites);
        localStorage.setItem('favourite', JSON.stringify(updatedFavourites));
    };

    const filteredMovies = phimCapNhat?.filter(movie => favourite.includes(movie.slug)) || [];
    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredMovies.slice(offset, offset + itemsPerPage);

    return (
        <div>
            {filteredMovies.length > 0 ? (
                <div className="film_component">
                    <Filterform />
                    <div className='category' style={{ color: "#f89e00" }}>
                        #Phim Yêu Thích | <span style={{ color: "rgb(139 92 246)" }}>{filteredMovies.length} Kết quả </span>
                    </div>
                    <div className='list'>
                        {currentPageData.map(movie => (
                            <div key={movie.id} className="movie">
                                <Link to={`/movie/detailsmovie/${movie.slug}`}>
                                    <div className="image-container">
                                        <LazyLoadImage
                                            src={`https://img.phimapi.com/${movie.poster_url}`}
                                            alt={movie.title}
                                            placeholderSrc='https://movix-taupe.vercel.app/assets/movix-logo-d720c325.svg'
                                        />
                                        <div className="image-overlay">
                                            <p>{movie.name}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className='favourite'>
                                    <div className='year'>
                                        <p>{movie.year}</p>
                                    </div>
                                    <button onClick={() => handleRemoveFavourite(movie.slug)} className="remove-button">
                                        <i style={{ color: "#f89e00" }} class="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                                <div className='title'>
                                    <Link to={`/movie/detailsmovie/${movie.slug}`}>{movie.name}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='pagination'>
                        <ReactPaginate
                            previousLabel={<i className="fa-sharp fa-solid fa-arrow-left"></i>}
                            nextLabel={<i className="fa-sharp fa-solid fa-arrow-right"></i>}
                            pageCount={Math.ceil(filteredMovies.length / itemsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"paginate"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                        <div className='result'>
                            <p>Trang {currentPage + 1}/{Math.ceil(filteredMovies.length / itemsPerPage)} | Tổng {filteredMovies.length} Kết quả</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='not_found_film'>
                    <p>Bạn chưa có phim yêu thích!</p>
                    <button>
                        <Link to={"/Movix"}>Tìm phim ngay</Link>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ListFavourite;
