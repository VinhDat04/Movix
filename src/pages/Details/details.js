import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailMovie } from '../../Api/api';
import Loading from '../../components/Loading/loading';
import './details.css';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/modal';

const DetailsMovie = () => {
    const { slug } = useParams();
    const [details, setDetails] = useState(null);
    const [category, setCategory] = useState(null);
    const [country, setCountry] = useState();
    const [episodes, setEpisodes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showIframe, setShowIframe] = useState(false); // Thêm state mới để điều khiển iframe

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { details, category, country, episodes } = await getDetailMovie(slug);
                setDetails(details);
                setCategory(category);
                setCountry(country);
                setEpisodes(episodes);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchData();
    }, [slug]);

    const getEmbedUrl = (url) => {
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        return ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
    };

    const handleShowModal = () => {
        setShowModal(true);
        setShowIframe(true); // Hiển thị iframe khi mở Modal
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowIframe(false); // Ẩn iframe khi đóng Modal
    };

    return (
        <div>
            {details ? (
                <div className='details_container'>
                    <div className='content' style={{ backgroundImage: `url('${details.thumb_url}')` }}>
                        <div className='content_item'>
                            <img src={`${details.poster_url}`} alt={details.name} />
                        </div>
                        <div className='content_item1'>
                            <h5>{details.name}</h5>
                            <p>{details.origin_name}</p>
                            <div>
                                {category && category.map(item => (
                                    <span key={item.id}>{item.name}</span>
                                ))}
                            </div>
                            <div className='watch'>
                                <div className='quality'>
                                    <h3>{details.quality}</h3>
                                </div>
                                {details.trailer_url === "" ? (
                                    ""
                                ) : (
                                    <div className='trailer' onClick={handleShowModal}>
                                    <button>Trailer <i class="fa-brands fa-youtube fa-beat-fade"></i></button>
                                    </div>
                                )}
                                {episodes.length > 0 ? (
                                    <div className='watch_now'>
                                        <Link to={`/movie/detailsmovie/watch/${details.slug}`}>
                                            <button>Xem Phim <i className="fa-solid fa-play fa-shake"></i></button>
                                        </Link>
                                    </div>
                                ) : (
                                    <p>No episodes available.</p>
                                )}
                            </div>
                            <div className='overview'>
                                <h5>Overview</h5>
                                <p>{details.content}</p>
                            </div>
                            <div className='info'>
                                {details.status && (
                                    <div className='info_item'>
                                        <h5>Status:</h5><p>{details.status}</p>
                                        <h5>Release date:</h5><p>{details.created.time}</p>
                                        <h5>Runtime:</h5><p>{details.time}</p>
                                    </div>
                                )}
                                {details.director && (
                                    <div className='info_item'>
                                        <h5>Director:</h5><p>{details.director}</p>
                                    </div>
                                )}
                                {details.country && (
                                    <div className='info_item'>
                                        <h5>Country:</h5>
                                        {country && country.map(item => (
                                            <p key={item.id}>{item.name}</p>
                                        ))}
                                    </div>
                                )}
                                {details.actor && (
                                    <div className='info_item'>
                                        <h5>Actor:</h5><p>{details.actor + ""}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Modal show={showModal} handleClose={handleCloseModal}>
                            {showIframe && details.trailer_url && ( // Kiểm tra showIframe trước khi hiển thị iframe
                                <iframe
                                    title="YouTube Video"
                                    width="900"
                                    height="500"
                                    src={`https://www.youtube.com/embed/${getEmbedUrl(details.trailer_url)}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </Modal>
                    </div>
                </div>
            ) : (
                <div className='loading'>
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default DetailsMovie;
