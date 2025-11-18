import robotcloudApi from "@/robotCloudApi";
import { AxiosInstance, AxiosResponse } from "axios";
import {
  RobotCloudNamedItem,
  RobotCloudUserSimple,
} from "../../types/RobotCloudClient";
import { AlertLogsListRequestParams } from "../../types/request-params";

interface AlertsLogsStats {
  total: number;
  active: number;
  noack: number;
  active_noack: number;
}

interface AlertLogLine {
  id: string;
  service: string;
  instance: string;
  location: RobotCloudNamedItem;
  classifier: RobotCloudNamedItem;
  alert_name: string;
  acknowledged: boolean;
  ack_time: string;
  ack_user: RobotCloudUserSimple;
  active_time: string;
  deactive_time: string;
}

interface AlertsLogsList {
  total_size: number;
  initial_index: number;
  alerts: AlertLogLine;
}

interface AlertLogAckItem {
  id: string;
  acknowledged: boolean;
}

interface AlertsClient {
  getProjectStats(projectId: string): Promise<AxiosResponse<AlertsLogsStats>>;

  getProjectLog(
    projectId: string,
    params: AlertLogsListRequestParams
  ): Promise<AxiosResponse<AlertsLogsList>>;

  acknowledge(
    projectId: string,
    data: AlertLogAckItem[]
  ): Promise<AxiosResponse<AlertsLogsList>>;
}

class AlertsClientImpl implements AlertsClient {
  private robotcloudApi: AxiosInstance;

  constructor(robotcloudApi: AxiosInstance) {
    this.robotcloudApi = robotcloudApi;
  }

  getProjectStats(projectId: string): Promise<AxiosResponse<AlertsLogsStats>> {
    return this.robotcloudApi.get<AlertsLogsStats>(
      `projects/${projectId}/alerts/stats`
    );
  }

  getProjectLog(
    projectId: string,
    params: AlertLogsListRequestParams
  ): Promise<AxiosResponse<AlertsLogsList>> {
    return this.robotcloudApi.get<AlertsLogsList>(
      `projects/${projectId}/alerts/log`,
      {
        params,
      }
    );
  }

  acknowledge(
    projectId: string,
    data: AlertLogAckItem[]
  ): Promise<AxiosResponse<AlertsLogsList>> {
    return this.robotcloudApi.put<AlertsLogsList>(
      `projects/${projectId}/alerts/log`,
      {
        data,
      }
    );
  }
}

export const alertsClient: AlertsClient = new AlertsClientImpl(robotcloudApi);
