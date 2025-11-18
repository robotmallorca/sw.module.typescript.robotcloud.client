import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import {
  Classifier,
  ClassifierDetails
} from "../../../types/ProjectClassifer";
import { ProjectClassifiersRequestParams } from "../../../types/request-params";

const logger = useLogger("classifiers-client");

class ClassifiersClient {
  getProjectClassifiers = (
    prjId: string,
    params?: ProjectClassifiersRequestParams
  ): Promise<AxiosResponse<Classifier[]>> => {
    logger.info(`Get project ${prjId} classifiers`);
    return robotcloudApi.get<Classifier[]>(`projects/${prjId}/classifiers`, {
      params,
    });
  };

  getClassifier = (classifierId: string) => {
    return robotcloudApi.get<ClassifierDetails>(`classifiers/${classifierId}`);
  };
}

export const classifiersClient = new ClassifiersClient();
