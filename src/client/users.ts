import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
    RobotCloudUserDetails, 
    RobotCloudUserProject, 
} from "../../types/RobotCloudClient";

class UsersClient {
  getUser = (
    username: string
  ): Promise<AxiosResponse<RobotCloudUserDetails>> => {
    return robotcloudApi.get<RobotCloudUserDetails>(`users/${username}`);
  };

  getUserProjects = (
    username: string
  ): Promise<AxiosResponse<RobotCloudUserProject[]>> => {
    return robotcloudApi.get<RobotCloudUserProject[]>(
      `users/${username}/projects`
    );
  };
}

export const usersClient = new UsersClient();
