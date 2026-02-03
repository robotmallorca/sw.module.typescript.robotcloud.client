import type { AxiosInstance, AxiosResponse } from "axios";

import {
  RobotCloudUserOrganization,
  RobotCloudUsers,
  RobotCloudUserDetails,
  RobotCloudPutUserDetails,
  RobotCloudUserProject,
  RobotCloudPostUserProject,
  RobotCloudPutProjectUser,
  RobotCloudDelete
} from "../../types/RobotCloudClient";
import { useLogger } from "@/utils/logger";

export class UsersClient {
  private robotcloudApi: AxiosInstance;
  private logger = useLogger('UsersClient')

  constructor(robotcloudApi: AxiosInstance) {
    this.robotcloudApi = robotcloudApi;
  }

  getUsers = (): Promise<AxiosResponse<RobotCloudUsers[]>> => {
    return this.robotcloudApi.get<RobotCloudUsers[]>(`users`)
  };

  getUser = (
    username: string
  ): Promise<AxiosResponse<RobotCloudUserDetails>> => {
    return this.robotcloudApi.get<RobotCloudUserDetails>(`users/${username}`);
  };

  putUser = (
    username: string
  ): Promise<AxiosResponse<RobotCloudPutUserDetails>> => {
    return this.robotcloudApi.put<RobotCloudPutUserDetails>(`users/${username}`);
  };

  deleteUser = (
    username: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return this.robotcloudApi.delete<RobotCloudDelete>(`users/${username}`);
  };

  getUserOrganizations = (
    username: string
  ): Promise<AxiosResponse<RobotCloudUserOrganization[]>> => {
    return this.robotcloudApi.get<RobotCloudUserOrganization[]>(`users/${username}`);
  };

  getUserProjects = (
    username: string
  ): Promise<AxiosResponse<RobotCloudUserProject[]>> => {
    return this.robotcloudApi.get<RobotCloudUserProject[]>(
      `users/${username}/projects`
    );
  };

  postUserProjects = (
    username: string
  ): Promise<AxiosResponse<RobotCloudPostUserProject>> => {
    return this.robotcloudApi.post<RobotCloudPostUserProject>(
      `users/${username}/projects`
    );
  };

  getProjectToUser = (
    username: string,
    projectId: string
  ): Promise<AxiosResponse<RobotCloudUserProject>> => {
    return this.robotcloudApi.get<RobotCloudUserProject>(
      `users/${username}/projects/${projectId}`
    );
  }

  putProjectToUser = (
    username: string,
    projectId: string
  ): Promise<AxiosResponse<RobotCloudPutProjectUser>> => {
    return this.robotcloudApi.put<RobotCloudPutProjectUser>(
      `users/${username}/projects/${projectId}`
    );
  }

  deleteProjectToUser = (
    username: string,
    projectId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return this.robotcloudApi.delete<RobotCloudDelete>(
      `users/${username}/projects/${projectId}`
    );
  }
}

