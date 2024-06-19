
import axios from 'axios';

const BASE_URL = 'https://phimapi.com';

const movieApi = axios.create({
    baseURL: BASE_URL,
});

export const getAllMovie = async (pageNumber) => {
    try {
        const response = await movieApi.get('/danh-sach/phim-moi-cap-nhat', {
            params: {
                page: pageNumber,
            }
        });
        return {
            movies: response.data.items,
            pagination: response.data.pagination,
        };
    } catch (error) {
        throw error;
    }
};

export const getPhimCapNhat = async (pageNumber) => {
    try {
        const response = await movieApi.get('/danh-sach/phim-moi-cap-nhat', {
            params: {
                page: pageNumber,
            }
        });
        return {
            phimCapNhat: response.data.items,
            pagination: response.data.pagination
        };
    } catch (error) {
        throw error;
    }
};

export const getDetailMovie = async (slug) => {
    try {
        const response = await movieApi.get(`/phim/${slug}`, {

        });
        return {
            details: response.data.movie,
            // servername: response.data.episodes.server_name.server_name,
            // serverdata: response.data.episodes.server_data,
            category: response.data.movie.category,
            country: response.data.movie.country,
            episodes: response.data.episodes,
        };
    } catch (error) {
        throw error;
    }
};


export const getPhimLe = async (pageNumber) => {
    try {
        const response = await movieApi.get('/v1/api/danh-sach/phim-le', {
            params: {
                page: pageNumber
            }
        });
        return {
            phimLe: response.data.data.items,
            titlePL: response.data.data,
            pagination: response.data.data.params.pagination
        }
    } catch (error) {
        throw error;
    }
};

export const getPhimBo = async (pageNumber) => {
    try {
        const response = await movieApi.get('/v1/api/danh-sach/phim-bo', {
            params: {
                page: pageNumber
            }
        });
        return {
            phimBo: response.data.data.items,
            titlePB: response.data.data,
            pagination: response.data.data.params.pagination
        }
    } catch (error) {
        throw error;
    }
};

export const getTvShow = async (pageNumber) => {
    try {
        const response = await movieApi.get('/v1/api/danh-sach/tv-shows', {
            params: {
                page: pageNumber
            }
        });
        return {
            tvShow: response.data.data.items,
            titleTv: response.data.data,
            pagination: response.data.data.params.pagination
        }
    } catch (error) {
        throw error;
    }
};

export const getHoatHinh = async (pageNumber) => {
    try {
        const response = await movieApi.get('/v1/api/danh-sach/hoat-hinh', {
            params: {
                page: pageNumber
            }
        });
        return {
            hoatHinh: response.data.data.items,
            titleHH: response.data.data,
            pagination: response.data.data.params.pagination
        }
    } catch (error) {
        throw error;
    }
};

export const getSearch = async (keyword) => {
    try {
        // Chuyển đổi keyword thành chuỗi
        const response = await movieApi.get('/v1/api/tim-kiem', {
            params: {
                keyword: keyword,
                limit: 30
            }
        });
        return {
            timkiem: response.data.data.items,
            titlePage: response.data.data.titlePage
        };
    } catch (error) {
        throw error;
    }
};

export const getSimilarMovie = async () => {
    try {
        const response = await movieApi.get('/v1/api/tim-kiem', {
            params: {
                keyword: "a",
                limit: 500
            }
        });
        return {
            similar: response.data.data.items,
        };
    } catch (error) {
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await movieApi.get('/the-loai', {
            params: {
                keyword: "a",
                limit: 500
            }
        });
        return {
            genres: response.data,
        };
    } catch (error) {
        throw error;
    }
};

export const getGenresMovie = async () => {
    try {
        const response = await movieApi.get('/v1/api/tim-kiem', {
            params: {
                keyword: "a",
                limit: 700
            }
        });
        return {
            genresMovie: response.data.data.items,
        };
    } catch (error) {
        throw error;
    }
};