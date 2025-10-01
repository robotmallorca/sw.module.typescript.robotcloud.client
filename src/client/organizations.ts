import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  RobotCloudOrganizationDetails,
  RobotCloudProject,
} from "../../types/RobotCloudClient";

class OrganizationsClient {
  getOrganization = (
    organizationId: string
  ): Promise<AxiosResponse<RobotCloudOrganizationDetails>> => {
    return robotcloudApi.get<RobotCloudOrganizationDetails>(
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
}

export const organizationsClient = new OrganizationsClient();
