import { RegimState, TemperatureUnit } from "./RobotCloudClient";

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