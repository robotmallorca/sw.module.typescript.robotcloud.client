import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  HistoricAggregateFunction,
  ServiceDataMeasurement,
  ServiceTypeClient,
} from "../../../types/services";
import {
  RoomGrouping1DataEventValue,
  RoomGrouping1InstanceDeviceConfig,
} from "../../../types/services-data";
import { GenericInstanceConfigClient } from "./generics";
import {
  ServiceDataRequestParams,
  ServiceInstanceDataRequestParams,
  ServiceInstanceHistoricAggregateParams,
  ServiceInstanceHistoricParams,
} from "../../../types/request-params";

export class RoomGroupingConfigClient extends GenericInstanceConfigClient<RoomGrouping1InstanceDeviceConfig> {
  constructor() {
    super("RoomGrouping_1");
  }
}

class RoomGroupingClient
  implements ServiceTypeClient<any, RoomGrouping1DataEventValue>
{
  private _configurationClient: RoomGroupingConfigClient;
  get configuration() {
    return this._configurationClient;
  }
  constructor() {
    this._configurationClient = new RoomGroupingConfigClient();
  }
  getAlerts(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<any>[]>> {
    throw Error("Not implemented method");
  }

  getData(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<RoomGrouping1DataEventValue>[]>
  > {
    return robotcloudApi.get<
      ServiceDataMeasurement<RoomGrouping1DataEventValue>[]
    >(`/projects/${prjId}/services/RoomGrouping_1/data`, {
      params,
      headers: {
        Accept: "application/json",
      },
    });
  }

  getInstanceData = (
    prjId: string,
    instanceId: string,
    params?: ServiceInstanceDataRequestParams
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<RoomGrouping1DataEventValue>>
  > => {
    return robotcloudApi.get<
      ServiceDataMeasurement<RoomGrouping1DataEventValue>
    >(
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
  ): Promise<
    AxiosResponse<ServiceDataMeasurement<RoomGrouping1DataEventValue>[]>
  > {
    throw Error("Not implemented method");
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
    AxiosResponse<ServiceDataMeasurement<RoomGrouping1DataEventValue>[]>
  > {
    throw Error("Not implemented method");
  }
}

export const roomGroupingClient = new RoomGroupingClient();

