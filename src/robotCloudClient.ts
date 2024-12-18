import type { AxiosResponse } from "axios";

import { useLogger } from 'utils/logger';
import robotcloudApi from "robotCloudApi";
import { 
    LocationServiceInstancesRequestParams, ProjectDetailsRequestParams, ProjectLocationsRequestParams, 
    ProjectRequestParams, ProjectTagRequestParams, RobotCloudDeviceDetails, RobotCloudNamedItem, 
    RobotCloudProject, RobotCloudProjectDetails, RobotCloudServiceType, RobotCloudServiceTypeDetails, RobotCloudUserDetails, 
    RoomGrouping1DataEventValue, 
    RoomGrouping1InstanceDeviceConfig,
    ServiceInstancesRequestParams, 
    SubsystemRequestParams
} from "../types/RobotCloudClient";
import { RobotCloudServiceInstance, ServiceInstanceDetails } from "../types/ServiceInstance";
import { Classifier, ClassifierDetails, ProjectClassifiersRequestParams } from "../types/ProjectClassifer";
import { ProjectTag, ProjectTagTreeNode, ProjectTagsTree } from "../types/ProjectTag";
import { ServiceDataMeasurement, ServiceDataRequestParams } from "../types/services";


const logger = useLogger("robotcloud-client")



interface RobotCloudLocationDetails {
  id: string;
  name: string;
  description: string;
  project: string;
  tags: string[]
}

export const getLocationServiceInstances = (
  prjId: string,
  locId: string,
  service_type: RobotCloudServiceType,
  params?: LocationServiceInstancesRequestParams
): Promise<AxiosResponse<RobotCloudServiceInstance[]>> => {
  return robotcloudApi.get<RobotCloudServiceInstance[]>(`projects/${prjId}/locations/${locId}/services/${service_type}/instances`, {
    params,
  });
}


// USERS ENDPOINTS
export const getUser = (
    username: string
): Promise<AxiosResponse<RobotCloudUserDetails>> => {
    return robotcloudApi.get<RobotCloudUserDetails>(`users/${username}`);
};

// PROJECT ENDPOINTS
export const getProjects = (
  params?: ProjectRequestParams
): Promise<AxiosResponse<RobotCloudProject[]>> => {
  return robotcloudApi.get<RobotCloudProject[]>("projects", {
    params
  });
};

export const getProjectDetails = (
  prjId: string,
  params?: ProjectDetailsRequestParams
): Promise<AxiosResponse<RobotCloudProjectDetails>> => {
  return robotcloudApi.get<RobotCloudProjectDetails>(`projects/${prjId}`, {
    params,
  });
};

// PROJECT SUBSYSTEMS ENDPOINTS

export const getProjectSubsystem = (
  prjId: string,
  subsysId: string
) => {
  return robotcloudApi.get<RobotCloudNamedItem>(`projects/${prjId}/subsystems/${subsysId}`);
}

export const getLocations = (
  prjId: string,
  params?: ProjectLocationsRequestParams
): Promise<AxiosResponse<RobotCloudNamedItem[]>> => {
  return robotcloudApi.get<RobotCloudNamedItem[]>(`projects/${prjId}/locations`, {
    params,
  });
};

export const getLocation = (
  locationId: string
): Promise<AxiosResponse<RobotCloudLocationDetails>> => {
  return robotcloudApi.get<RobotCloudLocationDetails>(`locations/${locationId}`, { });
};

export const getServiceInstances = (
  prjId: string,
  service_type: string,
  params?: ServiceInstancesRequestParams
): Promise<AxiosResponse<RobotCloudServiceInstance[]>> => {
  return robotcloudApi.get<RobotCloudServiceInstance[]>(`projects/${prjId}/services/${service_type}/instances`, {
    params,
  });
}

export const getServiceInstance = (
  prjId: string,
  service_type: string,
  service_id: string
) => {
  return robotcloudApi.get<ServiceInstanceDetails>(`projects/${prjId}/services/${service_type}/instances/${service_id}`);
}

export const getProjectClassifiers = (
  prjId: string,
  params?: ProjectClassifiersRequestParams
): Promise<AxiosResponse<Classifier[]>> => {
    logger.info(`Get project ${prjId} classifiers`)
    return robotcloudApi.get<Classifier[]>(`projects/${prjId}/classifiers`, {
        params,
    });
}

export const getClassifier = (
  classifierId: string
) => {
  return robotcloudApi.get<ClassifierDetails>(`classifiers/${classifierId}`);
}

export const getTags = (
  prjId: string,
  params?: ProjectTagRequestParams
): Promise<AxiosResponse<ProjectTag[]>> => {
    logger.info(`Get project ${prjId} tags`)
  return robotcloudApi.get<ProjectTag[]>(`projects/${prjId}/tags`, {
    params,
  });
};

export const getTagsTree = async (
  prjId: string,
  maxDepth: number = 2,
  params?: ProjectTagRequestParams
): Promise<ProjectTagsTree> => {
    logger.info(`Get project ${prjId} tags tree`)
  if (!params) {
    params = {} as ProjectTagRequestParams  
  }
  params.no_parent = true;

  const tags = await getTagsChildren(prjId, 0, undefined, undefined, maxDepth)
  return {root: tags} as ProjectTagsTree;
};

export const getTagsChildren = async (
  prjId: string,
  level: number = 0,
  parent_id?: string,
  params?: ProjectTagRequestParams,
  maxDepth?: number
): Promise<ProjectTagTreeNode[]> => {
    logger.debug(`Get project ${prjId} tags children: ${parent_id}`)
  if (!params) {
    params = {} as ProjectTagRequestParams  
  }
  params.no_parent = !parent_id;
  params.parent_tag = parent_id;

  const tags = await getTags(prjId, params)
  if (tags.data.length == 0) {
    return [];
  }
  
  const response: ProjectTagTreeNode[] = []
  const requests: any[] = []
  for (let i = 0; i < tags.data.length; i++) {
    const element = tags.data[i]
    const node = {
      tag: element
    } as ProjectTagTreeNode;
    response.push(node)
    if (maxDepth && level < maxDepth) {
      requests.push(
        getTagsChildren(prjId, level + 1, element.id, params, maxDepth)
      )
    }
  }

  const responses = await Promise.all(requests)
  let i = 0;
  responses.forEach(element => {
    response[i].children = element
    i++
  });
  
  return response;

}

/* PROJECT DEVICES ENDPOINTS */
export const getDeviceDetails = (
  deviceId: string,
): Promise<AxiosResponse<RobotCloudDeviceDetails>> => {
  return robotcloudApi.get<RobotCloudDeviceDetails>(`devices/${deviceId}`);
}

/* SERVICES ENDPOINTS */
export const getProjectServiceTypes = (
    prjId: string,
    params?: SubsystemRequestParams
): Promise<AxiosResponse<RobotCloudServiceTypeDetails[]>> => {
    return robotcloudApi.get<RobotCloudServiceTypeDetails[]>(`projects/${prjId}/services`, {
        params,
    });
}
/* SERVICES INSTANCES DATA ENDPOINTS */

export const getRoomGrouping1ServiceData = (
  prjId: string,
  params?: ServiceDataRequestParams
): Promise<AxiosResponse<ServiceDataMeasurement<RoomGrouping1DataEventValue>[]>> => {
  return robotcloudApi.get<ServiceDataMeasurement<RoomGrouping1DataEventValue>[]>(
    `/projects/${prjId}/services/RoomGrouping_1/data`,
    { 
      params,
      headers: {
        "Accept": 'application/json'
      }
    }
  )
}

/* SERVICES INSTANCES DEVICE INGORMATION ENDPOINTS */


export const getRoomGrouping1InstanceDeviceConfig = (
  prjId: string,
  instanceId: string,
): Promise<AxiosResponse<RoomGrouping1InstanceDeviceConfig>> => {
  return robotcloudApi.put<RoomGrouping1InstanceDeviceConfig>(
    `/projects/${prjId}/services/RoomGrouping_1/instances/${instanceId}/configuration`
  )
}
