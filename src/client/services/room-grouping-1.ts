import {
  RoomGrouping1DataEventValue
} from "../../../types/services-data";
import { GenericInstanceAlertClient, GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceHistoricClient } from "./generics";
import { RoomGroupingConfigurationParams } from "../../../types/services-configuration";
import { ServiceTypeClient } from "../../../types/services";

export class RoomGroupingConfigClient extends GenericInstanceConfigClient<RoomGroupingConfigurationParams> {
  constructor() {
    super("RoomGrouping_1");
  }
}

export class RoomGroupingDataClient extends GenericInstanceDataClient<RoomGrouping1DataEventValue> {
  constructor() {
    super("RoomGrouping_1");
  }
}

export class RoomGroupingAlertClient extends GenericInstanceAlertClient<{}> {
  constructor() {
    super("RoomGrouping_1");
  }
}

export class RoomGroupingHistoricClient extends GenericInstanceHistoricClient<RoomGrouping1DataEventValue> {
  constructor() {
    super("RoomGrouping_1");
  }
}

export class RoomGroupingClient implements ServiceTypeClient<RoomGrouping1DataEventValue, {}, RoomGroupingConfigurationParams> {
  private _configurationClient: RoomGroupingConfigClient;
  private _dataClient: RoomGroupingDataClient;
  private _alertClient: RoomGroupingAlertClient;
  private _historicClient: RoomGroupingHistoricClient;

  get configuration() {
    return this._configurationClient;
  }
  get data() {
    return this._dataClient;
  }
  get alert() {
    return this._alertClient;
  }
  get historic() {
    return this._historicClient;
  }

  constructor() {
    this._configurationClient = new RoomGroupingConfigClient();
    this._dataClient = new RoomGroupingDataClient();
    this._alertClient = new RoomGroupingAlertClient();
    this._historicClient = new RoomGroupingHistoricClient();
  }
}

export const roomGroupingClient = new RoomGroupingClient();

