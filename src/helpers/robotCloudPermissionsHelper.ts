import * as robotCloudClient from "robotCloudClient";
import { RobotCloudPermissionsHelper } from "../../types/helpers";
import { ProjectAccessLevel } from "../../types/RobotCloudClient";


class RobotCloudPermissionsHelperImpl implements RobotCloudPermissionsHelper {

    async checkProjectAccess(prjId: string, required_project_access: ProjectAccessLevel): Promise<boolean> {

        const { data: project} = await robotCloudClient.getProjectDetails(prjId)
        if (project.access_level == required_project_access) {
            return true
        }

        switch (required_project_access) {
            case 'ADVANCED':
                return project.access_level == 'ADVANCED'
            case 'BASIC':
                return project.access_level == 'BASIC' || project.access_level == 'ADVANCED'
            case 'RESTRICTED':
                return project.access_level == 'RESTRICTED' || project.access_level == 'BASIC' || 
                        project.access_level == 'ADVANCED'
            case 'BLOCKED':
                return true   
            default:
                return false
        }
        
    }
}

export const robotCloudPermissionsHelper: RobotCloudPermissionsHelper = new RobotCloudPermissionsHelperImpl()