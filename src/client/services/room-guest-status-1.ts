import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  HistoricAggregateFunction,
  RoomGuestStatus1AlertEventValue,
  ServiceDataMeasurement,
  ServiceTypeClient,
} from "../../../types/services";
import { RoomGuestStatus1Data } from "../../../types/services-data";
import { RoomGuestStatusConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient } from "./generics";
import {
  ServiceDataRequestParams,
  ServiceInstanceDataRequestParams,
  ServiceInstanceHistoricAggregateParams,
  ServiceInstanceHistoricParams,
} from "../../../types/request-params";

export class RoomGuestStatusConfigClient extends GenericInstanceConfigClient<RoomGuestStatusConfigurationParams> {
  constructor() {
    super("RoomGuestStatus_1");
  }
}

class RoomGuestStatusClient
  implements
    ServiceTypeClient<RoomGuestStatus1AlertEventValue, RoomGuestStatus1Data>
{
  private _configurationClient: RoomGuestStatusConfigClient;
  get configuration() {
    return this._configurationClient;
  }
  constructor() {
    this._configurationClient = new RoomGuestStatusConfigClient();
  }
  getAlerts(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1AlertEventValue>[]>
  > {
    return robotcloudApi.get<
      ServiceDataMeasurement<RoomGuestStatus1AlertEventValue>[]
    >(`/projects/${prjId}/services/RoomGuestStatus_1/alert`, {
      params,
      headers: {
        Accept: "application/json",
      },
    });
  }

  getData(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1Data>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1Data>[]>(
      `/projects/${prjId}/services/RoomGuestStatus_1/data`,
      {
        params,
        headers: {
          Accept: "application/json",
        },
      }
    );
  }

  getInstanceConfiguration(
    prjId: string,
    instanceId: string
  ): Promise<AxiosResponse<RoomGuestStatusConfigurationParams>> {
    return robotcloudApi.get<RoomGuestStatusConfigurationParams>(
      `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/configuration`
    );
  }

  putInstanceConfiguration(
    prjId: string,
    instanceId: string,
    data: RoomGuestStatusConfigurationParams
  ): Promise<AxiosResponse<RoomGuestStatusConfigurationParams>> {
    return robotcloudApi.put<RoomGuestStatusConfigurationParams>(
      `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/configuration`,
      data
    );
  }

  getInstanceData = (
    prjId: string,
    instanceId: string,
    params?: ServiceInstanceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1Data>>> => {
    return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1Data>>(
      `/projects/${prjId}/services/RoomConsumes_1/instances/${instanceId}/data`,
      {
        params,
        headers: {
          Accept: "application/json",
        },
      }
    );
  };

  getInstanceHistoric(
    prjId: string,
    instanceId: string,
    startTime: Date,
    endTime: Date,
    params: ServiceInstanceHistoricParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1Data>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1Data>[]>(
      `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/historic/data`,
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
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1Data>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1Data>[]>(
      `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/historic/data/aggregate`,
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

export const roomGuestStatusClient = new RoomGuestStatusClient();

