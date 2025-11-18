import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  AirQuality1AlertEventValue,
  AirQuality1DataEventValue,
  HistoricAggregateFunction,
  ServiceDataMeasurement,
  ServiceTypeClient,
} from "../../../types/services";
import {
  ServiceDataRequestParams,
  ServiceInstanceDataRequestParams,
  ServiceInstanceHistoricAggregateParams,
  ServiceInstanceHistoricParams,
} from "../../../types/request-params";
import { GenericInstanceConfigClient } from "./generics";

export class AirQualityConfigClient extends GenericInstanceConfigClient<any> {
  constructor() {
    super("AirQuality_1");
  }
}

class AirQualityClient
  implements
    ServiceTypeClient<AirQuality1AlertEventValue, AirQuality1DataEventValue>
{
  private _configurationClient: AirQualityConfigClient;
  get configuration() {
    return this._configurationClient;
  }
  constructor() {
    this._configurationClient = new AirQualityConfigClient();
  }
  getAlerts(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<AirQuality1AlertEventValue>[]>
  > {
    return robotcloudApi.get<
      ServiceDataMeasurement<AirQuality1AlertEventValue>[]
    >(`/projects/${prjId}/services/AirQuality_1/alert`, {
      params,
      headers: {
        Accept: "application/json",
      },
    });
  }

  getData(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<AirQuality1DataEventValue>[]>
  > {
    return robotcloudApi.get<
      ServiceDataMeasurement<AirQuality1DataEventValue>[]
    >(`/projects/${prjId}/services/AirQuality_1/data`, {
      params,
      headers: {
        Accept: "application/json",
      },
    });
  }

  getInstanceData(
    prjId: string,
    instanceId: string,
    params?: ServiceInstanceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<AirQuality1DataEventValue>>> {
    return robotcloudApi.get<ServiceDataMeasurement<AirQuality1DataEventValue>>(
      `/projects/${prjId}/services/AirQuality_1/instances/${instanceId}/data`,
      {
        params,
        headers: {
          Accept: "application/json",
        },
      }
    );
  }

  getInstanceHistoric(
    prjId: string,
    instanceId: string,
    startTime: Date,
    endTime: Date,
    params: ServiceInstanceHistoricParams
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<AirQuality1DataEventValue>[]>
  > {
    return robotcloudApi.get<
      ServiceDataMeasurement<AirQuality1DataEventValue>[]
    >(
      `/projects/${prjId}/services/AirQuality_1/instances/${instanceId}/configuration`,
      {
        params: {
          start_time: startTime,
          end_time: endTime,
          ...params,
        },
      }
    );
  }

  getInstanceHistoricAggregate(
    prjId: string,
    instanceId: string,
    startTime: Date,
    endTime: Date,
    aggFunction: HistoricAggregateFunction,
    periode: string,
    params: ServiceInstanceHistoricAggregateParams
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<AirQuality1DataEventValue>[]>
  > {
    return robotcloudApi.get<
      ServiceDataMeasurement<AirQuality1DataEventValue>[]
    >(
      `/projects/${prjId}/services/AirQuality_1/instances/${instanceId}/historic/data/aggregate`,
      {
        params: {
          start_time: startTime,
          end_time: endTime,
          function: aggFunction,
          periode,
          ...params,
        },
      }
    );
  }
}

export const airQualityClient = new AirQualityClient();

