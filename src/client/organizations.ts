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

}

