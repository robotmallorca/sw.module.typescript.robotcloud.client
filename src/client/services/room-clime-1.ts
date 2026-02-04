import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { RoomClime1AlertEventValue } from "../../../types/RobotCloudClient";
import {
  ServiceDataMeasurement,
  ServiceTypeClient,
  HistoricAggregateFunction,
} from "../../../types/services";
import { RoomClime1Data } from "../../../types/services-data";
import { RoomClimeConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient } from "./generics";
import {
  ServiceDataRequestParams,
  ServiceInstanceDataRequestParams,
  ServiceInstanceHistoricAggregateParams,
  ServiceInstanceHistoricParams,
} from "../../../types/request-params";

export type RoomClimeAlertsKeys =
  | "high_temperature"
  | "low_temperature"
  | "high_humidity"
  | "fancoil_on_overtime";

export class RoomClimeConfigClient extends GenericInstanceConfigClient<RoomClimeConfigurationParams> {
  constructor() {
    super("RoomClime_1");
  }
}

export class RoomClimeDataClient extends GenericInstanceDataClient<RoomClime1Data> {
  constructor() {
    super("RoomClime_1");
  }
}

export class RoomClimeClient
  implements ServiceTypeClient<RoomClime1AlertEventValue, RoomClime1Data> {
  private _configurationClient: RoomClimeConfigClient;
  private _dataClient: RoomClimeDataClient;

  get configuration() {
    return this._configurationClient;
  }
  get data() {
    return this._dataClient;
  }


  constructor() {
    this._configurationClient = new RoomClimeConfigClient();
    this._dataClient = new RoomClimeDataClient();
  }
}

export const roomClimeClient = new RoomClimeClient();

