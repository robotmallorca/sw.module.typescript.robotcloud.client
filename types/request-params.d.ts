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
export interface SortableListRequestParams {
  sort_by?: string; // Prefix the field name with '-' for descending order.
}

export interface SubsystemTagsRequestParams extends SubsystemRequestParams {
  tag_id?: string | string[];
}

export interface BaseFullPaginableRequestParams
  extends SubsystemTagsRequestParams,
  PaginableRequestParams { }

/*
 * CONCRETE INTERFACES
 */

export interface ProjectClassifiersRequestParams
  extends PaginableRequestParams { }

export interface ProjectsRequestParams extends PaginableRequestParams {
  "organization-id": string;
}

export interface ProjectDetailsRequestParams { }

export interface ProjectLocationsRequestParams
  extends BaseFullPaginableRequestParams { }

export interface ServiceInstanceDataRequestParams { }

export interface ServiceInstanceAlertRequestParams { }

export interface ProjectTagRequestParams extends PaginableRequestParams {
  parent_tag?: string;
  no_parent?: boolean;
}

export interface LocationServiceInstancesRequestParams
  extends BaseFullPaginableRequestParams { }

export interface AlertLogsListRequestParams
  extends BaseFullPaginableRequestParams,
  SortableListRequestParams {
  location_id?: string;
  classifier_id?: string;
  service_name?: string;
  instance_id?: string;
  name?: string;
  active?: boolean;
  acknowledged?: boolean;
  ack_user?: string;
  active_time?: string;
  deactive_time?: string;
  ack_time?: string;
}
export interface AlertsProjectStatsRequestParams extends SubsystemRequestParams { }
export interface AlertAggregatedLogsRequestParams extends SubsystemTagsRequestParams {
  location_id?: string;
  classifier_id?: string;
  service_name?: string;
  instance_id?: string;
  name?: string;
  periode: `${number}${'h' | 'd' | 'w' | 'm' | 'y'}`;
  offset?: string;
  time_range: string;
}

export interface AlertsByLocationRequestParams extends SubsystemTagsRequestParams, PaginableRequestParams {
  tag_max_level?: number;
  service_name?: string;
  name?: string;
  active?: boolean;
  active_time?: string;
}

export interface ServiceInstancesRequestParams
  extends BaseFullPaginableRequestParams {
  id?: string;
  name?: string;
  location_id?: string;
  device_id?: string;
}

export interface ServiceDataRequestParams extends SubsystemTagsRequestParams { }

export interface ServiceAlertRequestParams extends SubsystemTagsRequestParams { }

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
