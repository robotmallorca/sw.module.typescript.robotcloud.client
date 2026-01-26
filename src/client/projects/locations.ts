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
  getLocationServiceInstances = (
    prjId: string,
    locId: string,
    service_type: RobotCloudServiceType,
    params?: LocationServiceInstancesRequestParams
  ): Promise<AxiosResponse<RobotCloudServiceInstance[]>> => {
    return robotcloudApi.get<RobotCloudServiceInstance[]>(
      `projects/${prjId}/locations/${locId}/services/${service_type}/instances`,
      {
        params,
      }
    );
  };

  postLocationServiceInstances = (
    prjId: string,
    locId: string,
    service_type: RobotCloudServiceType,
    params?: LocationServiceInstancesRequestParams
  ): Promise<AxiosResponse<CreateServiceInstance[]>> => {
    return robotcloudApi.post<CreateServiceInstance[]>(
      `projects/${prjId}/locations/${locId}/services/${service_type}/instances`,
      {
        params,
      }
    );
  };

  getLocations = (
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

  postLocations = (
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

  getLocation = (
    locationId: string
  ): Promise<AxiosResponse<RobotCloudLocationDetails>> => {
    return robotcloudApi.get<RobotCloudLocationDetails>(
      `locations/${locationId}`,
      {}
    );
  };

  putLocation = (
    locationId: string
  ): Promise<AxiosResponse<RobotCloudLocationModify>> => {
    return robotcloudApi.get<RobotCloudLocationModify>(
      `locations/${locationId}`,
      {}
    );
  };

  deleteLocation = (
    locationId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return robotcloudApi.get<RobotCloudDelete>(
      `locations/${locationId}`,
      {}
    );
  };
}

export const locationsClient = new LocationsClient();
