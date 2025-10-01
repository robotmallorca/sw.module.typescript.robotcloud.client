import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  LocationServiceInstancesRequestParams,
  ProjectLocationsRequestParams,
  RobotCloudNamedItem,
  RobotCloudServiceType,
} from "../../../types/RobotCloudClient";
import {
  RobotCloudServiceInstance
} from "../../../types/ServiceInstance";

interface RobotCloudLocationDetails {
  id: string;
  name: string;
  description: string;
  project: string;
  tags: string[];
}

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

  getLocation = (
    locationId: string
  ): Promise<AxiosResponse<RobotCloudLocationDetails>> => {
    return robotcloudApi.get<RobotCloudLocationDetails>(
      `locations/${locationId}`,
      {}
    );
  };
}

export const locationsClient = new LocationsClient();
