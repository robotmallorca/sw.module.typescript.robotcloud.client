import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  ProjectRequestParams,
  RobotCloudProject,
  RobotCloudProjectDetails,
  ProjectDetailsRequestParams,
  RobotCloudServiceTypeDetails,
  SubsystemRequestParams,
} from "../../../types/RobotCloudClient";

class ProjectsClient {
  getProjects = (
    params?: ProjectRequestParams
  ): Promise<AxiosResponse<RobotCloudProject[]>> => {
    return robotcloudApi.get<RobotCloudProject[]>("projects", {
      params,
    });
  };

  getProjectDetails = (
    prjId: string,
    params?: ProjectDetailsRequestParams
  ): Promise<AxiosResponse<RobotCloudProjectDetails>> => {
    return robotcloudApi.get<RobotCloudProjectDetails>(`projects/${prjId}`, {
      params,
    });
  };

  getProjectServiceTypes = (
    prjId: string,
    params?: SubsystemRequestParams
  ): Promise<AxiosResponse<RobotCloudServiceTypeDetails[]>> => {
    return robotcloudApi.get<RobotCloudServiceTypeDetails[]>(
      `projects/${prjId}/services`,
      {
        params,
      }
    );
  };
}
export const projectsClient = new ProjectsClient();
