import { useLogger } from "@/utils/logger";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { SessionTokenResponse } from "../../types/Token";

export interface LoginClient {
  login(username: string, password: string, apiKey: string): Promise<AxiosResponse<SessionTokenResponse>>;
  renewToken(token: string): Promise<AxiosResponse<SessionTokenResponse>>;
}

export class LoginClientImpl implements LoginClient {
  private robotcloudApi: AxiosInstance;
  private logger = useLogger('AlertsClientImpl')

  constructor(robotcloudApi: AxiosInstance) {
    this.robotcloudApi = robotcloudApi;
  }

  public async login(username: string, password: string, apiKey: string): Promise<AxiosResponse<SessionTokenResponse>> {
    try {
      const encoded = btoa(`${username}:${password}`)
      const basicString = `Basic ${encoded}`

      // Do not run interceptors
      const cloudUrl = this.robotcloudApi.defaults.baseURL
      return await axios.get<SessionTokenResponse>(cloudUrl + 'login', {
        headers: {
          Authorization: basicString,
          "x-api-key": apiKey
        }
      });
    } catch (error) {
      this.logger.error('Error logging in', error);
      throw error;
    }
  }

  public async renewToken(token: string): Promise<AxiosResponse<SessionTokenResponse>> {
    try {
      // Do not run interceptors
      const cloudUrl = this.robotcloudApi.defaults.baseURL
      return await axios.get<SessionTokenResponse>(cloudUrl + 'login/renew', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      this.logger.error('Error renewing token', error);
      throw error;

    }
  }
}