import { RoomGuestStatus1Data } from "../../../types/services-data";
import { RoomGuestStatusConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceAlertClient, GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceHistoricClient } from "./generics";
import { ServiceTypeClient } from "../../../types/services";



export class RoomGuestStatusConfigClient extends GenericInstanceConfigClient<RoomGuestStatusConfigurationParams> {
  constructor() {
    super("RoomGuestStatus_1");
  }
}

export class RoomGuestStatusDataClient extends GenericInstanceDataClient<RoomGuestStatus1Data> {
  constructor() {
    super("RoomGuestStatus_1");
  }
}

export class RoomGuestStatusAlertClient extends GenericInstanceAlertClient<{}> {
  constructor() {
    super("RoomGuestStatus_1");
  }
}

export class RoomGuestStatusHistoricClient extends GenericInstanceHistoricClient<RoomGuestStatus1Data> {
  constructor() {
    super("RoomGuestStatus_1");
  }
}

export class RoomGuestStatusClient implements ServiceTypeClient<RoomGuestStatus1Data, {}, RoomGuestStatusConfigurationParams> {
  private _configurationClient: RoomGuestStatusConfigClient;
  private _dataClient: RoomGuestStatusDataClient;
  private _alertClient: RoomGuestStatusAlertClient;
  private _historicClient: RoomGuestStatusHistoricClient;

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
    this._configurationClient = new RoomGuestStatusConfigClient();
    this._dataClient = new RoomGuestStatusDataClient();
    this._alertClient = new RoomGuestStatusAlertClient();
    this._historicClient = new RoomGuestStatusHistoricClient();
  }
}

export const roomGuestStatusClient = new RoomGuestStatusClient();

