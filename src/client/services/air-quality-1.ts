import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { 
    AirQuality1AlertEventValue, AirQuality1DataEventValue, HistoricAggregateFunction, ServiceDataMeasurement, 
    ServiceDataRequestParams, 
    ServiceInstanceHistoricAggregateParams, 
    ServiceInstanceHistoricParams, 
    ServiceTypeClient 
} from "../../../types/services";

class AirQualityClient implements ServiceTypeClient<AirQuality1AlertEventValue, 
                                                    AirQuality1DataEventValue,
                                                    any> {

    getAlerts(
        prjId: string,
        params?: ServiceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<AirQuality1AlertEventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<AirQuality1AlertEventValue>[]>(
            `/projects/${prjId}/services/AirQuality_1/alert`,
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
    ): Promise<AxiosResponse<ServiceDataMeasurement<AirQuality1DataEventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<AirQuality1DataEventValue>[]>(
            `/projects/${prjId}/services/AirQuality_1/data`,
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
    ): Promise<AxiosResponse<ServiceDataMeasurement<AirQuality1DataEventValue>[]>> {
        return robotcloudApi.get<ServiceDataMeasurement<AirQuality1DataEventValue>[]>(
            `/projects/${prjId}/services/AirQuality_1/instances/${instanceId}/configuration`, {
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
    ): Promise<AxiosResponse<ServiceDataMeasurement<AirQuality1DataEventValue>[]>> {
        throw Error("Not implemented method")
    }
}


export const airQualityClient = new AirQualityClient()