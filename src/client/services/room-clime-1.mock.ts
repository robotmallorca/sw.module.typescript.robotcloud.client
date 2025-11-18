import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { RoomClime1AlertEventValue } from "../../../types/RobotCloudClient";
import {
  ServiceDataMeasurement,
  ServiceTypeClient,
  HistoricAggregateFunction,
} from "../../../types/services";
import { RoomClime1Data } from "../../../types/services-data";
import { RoomClimeConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient } from "./generics";
import {
  ServiceDataRequestParams,
  ServiceInstanceDataRequestParams,
  ServiceInstanceHistoricAggregateParams,
  ServiceInstanceHistoricParams,
} from "../../../types/request-params";

export type RoomClimeAlertsKeys =
  | "high_temperature"
  | "low_temperature"
  | "high_humidity"
  | "fancoil_on_overtime";

export class RoomClimeConfigClient extends GenericInstanceConfigClient<RoomClimeConfigurationParams> {
  constructor() {
    super("RoomClime_1");
  }
}

export class RoomClimeClient
  implements ServiceTypeClient<RoomClime1AlertEventValue, RoomClime1Data>
{
  private _configurationClient: RoomClimeConfigClient;
  get configuration() {
    return this._configurationClient;
  }
  constructor() {
    this._configurationClient = new RoomClimeConfigClient();
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
