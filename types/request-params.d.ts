/**
 * 
 */

import { MeasurementStatus } from "./services";

/*
 *  GENERIC REQUEST PARAMS INTERFACES
 */

export interface SubsystemRequestParams {
  subsystem_id?: string;
}

export interface PaginableRequestParams {
  startIndex?: number;
  maxSize?: number;
}

export interface SubsystemTagsRequestParams extends SubsystemRequestParams {
  tag_id?: string | string[];
}

export interface BaseFullPaginableRequestParams  extends SubsystemTagsRequestParams, PaginableRequestParams {
 
}

/*
 * CONCRETE INTERFACES
 */

export interface ProjectClassifiersRequestParams extends PaginableRequestParams {

}

export interface ProjectsRequestParams extends PaginableRequestParams {
  "organization-id": string;
}

export interface ProjectDetailsRequestParams {

}

export interface ProjectLocationsRequestParams extends BaseFullPaginableRequestParams {
  
}


export interface ServiceInstanceDataRequestParams {

}

export interface ProjectTagRequestParams extends PaginableRequestParams {
  parent_tag?: string;
  no_parent?: boolean;
}

export interface LocationServiceInstancesRequestParams extends BaseFullPaginableRequestParams {
  
}

export interface AlertLogsListRequestParams extends BaseFullPaginableRequestParams {

}


export interface ServiceInstancesRequestParams extends BaseFullPaginableRequestParams {
  id?: string;
  name?: string;
  location_id?: string;
  device_id?: string;
}


export interface ServiceDataRequestParams extends SubsystemTagsRequestParams {
}

export interface ServiceInstanceHistoricAggregateParams {
  offset?: string;
  property?: any[];
  maxSize?: number;
}
export interface ServiceInstanceHistoricParams {
  status?: MeasurementStatus;
  property?: any[];
  maxSize?: number;
}
