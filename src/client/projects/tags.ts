import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import {
  ProjectTag,
  ProjectTagDetails,
  ProjectModifyTag,
} from "../../../types/ProjectTag";
import {
  RobotCloudDelete,
} from "../../../types/RobotCloudClient";
import { ProjectTagRequestParams } from "../../../types/request-params";

const logger = useLogger("service-instances-client");

export class TagsClient {
  getTags = (
    prjId: string,
    params?: ProjectTagRequestParams
  ): Promise<AxiosResponse<ProjectTag[]>> => {
    logger.info(`Get project ${prjId} tags`);
    return robotcloudApi.get<ProjectTag[]>(`projects/${prjId}/tags`, {
      params,
    });
  };

  getTag = (
    prjId: string,
    tagId: string
  ): Promise<AxiosResponse<ProjectTagDetails>> => {
    logger.info(`Get project ${prjId} tag ${tagId}`);
    return robotcloudApi.get<ProjectTagDetails>(`tags/${tagId}`);
  };

  postTag = (
    prjId: string,
  ): Promise<AxiosResponse<ProjectTag>> => {
    logger.info(`Create tag for project ${prjId}`);
    return robotcloudApi.post<ProjectTag>(`projects/${prjId}/tags`);
  };

  putTag = (
    prjId: string,
    tagId: string
  ): Promise<AxiosResponse<ProjectModifyTag>> => {
    logger.info(`Modify project ${prjId} tag ${tagId}`);
    return robotcloudApi.put<ProjectModifyTag>(`tags/${tagId}`);
  };

  deleteTag = (
    prjId: string,
    tagId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    logger.info(`Delete project ${prjId} tag ${tagId}`);
    return robotcloudApi.delete<RobotCloudDelete>(`tags/${tagId}`);
  };

}

export const tagsClient = new TagsClient();
