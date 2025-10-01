import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import { 
    RobotCloudServiceInstance, ServiceInstanceDetails, ServiceInstancesRequestParams 
} from "../../../types/ServiceInstance";

const logger = useLogger("service-instances-client");

class ServiceInstancesClient {
getServiceInstances = (
  prjId: string,
  service_type: string,
  params?: ServiceInstancesRequestParams
): Promise<AxiosResponse<RobotCloudServiceInstance[]>> => {
  return robotcloudApi.get<RobotCloudServiceInstance[]>(`projects/${prjId}/services/${service_type}/instances`, {
    params,
  });
}

getServiceInstance = (
  prjId: string,
  service_type: string,
  service_id: string
) => {
  return robotcloudApi.get<ServiceInstanceDetails>(`projects/${prjId}/services/${service_type}/instances/${service_id}`);
}
}

export const serviceInstancesClient = new ServiceInstancesClient();
