import { AxiosResponse } from "axios";
import { ServiceInstanceRead } from "./ServiceInstanceRead";
import { ServiceInstanceDataRequestParams, SubsystemRequestParams } from "./RobotCloudClient";

export type MeasurementStatus =  "GOOD"|"NOT_MEASURED"|"INVALID_VALUE"|"DEVICE_ERROR";

export interface ServiceDataMeasurement<T> extends ServiceInstanceRead<T> {
    status: MeasurementStatus;
}

export interface ServiceDataRequestParams extends SubsystemRequestParams {
    tag_id?: string | string[];
}
export interface ServiceInstanceHistoricAggregateParams {
    offset?: string;
    property?: any[];
    maxSize?: number;
} 
export interface ServiceInstanceHistoricParams {
    status?: MeasurementStatus;
    property?: any[];
    maxSize?: number;
} 

export interface AirQuality1DataEventValue {
    co2: number;
}

export interface AirQuality1AlertEventValue {
    high_co2: boolean;
}


export interface RoomGuestStatus1AlertEventValue {
    door_open_overtime: boolean;
    window_open_overtime: boolean;
    medical_alarm: boolean;
}

export interface RoomGuestStatus1EventValue {
    sold: boolean;
    occupied: boolean;
    do_not_disturb: boolean;
    make_up_room: boolean;
    tray_status: "IDLE"|'READY'|'FINISH';
    remote_occupation: boolean;
    door_open: boolean;
    window_open: boolean;
    medical_alarm: boolean; // TODO: ???
}

export interface RoomGuestStatusInstanceConfigParams {
    sold?: boolean;
    do_not_disturb?: boolean;
    make_up_room?: boolean;
    remote_occupation?: boolean;
    door_open_time_limit?: number;
    window_open_time_limit?: number;
    medical_alarm?: boolean;
}


////
// Generic interface  types
////

export type HistoricAggregateFunction = "count"|"increase"|"mean"|"first"|"last"|"max"|"min"|"amax"|"amin"|"pmax"|"pmin"|"nmax"|"nmin";

export interface ServiceTypeClient<T_ALERTS, T_DATA, T_CONFIG> {
    getAlerts(
        prjId: string,
        params?: ServiceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<T_ALERTS>[]>>;

    getData (
        prjId: string,
        params?: ServiceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<T_DATA>[]>>;

    getInstanceConfiguration (
        prjId: string,
        instanceId: string
    ): Promise<AxiosResponse<T_CONFIG>>;

    putInstanceConfiguration (
        prjId: string,
        instanceId: string,
        data: T_CONFIG
    ): Promise<AxiosResponse<T_CONFIG>>;

    getInstanceData (
        prjId: string,
        instanceId: string,
        params?: ServiceInstanceDataRequestParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<T_DATA>>>;

    getInstanceHistoric (
        prjId: string,
        instanceId: string,
        startTime: Date,
        endTime: Date,
        params: ServiceInstanceHistoricParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<T_DATA>[]>>;

    getInstanceHistoricAggregate(
        prjId: string,
        instanceId: string,
        startTime: Date,
        endTime: Date,
        aggFunction: HistoricAggregateFunction,
        periode: string,
        params: ServiceInstanceHistoricAggregateParams
    ): Promise<AxiosResponse<ServiceDataMeasurement<T_DATA>[]>>;
}