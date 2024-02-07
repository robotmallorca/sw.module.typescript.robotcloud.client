import type { AxiosResponse } from "axios";

import { useLogger } from 'utils/logger';
import robotcloudApi from "robotCloudApi";
import { AirQuality1AlertEventValue, AirQuality1DataEventValue, LocationServiceInstancesRequestParams, ProjectDetailsRequestParams, ProjectLocationsRequestParams, ProjectRequestParams, ProjectTagRequestParams, RobotCloudDeviceDetails, RobotCloudNamedItem, RobotCloudProject, RobotCloudProjectDetails, RobotCloudServiceType, RobotCloudUserDetails, RoomClime1AlertEventValue, RoomClime1EventValue, RoomClimeInstanceConfigParams, RoomConsumes1AlertEventValue, RoomConsumes1DataEventValue, RoomGrouping1DataEventValue, RoomGrouping1InstanceDeviceConfig, RoomGuestStatus1AlertEventValue, RoomGuestStatus1EventValue, RoomGuestStatusInstanceConfigParams, ServiceDataRequestParams, ServiceInstancesRequestParams } from "../types/RobotCloudClient";
import { RobotCloudServiceInstance, ServiceInstanceDetails } from "../types/ServiceInstance";
import { ClassifierDetails } from "../types/ProjectClassifer";
import { ProjectTag, ProjectTagTreeNode, ProjectTagsTree } from "../types/ProjectTag";
import { ServiceDataMeasurement } from "../types/ServiceDataMeasurement";


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

/* SERVICES INSTANCES DATA ENDPOINTS */

export const getRoomClimeServiceData = (
  prjId: string,
  params?: ServiceDataRequestParams
): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1EventValue>[]>> => {
  return robotcloudApi.get<ServiceDataMeasurement<RoomClime1EventValue>[]>(
    `/projects/${prjId}/services/RoomClime_1/data`,
    { 
      params,
      headers: {
        "Accept": 'application/json'
      }
    }
  )
}

export const getRoomGuestStatusServiceData = (
  prjId: string,
  params?: ServiceDataRequestParams
): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1EventValue>[]>> => {
  return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1EventValue>[]>(
    `/projects/${prjId}/services/RoomGuestStatus_1/data`,
    { 
      params,
      headers: {
        "Accept": 'application/json'
      }
    }
  )
}

export const getAirQualityServiceData = (
  prjId: string,
  params?: ServiceDataRequestParams
): Promise<AxiosResponse<ServiceDataMeasurement<AirQuality1DataEventValue>[]>> => {
  return robotcloudApi.get<ServiceDataMeasurement<AirQuality1DataEventValue>[]>(
    `/projects/${prjId}/services/AirQuality_1/data`,
    { 
      params,
      headers: {
        "Accept": 'application/json'
      }
    }
  )
}

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

export const getRoomConsumesServiceData = (
    prjId: string,
    params?: ServiceDataRequestParams
  ): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1DataEventValue>[]>> => {
    return robotcloudApi.get<ServiceDataMeasurement<RoomConsumes1DataEventValue>[]>(
      `/projects/${prjId}/services/RoomConsumes_1/data`,
      { 
        params,
        headers: {
          "Accept": 'application/json'
        }
      }
    )
  }
/* SERVICES INSTANCES ALERTS ENDPOINTS */

export const getRoomClimeServiceAlert = (
  prjId: string,
  params?: ServiceDataRequestParams
): Promise<AxiosResponse<ServiceDataMeasurement<RoomClime1AlertEventValue>[]>> => {
  return robotcloudApi.get<ServiceDataMeasurement<RoomClime1AlertEventValue>[]>(
    `/projects/${prjId}/services/RoomClime_1/alert`,
    { 
      params,
      headers: {
        "Accept": 'application/json'
      }
    }
  )
}

export const getRoomGuestStatusServiceAlert = (
  prjId: string,
  params?: ServiceDataRequestParams
): Promise<AxiosResponse<ServiceDataMeasurement<RoomGuestStatus1AlertEventValue>[]>> => {
  return robotcloudApi.get<ServiceDataMeasurement<RoomGuestStatus1AlertEventValue>[]>(
    `/projects/${prjId}/services/RoomGuestStatus_1/alert`,
    { 
      params,
      headers: {
        "Accept": 'application/json'
      }
    }
  )
}

export const getAirQualityServiceAlert = (
  prjId: string,
  params?: ServiceDataRequestParams
): Promise<AxiosResponse<ServiceDataMeasurement<AirQuality1AlertEventValue>[]>> => {
  return robotcloudApi.get<ServiceDataMeasurement<AirQuality1AlertEventValue>[]>(
    `/projects/${prjId}/services/AirQuality_1/alert`,
    { 
      params,
      headers: {
        "Accept": 'application/json'
      }
    }
  )
}

export const getRoomConsumesServiceAlert = (
  prjId: string,
  params?: ServiceDataRequestParams
): Promise<AxiosResponse<ServiceDataMeasurement<RoomConsumes1AlertEventValue>[]>> => {
  return robotcloudApi.get<ServiceDataMeasurement<RoomConsumes1AlertEventValue>[]>(
    `/projects/${prjId}/services/RoomConsumes_1/alert`,
    { 
      params,
      headers: {
        "Accept": 'application/json'
      }
    }
  )
}

/* SERVICES INSTANCES CONFIGURATION ENDPOINTS */

export const getRoomClimeServiceInstanceConfiguration = (
  prjId: string,
  instanceId: string
): Promise<AxiosResponse<RoomClimeInstanceConfigParams>> => {
  return robotcloudApi.get<RoomClimeInstanceConfigParams>(
    `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/configuration`
  )
}

export const getRoomGuestStatusServiceInstanceConfiguration = (
  prjId: string,
  instanceId: string
): Promise<AxiosResponse<RoomGuestStatusInstanceConfigParams>> => {
  return robotcloudApi.get<RoomGuestStatusInstanceConfigParams>(
    `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/configuration`
  )
}

export const putRoomClimeServiceInstanceConfiguration = (
  prjId: string,
  instanceId: string,
  data: RoomClimeInstanceConfigParams
): Promise<AxiosResponse<RoomClimeInstanceConfigParams>> => {
  return robotcloudApi.put<RoomClimeInstanceConfigParams>(
    `/projects/${prjId}/services/RoomClime_1/instances/${instanceId}/configuration`,
    data
  )
}

export const putRoomGuestStatusServiceInstanceConfiguration = (
  prjId: string,
  instanceId: string,
  data: RoomGuestStatusInstanceConfigParams
): Promise<AxiosResponse<RoomGuestStatusInstanceConfigParams>> => {
  return robotcloudApi.put<RoomGuestStatusInstanceConfigParams>(
    `/projects/${prjId}/services/RoomGuestStatus_1/instances/${instanceId}/configuration`,
    data
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
