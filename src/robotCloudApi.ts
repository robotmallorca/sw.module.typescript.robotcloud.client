import axios from "axios"
import clientConfig from "config";
import { useLogger } from 'utils/logger';

const logger = useLogger("robotcloud-api")

const robotcloudApi = axios.create();

let checkTokenPromise: Promise<string | undefined> | null = null;
const clearPromise = () => checkTokenPromise = null;

async function refreshToken(checkToken: () => Promise<string | undefined>) {
    const access_token = await checkToken();
    return access_token;
}

  
// Important to add interceptor once, inside a middleware are stacked in each request.
robotcloudApi.interceptors.request.use(
    async config => {
        logger.info("robotcloud api interceptor:", config.url)
        if (!checkTokenPromise) {
            checkTokenPromise = refreshToken(clientConfig.checkToken).finally(clearPromise);
        }

        // When other request is checking token wait for it
        const token = await checkTokenPromise;
        if (!token) {
            return config
        }

        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        logger.error(error)
        Promise.reject(error)
  });

export default robotcloudApi;
