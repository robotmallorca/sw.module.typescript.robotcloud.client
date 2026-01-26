import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import { 
  RobotCloudDeviceDetails, 
  RobotCloudNamedItem,
  RobotCloudRobotCloudDeviceCreate,
  RobotCloudRobotCloudDeviceModify,
  RobotCloudDelete,
  RobotCloudDeviceConfiguration
} from "../../../types/RobotCloudClient";

const logger = useLogger("devices-client");

class DevicesClient {
  getProjectDevices = (
    projectId: string
  ): Promise<AxiosResponse<RobotCloudNamedItem[]>> => {
    return robotcloudApi.get<RobotCloudNamedItem[]>(`projects/${projectId}/devices`);
  };

  getProjectDevicesLocation = (
    locationId: string
  ): Promise<AxiosResponse<RobotCloudNamedItem[]>> => {
    return robotcloudApi.get<RobotCloudNamedItem[]>(`locations/${locationId}/devices`);
  };

  postProjectDeviceLocation = (
    locationId: string
  ): Promise<AxiosResponse<RobotCloudRobotCloudDeviceCreate>> => {
    return robotcloudApi.post<RobotCloudRobotCloudDeviceCreate>(`locations/${locationId}/devices`);
  };

  getDeviceDetails = (
    deviceId: string
  ): Promise<AxiosResponse<RobotCloudDeviceDetails>> => {
    return robotcloudApi.get<RobotCloudDeviceDetails>(`devices/${deviceId}`);
  };

  putDeviceDetails = (
    deviceId: string
  ): Promise<AxiosResponse<RobotCloudRobotCloudDeviceModify>> => {
    return robotcloudApi.put<RobotCloudRobotCloudDeviceModify>(`devices/${deviceId}`);
  };

  deleteDevice = (
    deviceId: string
  ): Promise<AxiosResponse<RobotCloudDelete>> => {
    return robotcloudApi.delete<RobotCloudDelete>(`devices/${deviceId}`);
  };

  getDeviceConfiguration = (
    deviceId: string
  ): Promise<AxiosResponse<RobotCloudDeviceConfiguration>> => {
    return robotcloudApi.get<RobotCloudDeviceConfiguration>(`devices/${deviceId}/compatibleconfigurationtypes`);
  };
}

export const devicesClient = new DevicesClient();
