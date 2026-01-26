export type TemperatureUnit = "CELSIUS" | "FAHRENHEIT"
export type RegimState = "COLD" | "HEAT" | "AUTO"

export type OrganizationAccessLevel = "STAFF" | "STANDARD" | "ADMIN" | "SUPERUSER" | "MASTER"
export type ProjectAccessLevel = "BLOCKED" | "RESTRICTED" | "BASIC" | "ADVANCED"
export type AppAccessLevel = "BLOCKED" | "STANDARD" | "ADVANCED" | "ADMIN"

export type RobotCloudServiceType = "PowerMeter_1" | "CoolHeatProd_1" | "HeatProd_1" | "CoolHeatCons_1" | "OutdoorClime_1" | "WaterCounter_1" | "RoomClime_1" | "RoomGuestStatus_1" | "EnergyProduction_1" | "RoomConsumes_1" | "EnergyCounter_1" | "HeatMeter_1" | "TemporizedOutput_1" | "GasCounter_1" | "ChillerHeatingPump_1" | "AirHandlingUnit_1" | "AirQuality_1" | "RoomDiagnostics_1" | "RoomBLEPairing_1" | "RoomGrouping_1" | "GenericTemperature_1" | "CoolHeatTemperature_1"


// Desired fancoil speed (0 = Auto, 1..3 = Manual Speed)
export type FancoilSpeedState = 0 | 1 | 2 | 3;


/** RESPONSE **/

export interface RobotCloudNamedItem {
  id: string;
  name: string;
}
export interface RobotCloudDescribedItem extends RobotCloudNamedItem {
  description?: string;
}
export interface RobotCloudProject {
  id: string;
  name: string;
  organization: string;
}

export interface RobotCloudDelete {
  deleted_id: string
}

export interface RobotCloudCreateProject {
  name: string
  description?: string
  country?: string
  timezone?: string
  longitude?: number
  latitude?: number
  image_url?: string
}
/** APPLICATIONS */
export interface RobotCloudCreateApplication extends RobotCloudDescribedItem{
  access_level: ProjectAccessLevel;
  api_key: string
  create_time?: string
  create_user?: string
  update_time?: string
  update_user?: string
}

export interface RobotCloudGetApplication extends RobotCloudDescribedItem{
  access_level?: ProjectAccessLevel;
  create_time?: string
  create_user?: string
  update_time?: string
  update_user?: string
}

export interface RobotCloudPutApplication extends RobotCloudDescribedItem{
  access_level?: ProjectAccessLevel;
  create_time?: string
  create_user?: string
  update_time?: string
  update_user?: string
}

/** ORGANIZATIONS */
export interface RobotCloudCreateOrganization {
  name: string
  description: string
  address: string
}

export interface RobotCloudPutOrganization {
  name?: string
  description?: string
  address?: string
}

export interface RobotCloudOrganizationDetails extends RobotCloudDescribedItem {
  address: string;
}

export interface RobotCloudOrganizations extends RobotCloudNamedItem {
}

export interface RobotCloudOrganizationUsers {
  username: string
  name: string
  last_name: string
  email?: string
  external?: boolean
}

export interface RobotCloudOrganizationCreateUser {
  username: string;
  password: string;
  name: string;
  last_name: string;
  email?: string;
  org_access: OrganizationAccessLevel;
  default_project_access: ProjectAccessLevel;
  default_app_access?: RobotCloudUserAppAccess[];
  access_all_projects?: boolean;
  blocked?: boolean;
}

/** USERS */
export interface RobotCloudUserAppAccess {
  app_id: string;
  app_name: string;
  access_level: AppAccessLevel;
}

export interface RobotCloudUserSimple {
  username: string;
  name: string;
  last_name: string;
}

export interface RobotCloudUserOrganization extends RobotCloudNamedItem {
}

export interface RobotCloudUsers {
  username: string;
  name: string;
  last_name: string;
  email?: string;
  external?: boolean;
}

export interface RobotCloudUserDetails {
  username: string;
  name: string;
  last_name: string;
  email?: string;
  org_id: string;
  org_access: OrganizationAccessLevel;
  default_project_access: ProjectAccessLevel;
  default_app_access?: RobotCloudUserAppAccess[];
  access_all_projects?: boolean;
  blocked?: boolean;
}

export interface RobotCloudPutUserDetails {
  password?: string;
  name?: string;
  last_name?: string;
  email?: string;
  org_id?: string;
  org_access?: OrganizationAccessLevel;
  default_project_access?: ProjectAccessLevel;
  default_app_access?: RobotCloudUserAppAccess[];
  access_all_projects?: boolean;
  blocked?: boolean;
}

export interface RobotCloudCreateUser extends RobotCloudUserDetails {
  password?: string
}

export interface RobotCloudUserProject {
  project_id: string;
  project_name: string;
  access_level: ProjectAccessLevel;
  app_access_level?: { app_id: string, app_name: string, access_level: AppAccessLevel }[]
}

export interface RobotCloudPostUserProject {
  project_id: string;
  access_level: ProjectAccessLevel;
  app_access_level?: { app_id: string, app_name: string, access_level: AppAccessLevel }[]
}

export interface RobotCloudPutProjectUser {
  access_level: ProjectAccessLevel;
  app_access_level?: { app_id: string, app_name: string, access_level: AppAccessLevel }[]
}

/** PROJECTS */
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

export interface RobotCloudPutProject {
  name?: string
  description?: string
  organization?: string
  country?: string
  timezone?: string 
  longitude?: number;
  latitude?: number;
  image_url?: string;
}

export interface RobotCloudProjectUsers {
  username: string
  access_level: ProjectAccessLevel
  external?: boolean
}

export interface RobotCloudDeviceDetails extends RobotCloudDescribedItem {
  location: string;
  address: {
    domain: number;
    zone: number;
    id: number;
  };
  type: number;
  configuration_type: string;
  tags: string[];
}

export interface RobotCloudProjectInstances {
  id: string
  name: string;
  service: RobotCloudServiceType
}

export interface RobotCloudServiceTypeDetails {
  description?: string;
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
