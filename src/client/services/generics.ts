import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  ServiceTypeAlertStatusClient,
  ServiceTypeAlertStatusResponse,
} from "../../../types/services";

export class GenericAlertStatusClient<T extends string>
  implements ServiceTypeAlertStatusClient<T>
{
  private readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }
  getAll(
  ): Promise<AxiosResponse<ServiceTypeAlertStatusResponse<T>>> {
    return robotcloudApi.get<ServiceTypeAlertStatusResponse<T>>(
      `/services/${this.serviceName}/alertstatus`
    );
  }

  get(
    instance_id: string
  ): Promise<AxiosResponse<ServiceTypeAlertStatusResponse<T>>> {
    return robotcloudApi.get<ServiceTypeAlertStatusResponse<T>>(
      `/services/${this.serviceName}/instances/${instance_id}/alertstatus`
    );
  }

  put(
    instance_id: string,
    status: Record<T, boolean>
  ): Promise<AxiosResponse<ServiceTypeAlertStatusResponse<T>>> {
    return robotcloudApi.put<ServiceTypeAlertStatusResponse<T>>(
      `/services/${this.serviceName}/instances/${instance_id}/alertstatus`,
      { status }
    );
  }
}
