import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import {
  RobotCloudServiceInstance,
  ServiceInstanceDetails,
  ModifyServiceInstanceDetails,
  ServiceInstanceDevicesInfo,
  ProjectSizeInstances
} from "../../../types/ServiceInstance";
import {
  RobotCloudServiceTypeDetails,
  RobotCloudDelete
} from "../../../types/RobotCloudClient";
import { ServiceInstancesRequestParams } from "../../../types/request-params";
import { ServiceDataMeasurement } from "../../../types/services";
import { ServiceInstanceRead } from "../../../types/ServiceInstanceRead";

const logger = useLogger("service-instances-client");

class ServiceInstancesClient {
  getAll = (
    prjId: string,
    params?: ServiceInstancesRequestParams
  ): Promise<AxiosResponse<RobotCloudServiceInstance[]>> => {
    return robotcloudApi.get<RobotCloudServiceInstance[]>(
      `projects/${prjId}/instances`,
      {
        params,
      }
    );
  };
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
    instance_id: string
  ) => {
    return robotcloudApi.get<ServiceInstanceDetails>(
      `projects/${prjId}/services/${service_type}/instances/${instance_id}`
    );
  };

  putServiceInstance = (
    prjId: string,
    service_type: string,
    instance_id: string
  ) => {
    return robotcloudApi.put<ModifyServiceInstanceDetails>(
      `projects/${prjId}/services/${service_type}/instances/${instance_id}`
    );
  };

  deleteServiceInstance = (
    prjId: string,
    service_type: string,
    instance_id: string
  ) => {
    return robotcloudApi.delete<RobotCloudDelete>(
      `projects/${prjId}/services/${service_type}/instances/${instance_id}`
    );
  };


  getServiceInstanceDevicesInfo = (
    prjId: string,
    service_type: string,
    service_id: string
  ) => {
    return robotcloudApi.get<Record<string, ServiceInstanceDevicesInfo>>(`projects/${prjId}/services/${service_type}/instances/${service_id}/deviceconf`);
  };

  putServiceInstanceDevicesInfo = (
    prjId: string,
    service_type: string,
    service_id: string
  ) => {
    return robotcloudApi.put<Record<string, ServiceInstanceDevicesInfo>>(`projects/${prjId}/services/${service_type}/instances/${service_id}/deviceconf`);
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

  getServiceLocation (
    prjId: string,
    locationId: string
  ): Promise<AxiosResponse<RobotCloudServiceTypeDetails[]>> {
    return robotcloudApi.get<RobotCloudServiceTypeDetails[]>(
      `projects/${prjId}/locations/${locationId}/services`);
  };

  getSizeProjectInstances (
    prjId: string
  ): Promise<AxiosResponse<ProjectSizeInstances>> {
    return robotcloudApi.get<ProjectSizeInstances>(
      `size/projects/${prjId}/instances`);
  };

  getSizeProjectServicesInstances (
    prjId: string,
    service_type: string
  ): Promise<AxiosResponse<ProjectSizeInstances>> {
    return robotcloudApi.get<ProjectSizeInstances>(
      `size/projects/${prjId}/services/${service_type}/instances`);
  };

}

export const serviceInstancesClient = new ServiceInstancesClient();

