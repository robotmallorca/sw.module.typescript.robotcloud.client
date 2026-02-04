import { RegimState, TemperatureUnit } from "./RobotCloudClient";

export interface AirQualityConfigurationParams {
  high_co2_limit: number;
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