import { RegimState, TemperatureUnit } from "./RobotCloudClient";

export interface AirHandlingUnitConfigurationParams {
  air_quality_co2_set_point?: number,
  cool_heat_order?: "COOL" | "HEAT" | "AUTO";
  conf_on?: boolean,
  humidity_set_point?: number,
  impulsion_hysteresis?: number,
  pressure_set_point?: number,
  temperature_set_point?: number
}

export interface AirQualityConfigurationParams {
  high_co2_limit?: number;
}

export interface ChillerHeatingPumpConfigurationParams {
  conf_max_capacity: number,
  conf_on: boolean,
  conf_recovery_state: boolean,
  conf_regim: "COOL" | "HEAT" | "AUTO" | "FROST",
  cool_set_point: number,
  frost_set_point: number,
  heat_set_point: number,
  recovery_set_point: number
}

export interface CoolHeatConsConfigurationParams { }

export interface CoolHeatProdConfigurationParams {
  power_consumption_limit: number,
  cop_thermal_limit: number
}

export interface CoolHeatTemperatureConfigurationParams { }

export interface EnergyCounterConfigurationParams {
  
}

export interface RoomClimeConfigurationParams {
  temperature_set_point?: number;
  humidity_set_point?: number;
  regim?: RegimState;
  eco_mode?: "STANDBY" | "ECO" | "VIP";
  fancoil_speed?: 0 | 1 | 2 | 3;
  on?: boolean;

  hasFC?: boolean;
  hasRF?: boolean;
  isRFLinked?: boolean;

  onRF?: boolean;

  high_temperature_level?: number;
  low_temperature_level?: number;
  high_humidity_level?: number;
  fancoil_on_time_limit?: number;
  temperature_units?: TemperatureUnit;
}

export interface RoomGuestStatusConfigurationParams {
  sold?: boolean;
  vip?: boolean;
  do_not_disturb?: boolean;
  make_up_room?: boolean;
  remote_occupation?: boolean;
  door_open_time_limit?: number;
  window_open_time_limit?: number;
  medical_alarm?: boolean;
}


export interface RoomGroupingConfigurationParams {
  replica_1_active?: boolean;
  replica_2_active?: boolean;
  replica_3_active?: boolean;
  associate_clime?: boolean;
  associate_presence?: boolean;
}

export interface RoomConsumesConfigurationParams {
  daily_energy_electric_limit: number;
  daily_energy_thermal_limit: number;
  daily_hot_water_limit: number;
  daily_cold_water_limit: number;
  co2_electric_coefficient: number;
  co2_thermal_coefficient: number;
}