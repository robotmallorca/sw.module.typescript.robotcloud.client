import robotcloudApi from "@/robotCloudApi";
import { AxiosInstance, AxiosResponse } from "axios";
import {
  RobotCloudNamedItem,
  RobotCloudServiceTypeDetails,
  RobotCloudUserSimple,
} from "../../types/RobotCloudClient";
import { AlertAggregatedLogsRequestParams, AlertLogsListRequestParams, AlertsProjectStatsRequestParams, SubsystemRequestParams } from "../../types/request-params";
import { useLogger } from "utils/logger";

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

interface AlertsLogsList {
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

interface AlertLogAckAlerts {
  alerts: AlertLogAckItem[];
}

export interface AlertsClient {
  getProjectStats(projectId: string): Promise<AxiosResponse<AlertsLogsStats>>;

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
}

const ALERTS_BY_SERVICE_TYPE = {
  "RoomBLEPairing_1": [],
  "RoomClime_1": [
    "high_temperature",
    "low_temperature",
    "high_humidity",
    "fancoil_on_overtime"
  ],
  "RoomConsumes_1": [
    "high_daily_energy_electric",
    "high_daily_energy_thermal",
    "high_daily_hot_water",
    "high_daily_cold_water"
  ],
  "RoomDiagnostics_1": [
    "low_peripheral_num"
  ],
  "RoomGrouping_1": [],
  "RoomGuestStatus_1": [
    "door_open_overtime",
    "window_open_overtime",
    "medical_alarm"
  ],
}
class AlertsClientImpl implements AlertsClient {
  private robotcloudApi: AxiosInstance;
  private logger = useLogger('AlertsClientImpl')

  constructor(robotcloudApi: AxiosInstance) {
    this.robotcloudApi = robotcloudApi;
  }

  getProjectStats(projectId: string, params?: AlertsProjectStatsRequestParams): Promise<AxiosResponse<AlertsLogsStats>> {
    return this.robotcloudApi.get<AlertsLogsStats>(
      `projects/${projectId}/alerts/stats`,
      { params }
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
    data: AlertLogAckAlerts
  ): Promise<AxiosResponse<AlertsLogsList>> {
    this.logger.debug("Sending put data: ", data);
    return this.robotcloudApi.put<AlertsLogsList, AxiosResponse<AlertsLogsList, AlertLogAckAlerts>, AlertLogAckAlerts>(
      `projects/${projectId}/alerts/log`,
      data
    );
  }

  getAggregatedLogs(
    projectId: string,
    params: AlertAggregatedLogsRequestParams
  ): Promise<AxiosResponse<AlertsLogsAggregated>> {
    return this.robotcloudApi.get<AlertsLogsAggregated>(
      `projects/${projectId}/alerts/aggregate`,
      { params }
    );
  }

  async getAvailableAlerts(projectId: string, params?: SubsystemRequestParams): Promise<AxiosResponse<string[]>> {
    const { data } = await this.robotcloudApi.get<RobotCloudServiceTypeDetails[]>(
      `projects/${projectId}/services`,
      { params: params ?? {} }
    );

    let alerts: string[] = [];
    for (const service of data) {
      if (!(service.name in ALERTS_BY_SERVICE_TYPE)) {
        this.logger.warn(`Service ${service.name} not found in ALERTS_BY_SERVICE_TYPE`);
        continue;
      }
      alerts.push(...ALERTS_BY_SERVICE_TYPE[service.name as keyof typeof ALERTS_BY_SERVICE_TYPE]);
    }
    return {
      data: alerts
    } as AxiosResponse<string[]>;
  }
}

export const alertsClient: AlertsClient = new AlertsClientImpl(robotcloudApi);
