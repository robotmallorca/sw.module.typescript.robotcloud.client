import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { 
    HistoricAggregateFunction, ServiceDataMeasurement, ServiceDataRequestParams, 
    ServiceInstanceHistoricAggregateParams, ServiceInstanceHistoricParams, 
    ServiceTypeClient 
} from "../../../types/services";
import { 
    RoomConsumes1AlertEventValue, RoomConsumes1DataEventValue, ServiceInstanceDataRequestParams 
} from "../../../types/RobotCloudClient";

class RoomConsumesClient implements ServiceTypeClient<RoomConsumes1AlertEventValue, 
                                                    RoomConsumes1DataEventValue,
                                                    any> {

    getAlerts(
        prjId: string,
        params?: ServiceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1AlertEventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomConsumes1AlertEventValue>[]>(
            `/projects/${prjId}/services/RoomConsumes_1/alert`,
            { 
              params,
              headers: {
                "Accept": 'application/json'
              }
            }
          )
    }

    getData (
        prjId: string,
        params?: ServiceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1DataEventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomConsumes1DataEventValue>[]>(
            `/projects/${prjId}/services/RoomConsumes_1/data`,
            { 
              params,
              headers: {
                "Accept": 'application/json'
              }
            }
          )
    }

    getInstanceData = (
        prjId: string,
        instanceId: string,
        params?: ServiceInstanceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1DataEventValue>>> => {
        return robotcloudApi.get<ServiceDataMeasurement<RoomConsumes1DataEventValue>>(
            `/projects/${prjId}/services/RoomConsumes_1/instances/${instanceId}/data`,
            { 
                params,
                headers: {
                    "Accept": 'application/json'
                }
            }
        )
    }

    getInstanceConfiguration<T> (
        prjId: string,
        instanceId: string
    ): Promise<AxiosResponse<T>> {
        throw Error("Not implemented method")
    }

    putInstanceConfiguration<T> (
        prjId: string,
        instanceId: string,
        data: T
    ): Promise<AxiosResponse<T>> {
        throw Error("Not implemented method")
    }

    getInstanceHistoric(
        prjId: string,
        instanceId: string,
        startTime: Date,
        endTime: Date,
        params: ServiceInstanceHistoricParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1DataEventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomConsumes1DataEventValue>[]>(
            `/projects/${prjId}/services/RoomConsumes_1/instances/${instanceId}/configuration`, {
                params: {
                    start_time: startTime,
                    end_time: endTime,
                    ...params
                }
            }
        )
    }

    getInstanceHistoricAggregate(
        prjId: string,
        instanceId: string,
        startTime: Date,
        endTime: Date,
        aggFunction: HistoricAggregateFunction,
        periode: string,
        params: ServiceInstanceHistoricAggregateParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1DataEventValue>[]>> {
        throw Error("Not implemented method")
    }
}


export const roomConsumesClient = new RoomConsumesClient()