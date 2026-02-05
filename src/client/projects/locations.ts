import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  RobotCloudNamedItem,
  RobotCloudServiceType,
  RobotCloudDelete
} from "../../../types/RobotCloudClient";
import {
  RobotCloudServiceInstance,
  CreateServiceInstance
} from "../../../types/ServiceInstance";
import {
  RobotCloudLocationDetails,
  RobotCloudLocationModify,
  RobotCloudLocationCreate
} from "../../../types/ProjectLocation";
import { LocationServiceInstancesRequestParams, ProjectLocationsRequestParams } from "../../../types/request-params";

class LocationsClient {

  getAll = (
    prjId: string,
    params?: ProjectLocationsRequestParams
  ): Promise<AxiosResponse<RobotCloudNamedItem[]>> => {
    return robotcloudApi.get<RobotCloudNamedItem[]>(
      `projects/${prjId}/locations`,
      {
        params,
      }
    );
  };

  post = (
    prjId: string,
    params?: ProjectLocationsRequestParams
  ): Promise<AxiosResponse<RobotCloudLocationCreate[]>> => {
    return robotcloudApi.post<RobotCloudLocationCreate[]>(
      `projects/${prjId}/locations`,
      {
        params,
      }
    );
  };

  get = (
    locationId: string
  ): Promise<AxiosResponse<RobotCloudLocationDetails>> => {
    return robotcloudApi.get<RobotCloudLocationDetails>(
      `locations/${locationId}`,
      {}
    );
  };

  put = (
    locationId: string
  ): Promise<AxiosResponse<RobotCloudLocationModify>> => {
    return robotcloudApi.put<RobotCloudLocationModify>(
      `locations/${locationId}`,
      {}
    );
  };

  delete = (
    locationId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return robotcloudApi.delete<RobotCloudDelete>(
      `locations/${locationId}`,
      {}
    );
  };
}

export const locationsClient = new LocationsClient();
