
interface RobotCloudServiceInstance extends RobotCloudNamedItem {
    service: string;
}
  
interface ServiceInstanceDetails extends RobotCloudServiceInstance {
  description: string;
  tags: string[];
  subsystems: string[];
  classifier: string;
}
