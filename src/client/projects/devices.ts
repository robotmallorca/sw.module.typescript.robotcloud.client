import type { AxiosResponse } from "axios";

import { useLogger } from "utils/logger";
import robotcloudApi from "robotCloudApi";
import { RobotCloudDeviceDetails } from "../../../types/RobotCloudClient";

const logger = useLogger("devices-client");

class DevicesClient {
  getDeviceDetails = (
    deviceId: string
  ): Promise<AxiosResponse<RobotCloudDeviceDetails>> => {
    return robotcloudApi.get<RobotCloudDeviceDetails>(`devices/${deviceId}`);
  };
}

export const devicesClient = new DevicesClient();
