import { RobotCloudNamedItem } from "./RobotCloudClient";

export interface RobotCloudServiceInstance extends RobotCloudNamedItem {
    service: string;
}
  
export interface ServiceInstanceDetails extends RobotCloudServiceInstance {
  description: string;
  tags: string[];
  subsystems: string[];
  classifier: string;
}
