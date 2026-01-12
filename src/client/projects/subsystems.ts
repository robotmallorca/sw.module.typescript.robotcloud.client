import robotcloudApi from "robotCloudApi";

import { RobotCloudDescribedItem } from "../../../types/RobotCloudClient";

class SubsystemsClient {
  getProjectSubsystems = (prjId: string) => {
    return robotcloudApi.get<RobotCloudDescribedItem>(
      `projects/${prjId}/subsystems`
    );
  };
  getProjectSubsystem = (prjId: string, subsysId: string) => {
    return robotcloudApi.get<RobotCloudDescribedItem>(
      `projects/${prjId}/subsystems/${subsysId}`
    );
  };
}
export const subsystemsClient = new SubsystemsClient();
