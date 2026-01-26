import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import {
  putProjectSubsystem
} from "../../../types/ProjectSubsystem";
import {
  ProjectLocations
} from "../../../types/ProjectLocation";
import { RobotCloudDescribedItem, RobotCloudDelete } from "../../../types/RobotCloudClient";

const logger = useLogger("service-instances-client");

class SubsystemsClient {
  getProjectSubsystems = (
    prjId: string,
  ): Promise<AxiosResponse<RobotCloudDescribedItem[]>> => {
    logger.info(`Get project ${prjId} subsystems`);
    return robotcloudApi.get<RobotCloudDescribedItem[]>(
      `projects/${prjId}/subsystems`
    );
  };

  getProjectSubsystem = (
    prjId: string,
    subsysId: string
  ): Promise<AxiosResponse<RobotCloudDescribedItem>> => {
    logger.info(`Get subsystem ${subsysId} from project ${prjId}`);
    return robotcloudApi.get<RobotCloudDescribedItem>(
      `projects/${prjId}/subsystems/${subsysId}`
    );
  };

  postProjectSubsystem = (
    prjId: string,
  ): Promise<AxiosResponse<RobotCloudDescribedItem>> => {
    logger.info(`Create subsystem in project ${prjId}`);
    return robotcloudApi.post<RobotCloudDescribedItem>(
      `projects/${prjId}/subsystems`
    );
  };

  putProjectSubsystem = (
    prjId: string,
    subsysId: string,
  ): Promise<AxiosResponse<putProjectSubsystem>> => {
    logger.info(`Update subsystem ${subsysId} in project ${prjId}`);
    return robotcloudApi.put<putProjectSubsystem>(
      `projects/${prjId}/subsystems/${subsysId}`
    );
  };

  deleteSubsystem = (
    prjId: string,
    subsysId: string,
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    logger.info(`Delete subsystem ${subsysId} in project ${prjId}`);
    return robotcloudApi.delete<RobotCloudDelete>(`projects/${prjId}/subsystems/${subsysId}`);
  };

  getProjectSubsystemLocations = (
    prjId: string,
    subsysId: string,
  ): Promise<AxiosResponse<ProjectLocations>> => {
    logger.info(`Get subsystems locations  ${subsysId} in project ${prjId}`);
    return robotcloudApi.get<ProjectLocations>(
      `projects/${prjId}/subsystems/${subsysId}/locations`
    );
  };

}
export const subsystemsClient = new SubsystemsClient();
