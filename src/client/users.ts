import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
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

class UsersClient {
  getUsers = (): Promise<AxiosResponse<RobotCloudUsers[]>> => {
    return robotcloudApi.get<RobotCloudUsers[]>(`users`)
  };

  getUser = (
    username: string
  ): Promise<AxiosResponse<RobotCloudUserDetails>> => {
    return robotcloudApi.get<RobotCloudUserDetails>(`users/${username}`);
  };

  putUser = (
    username: string
  ): Promise<AxiosResponse<RobotCloudPutUserDetails>> => {
    return robotcloudApi.put<RobotCloudPutUserDetails>(`users/${username}`);
  };

  deleteUser = (
    username: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return robotcloudApi.delete<RobotCloudDelete>(`users/${username}`);
  };

  getUserOrganizations = (
    username: string
  ): Promise<AxiosResponse<RobotCloudUserOrganization[]>> => {
    return robotcloudApi.get<RobotCloudUserOrganization[]>(`users/${username}`);
  };

  getUserProjects = (
    username: string
  ): Promise<AxiosResponse<RobotCloudUserProject[]>> => {
    return robotcloudApi.get<RobotCloudUserProject[]>(
      `users/${username}/projects`
    );
  };

  postUserProjects = (
    username: string
  ): Promise<AxiosResponse<RobotCloudPostUserProject>> => {
    return robotcloudApi.post<RobotCloudPostUserProject>(
      `users/${username}/projects`
    );
  };

  getProjectToUser = (
    username: string,
    projectId: string
  ): Promise<AxiosResponse<RobotCloudUserProject>> => {
    return robotcloudApi.get<RobotCloudUserProject>(
      `users/${username}/projects/${projectId}`
    );
  }

  putProjectToUser = (
    username: string,
    projectId: string
  ): Promise<AxiosResponse<RobotCloudPutProjectUser>> => {
    return robotcloudApi.put<RobotCloudPutProjectUser>(
      `users/${username}/projects/${projectId}`
    );
  }

  deleteProjectToUser = (
    username: string,
    projectId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return robotcloudApi.delete<RobotCloudDelete>(
      `users/${username}/projects/${projectId}`
    );
  }
}

export const usersClient = new UsersClient();
