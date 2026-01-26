import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import {
  Classifier,
  ClassifierDetails,
  ClassifierCreate,
  ClassifierModify
} from "../../../types/ProjectClassifer";
import {
  RobotCloudDelete
} from "../../../types/RobotCloudClient";
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

  getClassifier = (
    classifierId: string
  ): Promise<AxiosResponse<ClassifierDetails>> => {
    return robotcloudApi.get<ClassifierDetails>(
      `classifiers/${classifierId}`,
      {}
    );
  };

  putClassifier = (
    classifierId: string
  ): Promise<AxiosResponse<ClassifierModify>> => {
    return robotcloudApi.put<ClassifierModify>(
      `classifiers/${classifierId}`,
      {}
    );
  };

  postClassifier = (
    classifierId: string
  ): Promise<AxiosResponse<ClassifierCreate>> => {
    return robotcloudApi.post<ClassifierCreate>(
      `classifiers/${classifierId}`,
      {}
    );
  };

  deleteClassifier = (
    classifierId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return robotcloudApi.delete<RobotCloudDelete>(
      `classifiers/${classifierId}`,
      {}
    );
  };
}

export const classifiersClient = new ClassifiersClient();
