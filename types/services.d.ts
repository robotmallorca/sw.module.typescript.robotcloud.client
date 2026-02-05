import { AxiosResponse } from "axios";
import { ServiceInstanceRead } from "./ServiceInstanceRead";
import { ServiceDataRequestParams, ServiceInstanceDataRequestParams, ServiceAlertRequestParams, ServiceInstanceAlertRequestParams, ServiceInstanceHistoricAggregateParams, ServiceInstanceHistoricParams } from "./request-params";


export type MeasurementStatus =
  | "GOOD"
  | "NOT_MEASURED"
  | "INVALID_VALUE"
  | "DEVICE_ERROR";

export interface ServiceDataMeasurement<T> extends ServiceInstanceRead<T> {
  status: MeasurementStatus;
}
export interface AirHandlingUnit1AlertEventValue {
  alarm_1: boolean,
  alarm_2: boolean,
  alarm_3: boolean,
  alarm_4: boolean,
  alarm_general: boolean
}

export interface AirHandlingUnit1DataEventValue {
  cool_heat_state?: "COOL" | "HEAT" | "AUTO",
  cool_heat_valve_state?: number,
  heat_valve_state?: number,
  impulsion_fan_speed?: number,
  impulsion_fan_state?: boolean,
  impulsion_flow?: number,
  impulsion_set_point?: number,
  impulsion_temperature?: number,
  on?: boolean,
  outdoor_air_damper_state?: number,
  return_ambient_air_quality?: number,
  return_ambient_co2?: number,
  return_ambient_enthalpy?: number,
  return_ambient_humidity?: number,
  return_ambient_temperature?: number,
  return_fan_speed?: number,
  return_fan_state?: boolean,
  return_flow?: number
}

export interface AirQuality1DataEventValue {
  co2: number;
}

export interface AirQuality1AlertEventValue {
  high_co2: boolean;
}

export interface ChillerHeatingPump1DataEventValue {
  COP?: number,
  capacity?: number,
  compressor_state?: number,
  condenser_impulsion_temperature?: number,
  condenser_return_temperature?: number,
  expansion_valve_position?: number,
  flow_state?: boolean,
  impulsion_temperature?: number,
  max_capacity?: number,
  on?: boolean,
  recovery_impulsion_temperature?: number,
  recovery_return_temperature?: number,
  recovery_state?: boolean,
  regim?: "COOL" | "HEAT" | "AUTO" | "FROST",
  remote_state?: boolean,
  return_temperature?: number
}

export interface ChillerHeatingPump1AlertEventValue {
  alarm_1?: boolean;
  alarm_2?: boolean;
  alarm_3?: boolean;
  alarm_4?: boolean;
  alarm_5?: boolean;
  alarm_6?: boolean;
  alarm_7?: boolean;
  alarm_8?: boolean;
  alarm_9?: boolean;
  alarm_10?: boolean;
  alarm_general?: boolean;
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

export interface ServiceInstanceAlertClient<T> {

  /**
   * Get Alert for a given project and instance
   * @param prjId - The project ID
   * @param instanceId - The instance ID
   * @param params - The request parameters
   * @returns A promise that resolves to the data
   */
  get(prjId: string, instanceId: string, params?: ServiceInstanceAlertRequestParams): Promise<AxiosResponse<ServiceDataMeasurement<T>>>;

  /**
   * Get all alerts for a given project and service
   * @param prjId - The project ID
   * @param params - The request parameters
   * @returns A promise that resolves to the data
   */
  getAll(prjId: string, params?: ServiceAlertRequestParams): Promise<AxiosResponse<ServiceDataMeasurement<T>[]>>;
}

export interface ServiceInstanceHistoricClient<T> {

  getInstanceHistoric(
    prjId: string,
    instanceId: string,
    startTime: Date,
    endTime: Date,
    params: ServiceInstanceHistoricParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T>[]>>;

  getInstanceHistoricAggregate(
    prjId: string,
    instanceId: string,
    startTime: Date,
    endTime: Date,
    aggFunction: HistoricAggregateFunction,
    periode: string,
    params: ServiceInstanceHistoricAggregateParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T>[]>>;
}


export interface ServiceTypeClient<T_DATA, T_ALERTS, T_CONFIG> {
  get configuration(): ServiceInstanceConfigClient<T_CONFIG>;
  get data(): ServiceInstanceDataClient<T_DATA>;
  get alert(): ServiceInstanceAlertClient<T_ALERTS>;
  get historic(): ServiceInstanceHistoricClient<T_DATA>;
}