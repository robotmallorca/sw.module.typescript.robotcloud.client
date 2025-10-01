export type TemperatureUnit = "CELSIUS" | "FAHRENHEIT"
export type RegimState = "COLD"|"HEAT"|"AUTO"

export type OrganizationAccessLevel = "STAFF" | "STANDARD" | "ADMIN" | "SUPERUSER" | "MASTER"
export type ProjectAccessLevel = "BLOCKED" | "RESTRICTED" | "BASIC" | "ADVANCED"
export type AppAccessLevel = "BLOCKED" | "STANDARD" | "ADVANCED" | "ADMIN"

export type RobotCloudServiceType = "RoomClime_1"|"RoomGuestStatus_1"|"AirQuality_1"

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


export interface LocationServiceInstancesRequestParams extends SubsystemRequestParams, PaginableRequestParams {
  tag_id?: string[];
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
export interface RobotCloudUserAppAccess {
    app_id: string;
    app_name: string;
    access_level: AppAccessLevel;
}

export interface RobotCloudUserDetails {
    username: string;
    name: string;
    last_name: string;
    email: string;
    org_id: string;
    org_access: OrganizationAccessLevel;
    default_project_access: ProjectAccessLevel;
    default_app_access: RobotCloudUserAppAccess[];
    access_all_projects: boolean;
    blocked: boolean;
}

export interface RobotCloudUserProject {
    project_id: string;
    project_name: string;
    access_level: ProjectAccessLevel;
    app_access_level: {app_id: string, app_name: string, access_level: AppAccessLevel}[]
}

export interface RobotCloudOrganizationDetails extends RobotCloudNamedItem {
    description?: string;
    address?: string;
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

export interface RobotCloudServiceTypeDetails {
    description: string;
    name: RobotCloudServiceType
}
/** SERVICE EVENTS VALUES **/
export interface RoomClime1AlertEventValue {
  high_temperature: boolean;
  low_temperature: boolean;
  high_humidity: boolean;
  fancoil_on_overtime: boolean;
}

export interface RoomConsumes1AlertEventValue {
  high_daily_energy_electric: boolean;
  high_daily_energy_thermal: boolean;
  high_daily_hot_water: boolean;
  high_daily_cold_water: boolean;
}
