import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import {
  ProjectTag,
  ProjectTagDetails,
} from "../../../types/ProjectTag";
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
}

export const tagsClient = new TagsClient();
