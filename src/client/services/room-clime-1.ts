import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { 
    RoomClime1AlertEventValue, RoomClime1EventValue, RoomClimeInstanceConfigParams 
} from "../../../types/RobotCloudClient";
import { 
    ServiceDataMeasurement, ServiceDataRequestParams, ServiceInstanceHistoricParams, ServiceTypeClient,
    HistoricAggregateFunction,
    ServiceInstanceHistoricAggregateParams
} from "../../../types/services";


class RoomClimeClient implements ServiceTypeClient< RoomClime1AlertEventValue, 
                                                    RoomClime1EventValue, 
                                                    RoomClimeInstanceConfigParams> {

    getAlerts(
        prjId: string,
        params?: ServiceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1AlertEventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomClime1AlertEventValue>[]>(
            `/projects/${prjId}/services/RoomClime_1/alert`,
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
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1EventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomClime1EventValue>[]>(
            `/projects/${prjId}/services/RoomClime_1/data`,
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
    ): Promise<AxiosResponse<RoomClimeInstanceConfigParams>> {
        return robotcloudApi.get<RoomClimeInstanceConfigParams>(
            `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/configuration`
        )
    }

    putInstanceConfiguration (
        prjId: string,
        instanceId: string,
        data: RoomClimeInstanceConfigParams
    ): Promise<AxiosResponse<RoomClimeInstanceConfigParams>> {
        return robotcloudApi.put<RoomClimeInstanceConfigParams>(
            `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/configuration`,
            data
        )
    }

    getInstanceHistoric(
        prjId: string,
        instanceId: string,
        startTime: Date,
        endTime: Date,
        params: ServiceInstanceHistoricParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1EventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomClime1EventValue>[]>(
            `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/historic/data`, {
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
    ): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1EventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<RoomClime1EventValue>[]>(
            `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/historic/data/aggregate`, {
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


export const roomClimeClient = new RoomClimeClient()