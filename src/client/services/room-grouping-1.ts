import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  HistoricAggregateFunction,
  ServiceDataMeasurement,
  ServiceDataRequestParams,
  ServiceInstanceHistoricAggregateParams,
  ServiceInstanceHistoricParams,
  ServiceTypeClient,
} from "../../../types/services";
import { ServiceInstanceDataRequestParams } from "../../../types/RobotCloudClient";
import {
  RoomGrouping1DataEventValue,
  RoomGrouping1InstanceDeviceConfig,
} from "../../../types/services-data";

class RoomGroupingClient
  implements
    ServiceTypeClient<
      any,
      RoomGrouping1DataEventValue,
      RoomGrouping1InstanceDeviceConfig
    >
{
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

  getInstanceConfiguration(
    prjId: string,
    instanceId: string
  ): Promise<AxiosResponse<RoomGrouping1InstanceDeviceConfig>> {
    return robotcloudApi.get<RoomGrouping1InstanceDeviceConfig>(
      `/projects/${prjId}/services/RoomGrouping_1/instances/${instanceId}/configuration`
    );
  }

  putInstanceConfiguration(
    prjId: string,
    instanceId: string,
    data: RoomGrouping1InstanceDeviceConfig
  ): Promise<AxiosResponse<RoomGrouping1InstanceDeviceConfig>> {
    return robotcloudApi.put<RoomGrouping1InstanceDeviceConfig>(
      `/projects/${prjId}/services/RoomGrouping_1/instances/${instanceId}/configuration`
    );
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
