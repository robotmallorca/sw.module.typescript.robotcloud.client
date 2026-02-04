import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  RobotCloudProject,
  RobotCloudPutProject,
  RobotCloudProjectDetails,
  RobotCloudServiceTypeDetails,
  RobotCloudDelete,
  RobotCloudProjectUsers,
  RobotCloudProjectInstances,
  RobotCloudProjectApplications,
  RobotCloudApplicationEnable,
  RobotCloudCreateProject
} from "../../../types/RobotCloudClient";
import {
  ProjectDetailsRequestParams,
  ProjectsRequestParams,
  SubsystemRequestParams,
} from "../../../types/request-params";

class ProjectsClient {

  getOrganizationProjects = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudProject[]>> => {
    return robotcloudApi.get<RobotCloudProject[]>(
      `organizations/${organizationId}/projects`
    );
  };
  
  postOrganizationProjects = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudCreateProject>> => {
    return robotcloudApi.post<RobotCloudCreateProject>(
      `organizations/${organizationId}/projects`
    );
  };

  getProjects = (
    params?: ProjectsRequestParams
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

  putProjectDetails = (
    prjId: string,
    params?: ProjectDetailsRequestParams
  ): Promise<AxiosResponse<RobotCloudPutProject>> => {
    return robotcloudApi.put<RobotCloudPutProject>(`projects/${prjId}`, {
      params,
    });
  };

  deleteProject = (
    prjId: string,
    params?: ProjectDetailsRequestParams
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return robotcloudApi.delete<RobotCloudDelete>(`projects/${prjId}`, {
      params,
    });
  };

  getProjectUsers = (
    prjId: string,
    params?: ProjectDetailsRequestParams
  ): Promise<AxiosResponse<RobotCloudProjectUsers>> => {
    return robotcloudApi.get<RobotCloudProjectUsers>(`projects/${prjId}/users`, {
      params,
    });
  };

  getProjectApplications = (
    prjId: string,
    params?: ProjectDetailsRequestParams
  ): Promise<AxiosResponse<RobotCloudProjectApplications[]>> => {
    return robotcloudApi.get<RobotCloudProjectApplications[]>(`projects/${prjId}/applications`, {
      params,
    });
  };

  getProjectApplication = (
    prjId: string,
    appId: string
  ): Promise<AxiosResponse<RobotCloudProjectApplications>> => {
    return robotcloudApi.get<RobotCloudProjectApplications>(`projects/${prjId}/applications/${appId}`, 
      {}
    );
  };

  putProjectApplication = (
    prjId: string,
    appId: string
  ): Promise<AxiosResponse<RobotCloudApplicationEnable>> => {
    return robotcloudApi.put<RobotCloudApplicationEnable>(`projects/${prjId}/applications/${appId}`, 
      {}
    );
  };

}
export const projectsClient = new ProjectsClient();

