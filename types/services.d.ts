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

export interface CoolHeatCons1DataEventValue {
  total_power?: number;
  thermal_power?: number;
  total_energy?: number;
  thermal_energy?: number;
}

export interface CoolHeatCons1AlertEventValue {}

export interface CoolHeatProd1DataEventValue {
  output_temperature?: number;
  return_temperature?: number;
  compressor_power?: number;
  condenser_power?: number;
  transport_power?: number;
  output_power?: number;
  cop_thermal?: number;
  cop_global?: number;
  regime?: "COOL" | "HEAT";
  compressor_energy?: number;
  condenser_energy?: number;
  transport_energy?: number;
  output_energy?: number;
}

export interface CoolHeatProd1AlertEventValue {
  power_consumption_alert: number,
  cop_thermal_alert: number
}

export interface CoolHeatTemperature1DataEventValue {
  input_temperature?: number;
  output_temperature?: number;
}

export interface CoolHeatTemperature1AlertEventValue {

}

export interface EnergyCounter1DataEventValue {
  consumed_energy?: number;
}

export interface EnergyCounter1AlertEventValue {

}

export interface EnergyProduction1DataEventValue {
  energy_delivered?: number;
  energy_received?: number;
  energy_selfconsumption?: number;
  energy_consumed?: number;
  energy_produced?: number;
  power_produced?: number;
  power_consumed?: number;
  power_selfconsumption?: number;
  power_delivered?: number;
  power_received?: number;
}

export interface EnergyProduction1AlertEventValue {
  power_production_alert: boolean;
}

export interface GasCounter1DataEventValue {
  consumed_volume?: number;
}

export interface GasCounter1AlertEventValue {

}

export interface GenericTemperature1DataEventValue {
  temperature?: number;
}

export interface GenericTemperature1AlertEventValue {

}

export interface HeatMeter1DataEventValue {
  temperature_1?: number;
  temperature_2?: number;
  flow?: number;
  volume?: number;
  power?: number;
  heat_energy?: number;
  refrigeration_energy?: number;
}

export interface HeatMeter1AlertEventValue {

}

export interface HeatProduction1DataEventValue {
  output_temperature?: number;
  return_temperature?: number;
  output_power?: number;
  consumed_power?: number;
  efficiency?: number;
  output_energy?: number;
  consumed_energy?: number;
}

export interface HeatProduction1AlertEventValue {
  output_power_alert: boolean;
  efficiency_alert: boolean;
}

export interface OutdoorClime1DataEventValue {
  temperature?: number;
  humidity_relative?: number;
  humidity_absolute?: number;
  enthalpy?: number;
  luminosity?: number;
}

export interface OutdoorClime1AlertEventValue {

}

export interface PowerMeter1DataEventValue {
  power_active?: number;
  power_reactive?: number;
  power_apparent?: number;
  voltage_1_2?: number;
  voltage_2_3?: number;
  voltage_3_1?: number;
  voltage_1?: number;
  voltage_2?: number;
  voltage_3?: number;
  current_1?: number;
  current_2?: number;
  current_3?: number;
  current?: number;
  energy_active?: number;
  energy_reactive?: number;
  energy_apparent?: number;
  energy_active_received?: number;
  energy_reactive_received?: number;
  energy_apparent_received?: number;
  energy_active_delivered?: number;
  energy_reactive_delivered?: number;
  energy_apparent_delivered?: number;
  power_factor?: number;
  power_factor_1?: number;
  power_factor_2?: number;
  power_factor_3?: number;
  frequency?: number;
}

export interface PowerMeter1AlertEventValue {
  power_active_alert: boolean;
  power_active_phase_1_alert: boolean;
  power_active_phase_2_alert: boolean;
  power_active_phase_3_alert: boolean;
  power_reactive_alert: boolean;
  voltage_phase_1_alert: boolean;
  voltage_phase_2_alert: boolean;
  voltage_phase_3_alert: boolean;
  current_phase_1_alert: boolean;
  current_phase_2_alert: boolean;
  current_phase_3_alert: boolean;
  current_phase_1_balance_alert: boolean;
  current_phase_2_balance_alert: boolean;
  current_phase_3_balance_alert: boolean;
  power_factor_alert: boolean;
  power_factor_phase_1_alert: boolean;
  power_factor_phase_2_alert: boolean;
  power_factor_phase_3_alert: boolean;
  frequency_alert: boolean;
}

export interface RoomBlePairing1DataEventValue {
  installation_id?: number;
  pairing_key?: number;
}

export interface RoomBlePairing1AlertEventValue {
  
}

export interface RoomGuestStatus1AlertEventValue {
  door_open_overtime: boolean;
  window_open_overtime: boolean;
  medical_alarm: boolean;
}

export interface RoomDiagnostics1Data {
  peripheral_num?: number;
}

export interface RoomDiagnostics1AlertEventValue {
   low_peripheral_num: boolean;
}


////
// Generic interface  types
////

export type HistoricAggregateFunction =
  | "count"
  | "increase"
  | "pincrease"
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

export interface ServiceInstanceAlertsClient<T> {

  /**
   * Get Alerts for a given project and instance
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

  get(
    prjId: string,
    instanceId: string,
    startTime: Date,
    endTime: Date,
    params: ServiceInstanceHistoricParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<T>[]>>;

  getAggregate(
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
  get alerts(): ServiceInstanceAlertsClient<T_ALERTS>;
  get historic(): ServiceInstanceHistoricClient<T_DATA>;
}