import { AxiosResponse } from "axios";
import {
  AlertAggregatedLogsRequestParams,
  AlertLogsListRequestParams,
  AlertsProjectStatsRequestParams,
  SubsystemRequestParams
} from "./request-params";
import { RobotCloudNamedItem, RobotCloudUserSimple } from "./RobotCloudClient";

export interface AlertsLogsStats {
  total: number;
  active: number;
  noack: number;
  active_noack: number;
}

export interface AlertLogLine {
  id: string;
  service: string;
  instance: string;
  location: RobotCloudNamedItem;
  classifier: RobotCloudNamedItem;
  alert_name: string;
  acknowledged: boolean;
  ack_time: string;
  ack_user: RobotCloudUserSimple;
  active: boolean;
  active_time: string;
  deactive_time: string;
}

export interface AlertsLogsList {
  total_size: number;
  initial_index: number;
  alerts: AlertLogLine[];
}

interface AlertsLogsAggregatedAlertRecord {
  periode_start: string,
  periode_end: string,
  activation_count: number,
  active_seconds: number
}

interface AlertsLogsAggregatedAlert {
  service: string;
  alert_name: string;
  aggregates: AlertsLogsAggregatedAlertRecord[];
}

export interface AlertsLogsAggregated {
  alerts: AlertsLogsAggregatedAlert[];
}

interface AlertLogAckItem {
  id: string;
  acknowledged: boolean;
}

export interface AlertLogAckAlerts {
  alerts: AlertLogAckItem[];
}

export interface AlertsClient {
  getProjectStats(
    projectId: string,
    params?: AlertsProjectStatsRequestParams
  ): Promise<AxiosResponse<AlertsLogsStats>>;

  getProjectLog(
    projectId: string,
    params: AlertLogsListRequestParams
  ): Promise<AxiosResponse<AlertsLogsList>>;

  acknowledge(
    projectId: string,
    data: AlertLogAckAlerts
  ): Promise<AxiosResponse<AlertsLogsList>>;

  getAggregatedLogs(
    projectId: string,
    params: AlertAggregatedLogsRequestParams
  ): Promise<AxiosResponse<AlertsLogsAggregated>>;

  getAvailableAlerts(projectId: string, params?: SubsystemRequestParams): Promise<AxiosResponse<string[]>>;

  getServiceTypeAlertKeys(serviceType: string): string[];
}