import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  RoomClime1AlertEventValue,
  ServiceInstanceDataRequestParams,
} from "../../../types/RobotCloudClient";
import {
  ServiceDataMeasurement,
  ServiceDataRequestParams,
  ServiceInstanceHistoricParams,
  ServiceTypeClient,
  HistoricAggregateFunction,
  ServiceInstanceHistoricAggregateParams,
} from "../../../types/services";
import { RoomClime1Data } from "../../../types/services-data";
import { RoomClimeConfigurationParams } from "../../../types/services-configuration";
import { GenericAlertStatusClient } from "./generics";


type RoomClimeAlertsKeys =
  | "high_temperature"
  | "low_temperature"
  | "high_humidity"
  | "fancoil_on_overtime";

export class RoomClientAlertStatusClient extends GenericAlertStatusClient<RoomClimeAlertsKeys> {
  constructor() {
    super("RoomClime_1");
  }
}

class RoomClimeClient
  implements
    ServiceTypeClient<
      RoomClime1AlertEventValue,
      RoomClime1Data,
      RoomClimeConfigurationParams
    >
{
  private _alertstatusClient: RoomClientAlertStatusClient;
  get alertStatus() {
    return this._alertstatusClient
  }

  constructor() {
    this._alertstatusClient = new RoomClientAlertStatusClient();
  }

  getAlerts(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<RoomClime1AlertEventValue>[]>
  > {
    return robotcloudApi.get<
      ServiceDataMeasurement<RoomClime1AlertEventValue>[]
    >(`/projects/${prjId}/services/RoomClime_1/alert`, {
      params,
      headers: {
        Accept: "application/json",
      },
    });
  }

  getData(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1Data>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<RoomClime1Data>[]>(
      `/projects/${prjId}/services/RoomClime_1/data`,
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
  ): Promise<AxiosResponse<RoomClimeConfigurationParams>> {
    return robotcloudApi.get<RoomClimeConfigurationParams>(
      `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/configuration`
    );
  }

  putInstanceConfiguration(
    prjId: string,
    instanceId: string,
    data: RoomClimeConfigurationParams
  ): Promise<AxiosResponse<RoomClimeConfigurationParams>> {
    return robotcloudApi.put<RoomClimeConfigurationParams>(
      `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/configuration`,
      data
    );
  }

  getInstanceData(
    prjId: string,
    instanceId: string,
    params?: ServiceInstanceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1Data>>> {
    return robotcloudApi.get<ServiceDataMeasurement<RoomClime1Data>>(
      `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/data`,
      {
        params,
      }
    );
  }

  getInstanceHistoric(
    prjId: string,
    instanceId: string,
    startTime: Date,
    endTime: Date,
    params: ServiceInstanceHistoricParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1Data>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<RoomClime1Data>[]>(
      `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/historic/data`,
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
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1Data>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<RoomClime1Data>[]>(
      `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/historic/data/aggregate`,
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

export const roomClimeClient = new RoomClimeClient();
