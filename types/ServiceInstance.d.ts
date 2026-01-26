import { RobotCloudNamedItem } from "./RobotCloudClient";

export interface ServiceInstanceDevicesInfo {
  device: string;
  index?: number;
}

export interface RobotCloudServiceInstance extends RobotCloudNamedItem {
  service: string;
}


export interface ServiceInstanceDetails extends RobotCloudServiceInstance {
  description?: string;
  location?: string;
  tags?: string[];
  subsystems?: string[];
  classifier?: string;
}

export interface CreateServiceInstance extends RobotCloudServiceInstance {
  description?: string;
  name: string
  tags?: string[];
  subsystems?: string[];
  classifier?: string;
}
