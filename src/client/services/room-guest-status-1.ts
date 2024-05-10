import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { 
    HistoricAggregateFunction,
    RoomGuestStatus1AlertEventValue,
    RoomGuestStatus1EventValue,
    RoomGuestStatusInstanceConfigParams,
    ServiceDataMeasurement, 
    ServiceDataRequestParams, 
    ServiceInstanceHistoricAggregateParams, 
    ServiceInstanceHistoricParams, 
    ServiceTypeClient 
} from "../../../types/services";
import { ServiceInstanceDataRequestParams } from "../../../types/RobotCloudClient";

class RoomGuestStatusClient implements ServiceTypeClient<   RoomGuestStatus1AlertEventValue, 
                                                            RoomGuestStatus1EventValue, 
                                                            RoomGuestStatusInstanceConfigParams> {

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
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1EventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1EventValue>[]>(
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
    ): Promise<AxiosResponse<RoomGuestStatusInstanceConfigParams>> {
        return robotcloudApi.get<RoomGuestStatusInstanceConfigParams>(
            `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/configuration`
        )
    }

    putInstanceConfiguration (
        prjId: string,
        instanceId: string,
        data: RoomGuestStatusInstanceConfigParams
    ): Promise<AxiosResponse<RoomGuestStatusInstanceConfigParams>> {
        return robotcloudApi.put<RoomGuestStatusInstanceConfigParams>(
            `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/configuration`,
            data
          )
    }

    getInstanceData = (
        prjId: string,
        instanceId: string,
        params?: ServiceInstanceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1EventValue>>> => {
        return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1EventValue>>(
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
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1EventValue>[]>> {
        // return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1EventValue>[]>(
        //     `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/historic/data`, {
        //         params: {
        //             start_time: startTime,
        //             end_time: endTime,
        //             ...params
        //         }
        //     }
        // )
        return new Promise((resolve, reject) => {
            fetch('./historic-guest-status-data-sample.json')
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
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1EventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1EventValue>[]>(
            `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/historic/data/aggregate`, {
                params: {
                    start_time: startTime,
                    end_time: endTime,
                    function: aggFunction,
                    periode,
                    ...params
                }
            }
        )
    }
}

export const roomGuestStatusClient = new RoomGuestStatusClient()