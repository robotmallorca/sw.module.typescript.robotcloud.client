import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { 
    HistoricAggregateFunction,
    RoomGuestStatus1AlertEventValue,
    ServiceDataMeasurement, 
    ServiceDataRequestParams, 
    ServiceInstanceHistoricAggregateParams, 
    ServiceInstanceHistoricParams, 
    ServiceTypeClient 
} from "../../../types/services";
import { ServiceInstanceDataRequestParams } from "../../../types/RobotCloudClient";
import { RoomGuestStatus1Data } from "../../../types/services-data";
import { RoomGuestStatusConfigurationParams } from "../../../types/services-configuration";

class RoomGuestStatusClient implements ServiceTypeClient<   RoomGuestStatus1AlertEventValue, 
                                                            RoomGuestStatus1Data, 
                                                            RoomGuestStatusConfigurationParams> {

    getAlerts(
        prjId: string,
        params?: ServiceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1AlertEventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1AlertEventValue>[]>(
            `/projects/${prjId}/services/RoomGuestStatus_1/alert`,
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
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1Data>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1Data>[]>(
            `/projects/${prjId}/services/RoomGuestStatus_1/data`,
            { 
              params,
              headers: {
                "Accept": 'application/json'
              }
            }
          )
    }

    getInstanceConfiguration (
        prjId: string,
        instanceId: string
    ): Promise<AxiosResponse<RoomGuestStatusConfigurationParams>> {
        return robotcloudApi.get<RoomGuestStatusConfigurationParams>(
            `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/configuration`
        )
    }

    putInstanceConfiguration (
        prjId: string,
        instanceId: string,
        data: RoomGuestStatusConfigurationParams
    ): Promise<AxiosResponse<RoomGuestStatusConfigurationParams>> {
        return robotcloudApi.put<RoomGuestStatusConfigurationParams>(
            `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/configuration`,
            data
          )
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
                    "Accept": 'application/json'
                }
            }
        )
    }

    getInstanceHistoric(
        prjId: string,
        instanceId: string,
        startTime: Date,
        endTime: Date,
        params: ServiceInstanceHistoricParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1Data>[]>> {
        return new Promise((resolve, reject) => {
            fetch('./mock-historic-guest-status-data-sample.json')
                .then((response) => response.json())
                .then((json) => resolve({
                        data: json
                    } as AxiosResponse)
                );
        })
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
        // return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1Data>[]>(
        //     `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/historic/data/aggregate`, {
        //         params: {
        //             start_time: startTime,
        //             end_time: endTime,
        //             function: aggFunction,
        //             periode,
        //             ...params
        //         }
        //     }
        // )

        return new Promise((resolve, reject) => {
            fetch(`./mock-historic-agg-${periode}-${aggFunction}-guest-status-data-sample.json`)
                .then((response) => response.json())
                .then((json) => resolve({
                        data: json
                    } as AxiosResponse)
                );
        })
    }
}

export const roomGuestStatusClient = new RoomGuestStatusClient()