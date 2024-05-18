/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import './banner.css';
import { getPhimCapNhat } from '../../Api/api';
import { Link } from 'react-router-dom';

const Banner = () => {
    const [phimCapNhat, setPhimCapNhat] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    const [keyword, setKeyword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Redirect to search page with the keyword
        // window.location.href = `${keyword}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { phimCapNhat } = await getPhimCapNhat();
                setPhimCapNhat(phimCapNhat);
                console.log("phimCapNhat:", phimCapNhat);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex(prevIndex => (prevIndex + 1) % phimCapNhat.length);
        }, 60000);

        return () => clearInterval(interval);
    }, [phimCapNhat]);

    return (
        <div className="slideshow-container">
            {
                phimCapNhat ? (
                    phimCapNhat.map((item, index) => (
                        <div
                            className={`mySlides fade ${index === slideIndex ? 'active' : ''}`}
                            key={item.id || index} // Use a unique key
                        >
                            <img src={`${item.thumb_url}`} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%' }} />
                            <div className="text">
                                <h1>welcome .</h1>
                                <p>Millions of movies, TV shows and people to discover. Explore now.</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='search'>
                                    <input required value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Search for a movie or TV show....' />
                                    <Link to={`/movie/search/keyword/${keyword}`}><button type='submit'>Search</button></Link>
                                </div>
                            </form>
                        </div>
                    ))
                ) : (
                    <div className={`mySlides`}>
                        <img src={`./v5XyXZe8FADw8iHupB4L7QOAwH9.jpg`} style={{ width: '100%', height: '100%' }} />
                        <div className="text">
                            <h1>welcome .</h1>
                            <p>Millions of movies, TV shows and people to discover. Explore now.</p>
                        </div>
                        <div className='search'>
                            <input placeholder='Search for a movie or TV show....'></input>
                            <Link to={`/movie/search/search?keyword=${keyword}`}></Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Banner;




/* eslint-disable jsx-a11y/alt-text */
// import React, { useEffect, useState } from 'react';
// import './banner.css';
// import { getPhimCapNhat } from '../../Api/api';
// import { Link } from 'react-router-dom';

// const Banner = () => {
//     const [phimCapNhat, setPhimCapNhat] = useState([]);
//     const [slideIndex, setSlideIndex] = useState(0);
//     const [keyword, setKeyword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Sử dụng giá trị từ input để cập nhật state keyword
//         setKeyword(e.target.elements.searchInput.value);
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const { phimCapNhat } = await getPhimCapNhat();
//                 setPhimCapNhat(phimCapNhat);
//             } catch (error) {
//                 console.error('Error fetching movies:', error);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setSlideIndex(prevIndex => (prevIndex + 1) % phimCapNhat.length);
//         }, 60000);

//         return () => clearInterval(interval);
//     }, [phimCapNhat]);

//     return (
//         <div className="slideshow-container">
//             {phimCapNhat ? (
//                 phimCapNhat.map((item, index) => (
//                     <div
//                         className={`mySlides fade ${index === slideIndex ? 'active' : ''}`}
//                         key={item.id || index}
//                     >
//                         <img src={`${item.thumb_url}`} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%' }} />
//                         <div className="text">
//                             <h1>welcome .</h1>
//                             <p>Millions of movies, TV shows and people to discover. Explore now.</p>
//                         </div>
//                         <form onSubmit={handleSubmit}>
//                             <div className='search'>
//                                 <input value={keyword} placeholder='Search for a movie or TV show....' />
//                                 <a href={`/movie/search?keyword=${keyword}`}><button type='submit'>Search</button></a>
//                             </div>
//                         </form>
//                     </div>
//                 ))
//             ) : (
//                 <></>
//             )}
//         </div>
//     );
// };

// export default Banner;
