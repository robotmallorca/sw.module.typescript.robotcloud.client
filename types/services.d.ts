import { AxiosResponse } from "axios";
import { ServiceInstanceRead } from "./ServiceInstanceRead";
import { ServiceDataRequestParams, ServiceInstanceDataRequestParams, ServiceInstanceHistoricAggregateParams, ServiceInstanceHistoricParams } from "./request-params";


export type MeasurementStatus =
  | "GOOD"
  | "NOT_MEASURED"
  | "INVALID_VALUE"
  | "DEVICE_ERROR";

export interface ServiceDataMeasurement<T> extends ServiceInstanceRead<T> {
  status: MeasurementStatus;
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


////
// Generic interface  types
////

export type HistoricAggregateFunction =
  | "count"
  | "increase"
  | "mean"
  | "first"
  | "last"
  | "max"
  | "min"
  | "amax"
  | "amin"
  | "pmax"
  | "pmin"
  | "nmax"
  | "nmin";


export interface ServiceInstanceConfigClient<T> {
  get(project_id: string, instance_id: string): Promise<AxiosResponse<T>>;
  put(project_id: string, instance_id: string, configuration: T): Promise<AxiosResponse<T>>;
}

export interface ServiceInstanceDataClient<T> {

  /**
   * Get data for a given project and instance
   * @param prjId - The project ID
   * @param instanceId - The instance ID
   * @param params - The request parameters
   * @returns A promise that resolves to the data
   */
  get(prjId: string, instanceId: string, params?: ServiceInstanceDataRequestParams): Promise<AxiosResponse<ServiceDataMeasurement<T>>>;

  /**
   * Get all data for a given project and service
   * @param prjId - The project ID
   * @param params - The request parameters
   * @returns A promise that resolves to the data
   */
  getAll(prjId: string, params?: ServiceDataRequestParams): Promise<AxiosResponse<ServiceDataMeasurement<T>[]>>;
}

export interface ServiceTypeClient<T_ALERTS, T_DATA> {
  get data(): ServiceInstanceDataClient<T_DATA>;
  get configuration(): ServiceInstanceConfigClient<any>;

  getAlerts(
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T_ALERTS>[]>>;

  getInstanceHistoric(
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
