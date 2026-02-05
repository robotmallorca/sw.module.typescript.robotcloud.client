import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { ServiceDataMeasurement, ServiceInstanceConfigClient, ServiceInstanceDataClient, ServiceInstanceAlertsClient, ServiceInstanceHistoricClient, HistoricAggregateFunction } from "../../../types/services";
import { ServiceDataRequestParams, ServiceInstanceDataRequestParams, ServiceInstanceAlertRequestParams, ServiceAlertRequestParams, ServiceInstanceHistoricParams, ServiceInstanceHistoricAggregateParams } from "../../../types/request-params";


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

export class GenericInstanceAlertClient<T> implements ServiceInstanceAlertsClient<T> {
  private readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  get(
    prjId: string,
    instanceId: string,
    params?: ServiceInstanceAlertRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T>>> {
    return robotcloudApi.get<ServiceDataMeasurement<T>>(
      `/projects/${prjId}/services/${this.serviceName}/instances/${instanceId}/alert`,
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
    params?: ServiceAlertRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<T>[]>(
      `/projects/${prjId}/services/${this.serviceName}/alert`,
      {
        params,
        headers: {
          Accept: "application/json",
        },
      }
    );
  }
}

export class GenericInstanceHistoricClient<T> implements ServiceInstanceHistoricClient<T> {
  private readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  get(
    prjId: string,
    instanceId: string,
    startTime: Date,
    endTime: Date,
    params: ServiceInstanceHistoricParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<T>[]>(
      `/projects/${prjId}/services/${this.serviceName}/instances/${instanceId}/historic/data`,
      {
        params: {
          start_time: startTime,
          end_time: endTime,
          ...params,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
  }

  getAggregate(
    prjId: string,
    instanceId: string,
    startTime: Date,
    endTime: Date,
    aggFunction: HistoricAggregateFunction,
    periode: string,
    params: ServiceInstanceHistoricAggregateParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<T>[]>(
      `/projects/${prjId}/services/${this.serviceName}/instances/${instanceId}/historic/data/aggregate`,
      {
        params: {
          start_time: startTime,
          end_time: endTime,
          function: aggFunction,
          periode,
          ...params,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
  }
}