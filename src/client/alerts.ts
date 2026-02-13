import { AxiosInstance, AxiosResponse } from "axios";
import {
  RobotCloudServiceTypeDetails,
} from "../../types/RobotCloudClient";
import {
  AlertAggregatedLogsRequestParams,
  AlertLogsListRequestParams,
  AlertsByLocationRequestParams,
  AlertsProjectStatsRequestParams,
  SubsystemRequestParams
} from "../../types/request-params";
import { useLogger } from "utils/logger";
import {
  AlertLogAckAlerts,
  AlertsByLocation,
  AlertsClient,
  AlertsLogsAggregated,
  AlertsLogsList,
  AlertsLogsStats
} from "../../types/alerts";

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
export class AlertsClientImpl implements AlertsClient {
  private robotcloudApi: AxiosInstance;
  private logger = useLogger('AlertsClientImpl')

  constructor(robotcloudApi: AxiosInstance) {
    this.robotcloudApi = robotcloudApi;
  }

  getProjectStats(projectId: string, params?: AlertsProjectStatsRequestParams): Promise<AxiosResponse<AlertsLogsStats>> {
    return this.robotcloudApi.get<AlertsLogsStats>(
      `projects/${projectId}/alerts/stats`,
      { params: params ?? {} }
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

  getAlertsByLocation(projectId: string, params?: AlertsByLocationRequestParams): Promise<AxiosResponse<AlertsByLocation>> {
    return this.robotcloudApi.get<AlertsByLocation>(
      `projects/${projectId}/alerts/bylocation`,
      { params }
    );
  }

  getServiceTypeAlertKeys(serviceType: string): string[] {
    return ALERTS_BY_SERVICE_TYPE[serviceType as keyof typeof ALERTS_BY_SERVICE_TYPE];
  }
}
