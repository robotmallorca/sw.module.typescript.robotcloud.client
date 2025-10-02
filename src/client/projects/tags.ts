import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import { ProjectTagRequestParams } from "../../../types/RobotCloudClient";
import {
  ProjectTag,
} from "../../../types/ProjectTag";

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
}

export const tagsClient = new TagsClient();
