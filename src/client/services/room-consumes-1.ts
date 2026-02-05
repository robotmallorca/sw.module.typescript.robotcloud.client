import { RoomConsumes1AlertEventValue } from "../../../types/RobotCloudClient";
import { ServiceTypeClient } from "../../../types/services";
import { RoomConsumesConfigurationParams } from "../../../types/services-configuration";
import { RoomConsumes1Data } from "../../../types/services-data";
import { GenericInstanceAlertClient, GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceHistoricClient } from "./generics";

export class RoomConsumesConfigClient extends GenericInstanceConfigClient<RoomConsumesConfigurationParams> {
  constructor() {
    super("RoomConsumes_1");
  }
}

export class RoomConsumesDataClient extends GenericInstanceDataClient<RoomConsumes1Data> {
  constructor() {
    super("RoomConsumes_1");
  }
}

export class RoomConsumesAlertClient extends GenericInstanceAlertClient<RoomConsumes1AlertEventValue> {
  constructor() {
    super("RoomConsumes_1");
  }
}

export class RoomConsumesHistoricClient extends GenericInstanceHistoricClient<RoomConsumes1Data> {
  constructor() {
    super("RoomConsumes_1");
  }
}

export class RoomConsumesClient implements ServiceTypeClient<RoomConsumes1Data, RoomConsumes1AlertEventValue, RoomConsumesConfigurationParams> {
  private _configurationClient: RoomConsumesConfigClient;
  private _dataClient: RoomConsumesDataClient;
  private _alertClient: RoomConsumesAlertClient;
  private _historicClient: RoomConsumesHistoricClient;

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
    this._configurationClient = new RoomConsumesConfigClient();
    this._dataClient = new RoomConsumesDataClient();
    this._alertClient = new RoomConsumesAlertClient();
    this._historicClient = new RoomConsumesHistoricClient();
  }
}


export const roomConsumesClient = new RoomConsumesClient();

