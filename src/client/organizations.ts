import type { AxiosInstance, AxiosResponse } from "axios";

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
import { useLogger } from "@/utils/logger";

export class OrganizationsClient {
  private robotcloudApi: AxiosInstance;
  private logger = useLogger('OrganizationsClient')

  constructor(robotcloudApi: AxiosInstance) {
    this.robotcloudApi = robotcloudApi;
  }

  getOrganizations = (): Promise<AxiosResponse<RobotCloudOrganizations[]>> => {
    return this.robotcloudApi.get<RobotCloudOrganizations[]>(`organizations`)
  };

  postOrganizations = (): Promise<AxiosResponse<RobotCloudCreateOrganization>> => {
    return this.robotcloudApi.post<RobotCloudCreateOrganization>(`organizations`)
  };

  getOrganization = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudOrganizationDetails>> => {
    return this.robotcloudApi.get<RobotCloudOrganizationDetails>(
      `organizations/${organizationId}`
    );
  };

  putOrganization = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudPutOrganization>> => {
    return this.robotcloudApi.put<RobotCloudPutOrganization>(
      `organizations/${organizationId}`
    );
  };

  deleteOrganization = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return this.robotcloudApi.delete<RobotCloudDelete>(
      `organizations/${organizationId}`
    );
  };

  getOrganizationProjects = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudProject[]>> => {
    return this.robotcloudApi.get<RobotCloudProject[]>(
      `organizations/${organizationId}/projects`
    );
  };

  postOrganizationProjects = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudOrganizationCreateUser>> => {
    return this.robotcloudApi.post<RobotCloudOrganizationCreateUser>(
      `organizations/${organizationId}/projects`
    );
  };

  getOrganizationUsers = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudOrganizationUsers[]>> => {
    return this.robotcloudApi.get<RobotCloudOrganizationUsers[]>(
      `organizations/${organizationId}/users`
    );
  };

  postOrganizationUsers = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudOrganizationCreateUser>> => {
    return this.robotcloudApi.post<RobotCloudOrganizationCreateUser>(
      `organizations/${organizationId}/users`
    );
  };


}

