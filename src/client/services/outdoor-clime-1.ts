import {
    OutdoorClime1AlertEventValue,
    OutdoorClime1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { OutdoorClimeConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class OutdoorClimeConfigClient extends GenericInstanceConfigClient<OutdoorClimeConfigurationParams> {
    constructor() {
        super("OutdoorClime_1");
    }
}

export class OutdoorClimeDataClient extends GenericInstanceDataClient<OutdoorClime1DataEventValue> {
    constructor() {
        super("OutdoorClime_1");
    }
}

export class OutdoorClimeAlertClient extends GenericInstanceAlertClient<OutdoorClime1AlertEventValue> {
    constructor() {
        super("OutdoorClime_1");
    }
}

export class OutdoorClimeHistoricClient extends GenericInstanceHistoricClient<OutdoorClime1DataEventValue> {
    constructor() {
        super("OutdoorClime_1");
    }
}

export class OutdoorClimeClient implements ServiceTypeClient<OutdoorClime1DataEventValue, OutdoorClime1AlertEventValue, OutdoorClimeConfigurationParams> {
    private _configurationClient: OutdoorClimeConfigClient;
    private _dataClient: OutdoorClimeDataClient;
    private _alertClient: OutdoorClimeAlertClient;
    private _historicClient: OutdoorClimeHistoricClient;

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
        this._configurationClient = new OutdoorClimeConfigClient();
        this._dataClient = new OutdoorClimeDataClient();
        this._alertClient = new OutdoorClimeAlertClient();
        this._historicClient = new OutdoorClimeHistoricClient();
    }
}

export const outdoorClimeClient = new OutdoorClimeClient();
