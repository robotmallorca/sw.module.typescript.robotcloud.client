import type { AxiosResponse } from "axios";
import robotcloudApi from "robotCloudApi";

import {
  RobotCloudDescribedItem,
  RobotCloudCreateApplication,
  RobotCloudGetApplication,
  RobotCloudPutApplication,
  RobotCloudDelete
} from "../../types/RobotCloudClient";
class ApplicationsClient {
    getApplications = (): Promise<AxiosResponse<RobotCloudDescribedItem[]>> => {
        return robotcloudApi.get<RobotCloudDescribedItem[]>(`application/register`)
    };

    postOrganizations = (): Promise<AxiosResponse<RobotCloudCreateApplication>> => {
        return robotcloudApi.post<RobotCloudCreateApplication>(`application/register`)
    };

    getApplication = (
        applicationId: string
    ): Promise<AxiosResponse<RobotCloudGetApplication>> => {
        return robotcloudApi.get<RobotCloudGetApplication>(`application/register/${applicationId}`)
    };

    putApplication = (
        applicationId: string
    ): Promise<AxiosResponse<RobotCloudPutApplication>> => {
        return robotcloudApi.get<RobotCloudPutApplication>(`application/register/${applicationId}`)
    };

    deleteApplication = (
        applicationId: string
    ): Promise<AxiosResponse<RobotCloudDelete>> => {
        return robotcloudApi.get<RobotCloudDelete>(`application/register/${applicationId}`)
    };

}   

export const usersClient = new ApplicationsClient();