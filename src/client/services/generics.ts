import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { ServiceDataMeasurement, ServiceInstanceConfigClient, ServiceInstanceDataClient } from "../../../types/services";
import { ServiceDataRequestParams, ServiceInstanceDataRequestParams } from "../../../types/request-params";


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

export class GenericInstanceDataClient<T> implements ServiceInstanceDataClient<T> {
  private readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  get(
    prjId: string,
    instanceId: string,
    params?: ServiceInstanceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T>>> {
    return robotcloudApi.get<ServiceDataMeasurement<T>>(
      `/projects/${prjId}/services/${this.serviceName}/instances/${instanceId}/data`,
      {
        params,
        headers: {
          Accept: "application/json",
        },
      }
    );
  }

  getAll(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<T>[]>(
      `/projects/${prjId}/services/${this.serviceName}/data`,
      {
        params,
        headers: {
          Accept: "application/json",
        },
      }
    );
  }
}