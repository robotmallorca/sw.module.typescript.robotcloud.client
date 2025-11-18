import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  HistoricAggregateFunction,
  ServiceDataMeasurement,
  ServiceTypeClient,
} from "../../../types/services";
import { RoomConsumes1AlertEventValue } from "../../../types/RobotCloudClient";
import { RoomConsumes1Data } from "../../../types/services-data";
import { GenericInstanceConfigClient } from "./generics";
import {
  ServiceDataRequestParams,
  ServiceInstanceDataRequestParams,
  ServiceInstanceHistoricAggregateParams,
  ServiceInstanceHistoricParams,
} from "../../../types/request-params";

export class RoomConsumesConfigClient extends GenericInstanceConfigClient<any> {
  constructor() {
    super("RoomConsumes_1");
  }
}

class RoomConsumesClient
  implements ServiceTypeClient<RoomConsumes1AlertEventValue, RoomConsumes1Data>
{
  private _configurationClient: RoomConsumesConfigClient;
  get configuration() {
    return this._configurationClient;
  }
  constructor() {
    this._configurationClient = new RoomConsumesConfigClient();
  }
  getAlerts(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<RoomConsumes1AlertEventValue>[]>
  > {
    return robotcloudApi.get<
      ServiceDataMeasurement<RoomConsumes1AlertEventValue>[]
    >(`/projects/${prjId}/services/RoomConsumes_1/alert`, {
      params,
      headers: {
        Accept: "application/json",
      },
    });
  }

  getData(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1Data>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<RoomConsumes1Data>[]>(
      `/projects/${prjId}/services/RoomConsumes_1/data`,
      {
        params,
        headers: {
          Accept: "application/json",
        },
      }
    );
  }

  getInstanceData = (
    prjId: string,
    instanceId: string,
    params?: ServiceInstanceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1Data>>> => {
    return robotcloudApi.get<ServiceDataMeasurement<RoomConsumes1Data>>(
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
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1Data>[]>> {
    return robotcloudApi.get<ServiceDataMeasurement<RoomConsumes1Data>[]>(
      `/projects/${prjId}/services/RoomConsumes_1/instances/${instanceId}/configuration`,
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
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1Data>[]>> {
    throw Error("Not implemented method");
  }
}

export const roomConsumesClient = new RoomConsumesClient();

