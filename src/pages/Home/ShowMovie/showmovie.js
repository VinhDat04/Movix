/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { getPhimLe, getPhimCapNhat, getPhimBo, getTvShow, getHoatHinh } from '../../../Api/api';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/loading';
import Slider from "react-slick";
import './showmovie.css';
import Banner from '../../../components/banner/banner'

const ShowHomePage = () => {
    const [phimCapNhat, setPhimCapNhat] = useState(null);
    const [phimLe, setPhimLe] = useState(null);
    const [titlePL, settitlePL] = useState(null);

    const [phimBo, setPhimBo] = useState(null);
    const [titlePB, settitlePB] = useState(null);

    const [tvShow, setTvShow] = useState(null);
    const [titleTv, setTitleTv] = useState(null);

    const [hoatHinh, setHoatHinh] = useState(null);
    const [titleHH, setTitleHH] = useState(null);

    var settings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 4,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { phimCapNhat } = await getPhimCapNhat();
                setPhimCapNhat(phimCapNhat);
                console.log("phimCapNhat:", phimCapNhat);

                const { phimLe, titlePL } = await getPhimLe();
                setPhimLe(phimLe);
                settitlePL(titlePL);
                console.log("PhimLe:", phimLe);

                const { phimBo, titlePB } = await getPhimBo();
                setPhimBo(phimBo);
                settitlePB(titlePB);
                console.log("PhimBo:", phimBo);

                const { tvShow, titleTv } = await getTvShow();
                setTvShow(tvShow);
                setTitleTv(titleTv);
                console.log("TvShow:", tvShow);

                const { hoatHinh, titleHH } = await getHoatHinh();
                setHoatHinh(hoatHinh);
                setTitleHH(titleHH);
                console.log("HoatHinh:", hoatHinh);

            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {phimCapNhat && phimBo && phimLe && tvShow && hoatHinh ? (
                <>
                    <Banner></Banner>
                    {phimCapNhat ? (
                        <div >
                            <div className="show_series">
                                <div className='category'>phim mới cập nhật</div>
                                <Slider {...settings}>
                                    {phimCapNhat && phimCapNhat.map(movie => (
                                        <div key={movie.id} className="movie">
                                            {/* <div style={{backgroundImage:`url('https://img.ophim.live/uploads/movies/${movie.thumb_url}')`, height:"500px"}}>
                                        <button>Hello</button>
                                    </div> */}
                                            <img src={`${movie.poster_url}`} alt={movie.title} />
                                            <div className='year'>
                                                <p>{movie.year}</p>
                                            </div>
                                            <div className='title'>
                                                <Link to={`/movie/detailsmovie/${movie.slug}`} >{movie.name}</Link>
                                            </div>
                                        </div>
                                    ))}
                                    <Link to={"/series-movies"}>
                                        <div className='view_more'>
                                            <button>View More</button>
                                        </div>
                                    </Link>
                                </Slider>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    {/* Phim Lẻ */}

                    {phimBo ? (
                        <div >
                            <div className="show_series">
                                <div className='category'>{titlePB.titlePage}</div>
                                <Slider {...settings}>
                                    {phimBo && phimBo.map(movie => (
                                        <div key={movie.id} className="movie">
                                            {/* <div style={{backgroundImage:`url('https://img.ophim.live/uploads/movies/${movie.thumb_url}')`, height:"500px"}}>
                                        <button>Hello</button>
                                    </div> */}
                                            <img src={`https://img.phimapi.com/${movie.poster_url}`} alt={movie.title} />
                                            <div className='year'>
                                                <p>{movie.year}</p>
                                            </div>
                                            <div className='title'>
                                                <Link to={`/movie/detailsmovie/${movie.slug}`} >{movie.name}</Link>
                                            </div>
                                        </div>
                                    ))}
                                    <Link to={"/series-movies"}>
                                        <div className='view_more'>
                                            <button>View More</button>
                                        </div>
                                    </Link>
                                </Slider>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    {/* Phim Lẻ */}

                    {phimLe ? (
                        <div >
                            <div className="show_series">
                                <div className='category'>{titlePL.titlePage}</div>
                                <Slider {...settings}>
                                    {phimLe && phimLe.map(movie => (
                                        <div key={movie.id} className="movie">
                                            {/* <div style={{backgroundImage:`url('https://img.ophim.live/uploads/movies/${movie.thumb_url}')`, height:"500px"}}>
                                        <button>Hello</button>
                                    </div> */}
                                            <img src={`https://img.phimapi.com/${movie.poster_url}`} alt={movie.title} />
                                            <div className='year'>
                                                <p>{movie.year}</p>
                                            </div>
                                            <div className='title'>
                                                <Link to={`/movie/detailsmovie/${movie.slug}`} >{movie.name}</Link>
                                            </div>
                                        </div>
                                    ))}
                                    <Link to={"/series-movies"}>
                                        <div className='view_more'>
                                            <button>View More</button>
                                        </div>
                                    </Link>
                                </Slider>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* TV Show */}

                    {tvShow ? (
                        <div >
                            <div className="show_series">
                                <div className='category'>{titleTv.titlePage}</div>
                                <Slider {...settings}>
                                    {tvShow && tvShow.map(movie => (
                                        <div key={movie.id} className="movie">
                                            {/* <div style={{backgroundImage:`url('https://img.ophim.live/uploads/movies/${movie.thumb_url}')`, height:"500px"}}>
                                        <button>Hello</button>
                                    </div> */}
                                            <img src={`https://img.phimapi.com/${movie.poster_url}`} alt={movie.title} />
                                            <div className='year'>
                                                <p>{movie.year}</p>
                                            </div>
                                            <div className='title'>
                                                <Link to={`/movie/detailsmovie/${movie.slug}`} >{movie.name}</Link>
                                            </div>
                                        </div>
                                    ))}
                                    <Link to={"/series-movies"}>
                                        <div className='view_more'>
                                            <button>View More</button>
                                        </div>
                                    </Link>
                                </Slider>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* Hoat Hình */}

                    {hoatHinh ? (
                        <div >
                            <div className="show_series">
                                <div className='category'>{titleHH.titlePage}</div>
                                <Slider {...settings}>
                                    {hoatHinh && hoatHinh.map(movie => (
                                        <div key={movie.id} className="movie">
                                            {/* <div style={{backgroundImage:`url('https://img.ophim.live/uploads/movies/${movie.thumb_url}')`, height:"500px"}}>
                                        <button>Hello</button>
                                    </div> */}
                                            <img src={`https://img.phimapi.com/${movie.poster_url}`} alt={movie.title} />
                                            <div className='year'>
                                                <p>{movie.year}</p>
                                            </div>
                                            <div className='title'>
                                                <Link to={`/movie/detailsmovie/${movie.slug}`} >{movie.name}</Link>
                                            </div>
                                        </div>
                                    ))}
                                    <Link to={"/series-movies"}>
                                        <div className='view_more'>
                                            <button>View More</button>
                                        </div>
                                    </Link>
                                </Slider>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <div className='loading'>
                    <Loading></Loading>
                </div>
            )},
        </div>
    );
};

export default ShowHomePage;
