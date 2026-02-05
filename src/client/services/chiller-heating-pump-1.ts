import {
  ChillerHeatingPump1AlertEventValue,
  ChillerHeatingPump1DataEventValue,
  ServiceTypeClient
} from "../../../types/services";
import { ChillerHeatingPumpConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class ChillerHeatingPumpConfigClient extends GenericInstanceConfigClient<ChillerHeatingPumpConfigurationParams> {
  constructor() {
    super("ChillerHeatingPump_1");
  }
}

export class ChillerHeatingPumpDataClient extends GenericInstanceDataClient<ChillerHeatingPump1DataEventValue> {
  constructor() {
    super("ChillerHeatingPump_1");
  }
}

export class ChillerHeatingPumpAlertClient extends GenericInstanceAlertClient<ChillerHeatingPump1AlertEventValue> {
  constructor() {
    super("ChillerHeatingPump_1");
  }
}

export class ChillerHeatingPumpHistoricClient extends GenericInstanceHistoricClient<ChillerHeatingPump1DataEventValue> {
  constructor() {
    super("ChillerHeatingPump_1");
  }
}

export class ChillerHeatingPumpClient implements ServiceTypeClient<ChillerHeatingPump1DataEventValue, ChillerHeatingPump1AlertEventValue, ChillerHeatingPumpConfigurationParams> {
  private _configurationClient: ChillerHeatingPumpConfigClient;
  private _dataClient: ChillerHeatingPumpDataClient;
  private _alertClient: ChillerHeatingPumpAlertClient;
  private _historicClient: ChillerHeatingPumpHistoricClient;

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
    this._configurationClient = new ChillerHeatingPumpConfigClient();
    this._dataClient = new ChillerHeatingPumpDataClient();
    this._alertClient = new ChillerHeatingPumpAlertClient();
    this._historicClient = new ChillerHeatingPumpHistoricClient();
  }
}

export const chillerHeatingPumpClient = new ChillerHeatingPumpClient();

