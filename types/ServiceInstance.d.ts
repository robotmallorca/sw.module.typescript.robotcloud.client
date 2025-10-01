import { PaginableRequestParams, RobotCloudNamedItem, SubsystemRequestParams } from "./RobotCloudClient";

export interface RobotCloudServiceInstance extends RobotCloudNamedItem {
    service: string;
}
  
export interface ServiceInstanceDetails extends RobotCloudServiceInstance {
  description: string;
  tags: string[];
  subsystems: string[];
  classifier: string;
}

export interface ServiceInstancesRequestParams extends SubsystemRequestParams, 
    PaginableRequestParams {
  id?: string;
  name?: string;
  location_id?: string;
  device_id?: string;
  tag_id?: string[];
}