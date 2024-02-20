
export type TemperatureUnit = "CELSIUS" | "FAHRENHEIT"
export type RegimState = "COLD"|"HEAT"|"AUTO"

export type ProjectAccessLevel = "BLOCKED" | "RESTRICTED" | "BASIC" | "ADVANCED"
export type AppAccessLevel = "BLOCKED" | "STANDARD" | "ADVANCED" | "ADMIN"

export type RobotCloudServiceType = "RoomClime_1"|"RoomGuestStatus_1"

// Desired fancoil speed (0 = Auto, 1..3 = Manual Speed)
export type FancoilSpeedState = 0|1|2|3;

export interface ProjectRequestParams {

}

export interface ProjectDetailsRequestParams {

}
export interface SubsystemRequestParams {
  subsystem_id?: string;
}

export interface PaginableRequestParams {
  startIndex?: number;
  maxSize?: number;
}

export interface ProjectLocationsRequestParams extends SubsystemRequestParams, PaginableRequestParams {
  tag_id?: string | string[];
}


export interface ServiceInstanceDataRequestParams {

}

export interface ProjectTagRequestParams extends PaginableRequestParams {
  parent_tag?: string;
  no_parent?: boolean;
}

export interface ServiceInstancesRequestParams extends SubsystemRequestParams, PaginableRequestParams {
  id?: string;
  name?: string;
  location_id?: string;
  device_id?: string;
  tag_id?: string[];
}

export interface LocationServiceInstancesRequestParams extends SubsystemRequestParams, PaginableRequestParams {
  tag_id?: string[];
}

export interface RoomClimeInstanceConfigParams {
  temperature_set_point?: number;
  humidity_set_point?: number;
  regim?: RegimState;
  eco_mode?: "STANDBY" | "ECO" | "VIP";
  fancoil_speed?: 0 | 1 | 2 | 3;
  on?: boolean;
  high_temperature_level?: number;
  low_temperature_level?: number;
  high_humidity_level?: number;
  fancoil_on_time_limit?: number;
  temperature_units?: TemperatureUnit;
}


/** RESPONSE **/

export interface RobotCloudNamedItem {
  id: string;
  name: string;
}

export interface RobotCloudProject {
  id: string;
  name: string;
  organization: string;
}

/** USERS */
export interface RobotCloudUserDetails {
    username: string;
    name: string;
    last_name: string;
    email: string;
    org_id: string;
    org_access: number;
}


export interface RobotCloudProjectDetails extends RobotCloudProject {
  version: number;
  description?: string;
  country?: string;
  timezone?: string;
  image_url?: string;
  longitude?: number;
  latitude?: number;
  application_enabled?: boolean;
  access_level?: ProjectAccessLevel;
  app_access_level?: AppAccessLevel;
}

export interface RobotCloudDeviceDetails extends RobotCloudNamedItem {
  description?: string;
  location: string;
  address: {
    domain: number;
    zone: number;
    id: number;
  };
  type: number;
  configuration_type: string;
  tags: string;
}

/** SERVICE EVENTS VALUES **/
export interface RoomClime1AlertEventValue {
  high_temperature: boolean;
  low_temperature: boolean;
  high_humidity: boolean;
  fancoil_on_overtime: boolean;
}
export interface RoomClime1EventValue {
  temperature: number;
  humidity: number;
  fancoil_speed: number;
  fancoil_manual: boolean;
  on: boolean;
  temperature_set_point: number; 
  humidity_set_point: number; 
  regim: RegimState;
  eco_mode: "STANDBY"|"ECO"|"VIP";
}

export interface RoomConsumes1AlertEventValue {
  high_daily_energy_electric: boolean;
  high_daily_energy_thermal: boolean;
  high_daily_hot_water: boolean;
  high_daily_cold_water: boolean;
}

export interface RoomGrouping1DataEventValue {
  replica_1_active: boolean;
  replica_2_active: boolean;
  replica_3_active: boolean;
}

export interface RoomConsumes1DataEventValue {
    energy_electric: number;
    energy_thermal: number;
    hot_water: number;
    cold_water: number;
    daily_energy_electric: number;
    daily_energy_thermal: number;
    daily_hot_water: number;
    daily_cold_water: number;
    daily_co2_footprint: number;
    daily_tree_equivalent: number;
}

/** SERVICE INSTANCES DEVICE CONFIG */
export interface ServiceInstanceDeviceConfig {
  device: string;
}

export interface RoomGrouping1InstanceDeviceConfig {
  Main: ServiceInstanceDeviceConfig;
  Replica_1: ServiceInstanceDeviceConfig;
  Replica_2: ServiceInstanceDeviceConfig;
  Replica_3: ServiceInstanceDeviceConfig;
}