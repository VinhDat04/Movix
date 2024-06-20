import React, { useEffect, useState } from 'react';
import { getCountry, getGenres } from '../../Api/api';
import { useNavigate } from 'react-router-dom';
import './filterform.css';
import ModalFilter from "../ModalFilterForm/modalfilter"

const Filterform = () => {
    const [genres, setGenres] = useState([]);
    const [country, setCountry] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genresData = await getGenres();
                const countryData = await getCountry();

                setGenres(genresData.genres);
                setCountry(countryData.country);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
        fetchData();

        // Retrieve filters from localStorage and set state
        const storedGenre = localStorage.getItem("genresFilter");
        const storedCountry = localStorage.getItem("countryFilter");
        const storedYear = localStorage.getItem("yearFilter");
        const storedType = localStorage.getItem("typeFilter");

        if (storedGenre) setSelectedGenre(storedGenre);
        if (storedCountry) setSelectedCountry(storedCountry);
        if (storedYear) setYear(storedYear);
        if (storedType) setType(storedType);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('genresFilter', selectedGenre);
        localStorage.setItem('countryFilter', selectedCountry);
        localStorage.setItem('yearFilter', year);
        localStorage.setItem('typeFilter', type);
        window.scrollTo({ top: 0 });

        navigate("/movie/filter");
    };

    const years = [];
    for (let i = 1990; i <= 2026; i++) {
        years.push(i);
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <div className='filter_form_container'>
        <button onClick={handleShowModal}>Hsjnvjkdn</button>
            <ModalFilter show={showModal} handleClose={handleCloseModal}>
                <form className='filter_form' onSubmit={handleSubmit}>
                    <div className='type_film'>
                        <label value={type}
                            onChange={(e) => setType(e.target.value)}>
                            <input type='radio' name='type' value={""} />Loại
                            <input type='radio' name='type' value={"series"} />Phim Bộ
                            <input type='radio' name='type' value={"single"} />Phim Lẻ
                            <input type='radio' name='type' value={"hoathinh"} />Phim Hoạt Hình
                            <input type='radio' name='type' value={"tvshows"} />Tv Show
                        </label>
                    </div>
                    <div className='category'>
                        {genres.map((item) => (
                            <label value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}>
                                <input type='checkbox' name='category' value={item.slug} /> {item.name}
                            </label>
                        ))}
                    </div>
                    <div className='country'>
                        {country.map((item) => (
                            <label value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}>
                                <input type='radio' name='country' value={item.slug} /> {item.name}
                            </label>
                        ))}
                    </div>
                    <div className='year'>
                        {years.map((item) => (
                            <label value={year}
                                onChange={(e) => setYear(e.target.value)}>
                                <input type='radio' name='year' value={item} /> {item}
                            </label>
                        ))}
                    </div>
                    <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>

            </ModalFilter>

            {/* <form className='filter_form' onSubmit={handleSubmit}>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Loại Phim</option>
                    <option value="series">Phim Bộ</option>
                    <option value="single">Phim Lẻ</option>
                    <option value="hoathinh">Phim Hoạt Hình</option>
                    <option value="tvshows">Tv Show</option>
                </select>

                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">Thể Loại</option>
                    {genres.map((item) => (
                        <option key={item.slug} value={item.slug}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="">Quốc Gia</option>
                    {country.map((item) => (
                        <option key={item.slug} value={item.slug}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    <option value="">Năm</option>
                    {years.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
            </form> */}
        </div>
    );
};

export default Filterform;
