import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailMovie } from '../../Api/api';
import Loading from '../../components/Loading/loading';
import Hls from 'hls.js';
import './watch.css'

const DetailsMovie = () => {
    const { slug } = useParams();
    const [details, setDetails] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const videoRef = useRef(null);
    const [activeLink, setActiveLink] = useState('');

    const handleClick = (link) => {
        setActiveLink(link);
        const video = videoRef.current;
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(link);
            hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = link;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { details, episodes } = await getDetailMovie(slug);
                setDetails(details);
                setEpisodes(episodes);

                // If no active link, set the first episode's link as the active link
                if (episodes.length > 0 && episodes[0].server_data.length > 0) {
                    handleClick(episodes[0].server_data[0].link_m3u8);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchData();
    }, [slug]);

    return (
        <div>
            {details ? (
                <div className='details_container'>
                    <div style={{ backgroundImage: `url('${details.thumb_url}')` }} className='video'>
                        <video ref={videoRef} width="100%" height="auto" controls>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className='episodes'>
                        <div className='title'>
                            <h5>Danh sách phim</h5>
                        </div>
                        {episodes.length > 0 ? episodes.map((server, index) => (
                            <div key={index} className='info_item'>
                                {server.server_data.map((item, idx) => (
                                    <div key={idx} className='button_container'>
                                        <button
                                            onClick={() => handleClick(item.link_m3u8)}
                                            style={activeLink === item.link_m3u8 ? { background: "#359000" } : {}}
                                        >
                                            {item.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )) : <p>No episodes available.</p>}
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
