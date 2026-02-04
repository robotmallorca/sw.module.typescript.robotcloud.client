import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { ServiceInstanceConfigClient } from "../../../types/services";


export class GenericInstanceConfigClient<T> implements ServiceInstanceConfigClient<T> {
  private readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  get(
    project_id: string,
    instance_id: string
  ): Promise<AxiosResponse<T>> {
    return robotcloudApi.get<T>(
      `/projects/${project_id}/services/${this.serviceName}/instances/${instance_id}/configuration`
    );
  }

  put(
    project_id: string,
    instance_id: string,
    new_config: T
  ): Promise<AxiosResponse<T>> {
    return robotcloudApi.put<T>(
      `/projects/${project_id}/services/${this.serviceName}/instances/${instance_id}/configuration`,
      new_config
    );
  }
}
