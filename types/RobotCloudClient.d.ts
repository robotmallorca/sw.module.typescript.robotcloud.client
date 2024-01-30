type TemperatureUnit = "CELSIUS" | "FAHRENHEIT"
type RegimState = "COLD"|"HEAT"|"AUTO"

type ProjectAccessLevel = "BLOCKED" | "RESTRICTED" | "BASIC" | "ADVANCED"
type AppAccessLevel = "BLOCKED" | "STANDARD" | "ADVANCED" | "ADMIN"

type RobotCloudServiceType = "RoomClime_1"|"RoomGuestStatus_1"

interface ProjectRequestParams {

}

interface ProjectDetailsRequestParams {

}
interface SubsystemRequestParams {
  subsystem_id?: string;
}

interface PaginableRequestParams {
  startIndex?: number;
  maxSize?: number;
}

interface ProjectLocationsRequestParams extends SubsystemRequestParams, PaginableRequestParams {
  tag_id?: string | string[];
}

interface ServiceDataRequestParams extends SubsystemRequestParams {
  tag_id?: string | string[];
}

interface ProjectTagRequestParams extends PaginableRequestParams {
  parent_tag?: string;
  no_parent?: boolean;
}

interface ServiceInstancesRequestParams extends SubsystemRequestParams, PaginableRequestParams {
  id?: string;
  name?: string;
  location_id?: string;
  device_id?: string;
  tag_id?: string[];
}

interface LocationServiceInstancesRequestParams extends SubsystemRequestParams, PaginableRequestParams {
  tag_id?: string[];
}

interface RoomClimeInstanceConfigParams {
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

interface RoomGuestStatusInstanceConfigParams {
  sold?: boolean;
  do_not_disturb?: boolean;
  make_up_room?: boolean;
  remote_occupation?: boolean;
  door_open_time_limit?: number;
  window_open_time_limit?: number;
  medical_alarm?: boolean;
}


/** RESPONSE **/

interface RobotCloudNamedItem {
  id: string;
  name: string;
}

interface RobotCloudProject {
  id: string;
  name: string;
  organization: string;
}

/** USERS */
interface RobotCloudUserDetails {
    username: string;
    name: string;
    last_name: string;
    email: string;
    org_id: string;
    org_access: number;
}


interface RobotCloudProjectDetails extends RobotCloudProject {
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

interface RobotCloudDeviceDetails extends RobotCloudNamedItem {
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
interface RoomClime1AlertEventValue {
  high_temperature: boolean;
  low_temperature: boolean;
  high_humidity: boolean;
  fancoil_on_overtime: boolean;
}
interface RoomClime1EventValue {
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
interface RoomGuestStatus1AlertEventValue {
  door_open_overtime: boolean;
  window_open_overtime: boolean;
  medical_alarm: boolean;
}
interface RoomGuestStatus1EventValue {
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
interface AirQuality1DataEventValue {
  co2: number;
}
interface AirQuality1AlertEventValue {
  high_co2: boolean;
}
interface RoomConsumes1AlertEventValue {
  high_daily_energy_electric: boolean;
  high_daily_energy_thermal: boolean;
  high_daily_hot_water: boolean;
  high_daily_cold_water: boolean;
}

interface RoomGrouping1DataEventValue {
  replica_1_active: boolean;
  replica_2_active: boolean;
  replica_3_active: boolean;
}

interface RoomConsumes1DataEventValue {
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
interface ServiceInstanceDeviceConfig {
  device: string;
}

interface RoomGrouping1InstanceDeviceConfig {
  Main: ServiceInstanceDeviceConfig;
  Replica_1: ServiceInstanceDeviceConfig;
  Replica_2: ServiceInstanceDeviceConfig;
  Replica_3: ServiceInstanceDeviceConfig;
}