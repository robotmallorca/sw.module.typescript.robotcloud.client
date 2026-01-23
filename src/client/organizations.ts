import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  RobotCloudOrganizations,
  RobotCloudCreateOrganization,
  RobotCloudPutOrganization,
  RobotCloudOrganizationDetails,
  RobotCloudProject,
  RobotCloudOrganizationUsers,
  RobotCloudOrganizationCreateUser,
  RobotCloudDelete
} from "../../types/RobotCloudClient";

class OrganizationsClient {
  getOrganizations = (): Promise<AxiosResponse<RobotCloudOrganizations[]>> => {
    return robotcloudApi.get<RobotCloudOrganizations[]>(`organizations`)
  };

  postOrganizations = (): Promise<AxiosResponse<RobotCloudCreateOrganization>> => {
    return robotcloudApi.post<RobotCloudCreateOrganization>(`organizations`)
  };

  getOrganization = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudOrganizationDetails>> => {
    return robotcloudApi.get<RobotCloudOrganizationDetails>(
      `organizations/${organizationId}`
    );
  };

  putOrganization = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudPutOrganization>> => {
    return robotcloudApi.put<RobotCloudPutOrganization>(
      `organizations/${organizationId}`
    );
  };

  deleteOrganization = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return robotcloudApi.delete<RobotCloudDelete>(
      `organizations/${organizationId}`
    );
  };

  getOrganizationProjects = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudProject[]>> => {
    return robotcloudApi.get<RobotCloudProject[]>(
      `organizations/${organizationId}/projects`
    );
  };

  postOrganizationProjects = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudOrganizationCreateUser>> => {
    return robotcloudApi.post<RobotCloudOrganizationCreateUser>(
      `organizations/${organizationId}/projects`
    );
  };

  getOrganizationUsers = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudOrganizationUsers[]>> => {
    return robotcloudApi.get<RobotCloudOrganizationUsers[]>(
      `organizations/${organizationId}/users`
    );
  };

  postOrganizationUsers = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudOrganizationCreateUser>> => {
    return robotcloudApi.post<RobotCloudOrganizationCreateUser>(
      `organizations/${organizationId}/users`
    );
  };

  
}

export const organizationsClient = new OrganizationsClient();
