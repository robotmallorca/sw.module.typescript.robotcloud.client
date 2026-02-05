import { RoomClime1AlertEventValue } from "../../../types/RobotCloudClient";
import { RoomClime1Data } from "../../../types/services-data";
import { RoomClimeConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


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

export class RoomClimeAlertClient extends GenericInstanceAlertClient<RoomClime1AlertEventValue> {
  constructor() {
    super("RoomClime_1");
  }
}

export class RoomClimeHistoricClient extends GenericInstanceHistoricClient<RoomClime1Data> {
  constructor() {
    super("RoomClime_1");
  }
}

export class RoomClimeClient {
  private _configurationClient: RoomClimeConfigClient;
  private _dataClient: RoomClimeDataClient;
  private _alertClient: RoomClimeAlertClient;
  private _historicClient: RoomClimeHistoricClient;

  get configuration() {
    return this._configurationClient;
  }
  get data() {
    return this._dataClient;
  }
  get alerts() {
    return this._alertClient;
  }
  get historic() {
    return this._historicClient;
  }

  constructor() {
    this._configurationClient = new RoomClimeConfigClient();
    this._dataClient = new RoomClimeDataClient();
    this._alertClient = new RoomClimeAlertClient();
    this._historicClient = new RoomClimeHistoricClient();
  }
}

export const roomClimeClient = new RoomClimeClient();

