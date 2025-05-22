import axios from "axios";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "../services/storage/token";
import api_config from "../configs/api_configs";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        error ? prom.reject(error) : prom.resolve(token);
    });
    failedQueue = [];
};

const api_client = axios.create({
    baseURL: api_config.base_url,
});

api_client.interceptors.request.use(

    async (config: any): Promise<any> => {
        // Assuming getAccessToken() returns a Promise<string | null | undefined>
        const token = await getAccessToken();
        if (token) {
            config.headers = {
                ...config.headers, // Preserve existing headers
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        // Optional: Handle request errors here
        return Promise.reject(error);
    }

);

api_client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api_client(originalRequest);
                    })
                    .catch(Promise.reject);
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = await getRefreshToken();
                const res = await axios.post<{ access_token: string; refresh_token: string }>(
                    `${api_config.base_url}/auth/refresh/access-token`,
                    { refresh_token: refreshToken }
                );

                const { access_token, refresh_token } = res.data;

                await setTokens(access_token, refresh_token);

                api_client.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

                processQueue(null, access_token);
                return api_client(originalRequest);

            } catch (err) {
                processQueue(err, null);
                
                // log out user
                await clearTokens();
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api_client;
