import type { AxiosInstance, AxiosResponse } from "axios";

import {
  RobotCloudDescribedItem,
  RobotCloudCreateApplication,
  RobotCloudGetApplication,
  RobotCloudPutApplication,
  RobotCloudDelete
} from "../../types/RobotCloudClient";
import { useLogger } from "@/utils/logger";

export class ApplicationsClient {
  private robotcloudApi: AxiosInstance;
  private logger = useLogger('ApplicationsClient')

  constructor(robotcloudApi: AxiosInstance) {
    this.robotcloudApi = robotcloudApi;
  }
  getApplications = (): Promise<AxiosResponse<RobotCloudDescribedItem[]>> => {
    return this.robotcloudApi.get<RobotCloudDescribedItem[]>(`application/register`)
  };

  postOrganizations = (): Promise<AxiosResponse<RobotCloudCreateApplication>> => {
    return this.robotcloudApi.post<RobotCloudCreateApplication>(`application/register`)
  };

  getApplication = (
    applicationId: string
  ): Promise<AxiosResponse<RobotCloudGetApplication>> => {
    return this.robotcloudApi.get<RobotCloudGetApplication>(`application/register/${applicationId}`)
  };

  putApplication = (
    applicationId: string
  ): Promise<AxiosResponse<RobotCloudPutApplication>> => {
    return this.robotcloudApi.get<RobotCloudPutApplication>(`application/register/${applicationId}`)
  };

  deleteApplication = (
    applicationId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return this.robotcloudApi.get<RobotCloudDelete>(`application/register/${applicationId}`)
  };

}