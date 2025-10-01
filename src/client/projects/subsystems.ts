import robotcloudApi from "robotCloudApi";

import { RobotCloudNamedItem } from "../../../types/RobotCloudClient";

class SubsystemsClient {
  getProjectSubsystem = (prjId: string, subsysId: string) => {
    return robotcloudApi.get<RobotCloudNamedItem>(
      `projects/${prjId}/subsystems/${subsysId}`
    );
  };
}
export const subsystemsClient = new SubsystemsClient();
