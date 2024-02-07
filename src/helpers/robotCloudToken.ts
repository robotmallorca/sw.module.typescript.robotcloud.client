import axios from "axios";
import { useLogger } from 'utils/logger';
import robotcloudApi from "robotCloudApi";
import { CheckTokenResponse, RobotCloudJWTPayload } from "../../types/Token";

const logger = useLogger("robotcloud-token")

const MINUTES_BEFORE_EXPIRATION_RENEW = 20; // TODO: Environment variable



function parseJwt(token: string) {
    if (!token) {
      return;
    }
    return JSON.parse(atob(token.split('.')[1])); 
}

export interface RobotCloudNewTokenResponse {
  access: string;
  renew: string;
}

export const decodeToken = (token: string): RobotCloudJWTPayload | undefined => {
  const payload = parseJwt(token);
  if (!payload) {
    return undefined
  }

  return payload as RobotCloudJWTPayload;
};

export const isTokenExpired = (payload: RobotCloudJWTPayload): boolean => {
  const expirationDate = new Date(payload.exp * 1000);
  expirationDate.setMinutes(
    expirationDate.getMinutes() - MINUTES_BEFORE_EXPIRATION_RENEW
  );
  const currentDate = new Date();
  return currentDate >= expirationDate;
};

export const renewToken = async (
  renew_token: string
): Promise<CheckTokenResponse> => {
    logger.debug("Renewing token ...");
    const cloudUrl = robotcloudApi.defaults.baseURL
    const { data } = await axios.get(cloudUrl + "login/renew", {
        headers: {
            Authorization: `Bearer ${renew_token}`,
        },
    });

  return {
    renewed: true,
    access: data["access"]["token"],
    renew: data["renew"]["token"],
  } as CheckTokenResponse;
};

export const validateToken = async (
    access_token: string
): Promise<boolean> => {
    logger.debug("Validate token ...");
    const payload = decodeToken(access_token)
    if (!payload) {
        return false
    }
    const cloudUrl = robotcloudApi.defaults.baseURL
    try {
        const { data } = await axios.get(
            cloudUrl + `users/${payload.sub}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );  
    } catch (error) {
        if (axios.isAxiosError(error)) {
            logger.warn(`${error.message}: ${error.response?.data?.message ?? ''}`)
        } else {
            logger.warn(error)
        }
        return false;
    }

    return true
};
