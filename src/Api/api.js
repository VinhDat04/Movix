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

export const getPhimCapNhat = async () => {
    try {
        const response = await movieApi.get('/danh-sach/phim-moi-cap-nhat', {
            params: {
                page: 1,
            }
        });
        return {
            phimCapNhat: response.data.items,
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


export const getPhimLe = async () => {
    try {
        const response = await movieApi.get('/v1/api/danh-sach/phim-le', {
        });
        return {
            phimLe: response.data.data.items,
            titlePL: response.data.data,
        }
    } catch (error) {
        throw error;
    }
};

export const getPhimBo = async () => {
    try {
        const response = await movieApi.get('/v1/api/danh-sach/phim-bo', {
        });
        return {
            phimBo: response.data.data.items,
            titlePB: response.data.data,
        }
    } catch (error) {
        throw error;
    }
};

export const getTvShow = async () => {
    try {
        const response = await movieApi.get('/v1/api/danh-sach/tv-shows', {
        });
        return {
            tvShow: response.data.data.items,
            titleTv: response.data.data,
        }
    } catch (error) {
        throw error;
    }
};

export const getHoatHinh = async () => {
    try {
        const response = await movieApi.get('/v1/api/danh-sach/hoat-hinh', {
        });
        return {
            hoatHinh: response.data.data.items,
            titleHH: response.data.data,
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
                keyword: keyword
            }
        });
        return {
            timkiem: response.data.data.items,
        };
    } catch (error) {
        throw error;
    }
};


