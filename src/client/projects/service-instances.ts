import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import {
  RobotCloudServiceInstance,
  ServiceInstanceDetails,
  ServiceInstanceDevicesInfo,
} from "../../../types/ServiceInstance";
import { ServiceInstancesRequestParams } from "../../../types/request-params";
import { ServiceDataMeasurement } from "../../../types/services";
import { ServiceInstanceRead } from "../../../types/ServiceInstanceRead";

const logger = useLogger("service-instances-client");

class ServiceInstancesClient {
  getServiceInstances = (
    prjId: string,
    service_type: string,
    params?: ServiceInstancesRequestParams
  ): Promise<AxiosResponse<RobotCloudServiceInstance[]>> => {
    return robotcloudApi.get<RobotCloudServiceInstance[]>(
      `projects/${prjId}/services/${service_type}/instances`,
      {
        params,
      }
    );
  };

  getServiceInstance = (
    prjId: string,
    service_type: string,
    service_id: string
  ) => {
    return robotcloudApi.get<ServiceInstanceDetails>(
      `projects/${prjId}/services/${service_type}/instances/${service_id}`
    );
  };

  getServiceInstanceDevicesInfo = (
    prjId: string,
    service_type: string,
    service_id: string
  ) => {
    return robotcloudApi.get<Record<string, ServiceInstanceDevicesInfo>>(`projects/${prjId}/services/${service_type}/instances/${service_id}/deviceconf`);
  };

  getServiceAllInstancesData(
    prjId: string,
    service_type: string
  ): Promise<AxiosResponse<ServiceDataMeasurement<any>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<any>[]>(`projects/${prjId}/services/${service_type}/data`);
  };

  getServiceAllInstancesAlerts(
    prjId: string,
    service_type: string
  ): Promise<AxiosResponse<ServiceInstanceRead<any>[]>> {
    return robotcloudApi.get<ServiceInstanceRead<any>[]>(
      `projects/${prjId}/services/${service_type}/alert`);
  };

}

export const serviceInstancesClient = new ServiceInstancesClient();

