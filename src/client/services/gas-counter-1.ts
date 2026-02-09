import {
    GasCounter1AlertEventValue,
    GasCounter1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { GasCounterConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class GasCounterConfigClient extends GenericInstanceConfigClient<GasCounterConfigurationParams> {
    constructor() {
        super("GasCounter_1");
    }
}

export class GasCounterDataClient extends GenericInstanceDataClient<GasCounter1DataEventValue> {
    constructor() {
        super("GasCounter_1");
    }
}

export class GasCounterAlertClient extends GenericInstanceAlertClient<GasCounter1AlertEventValue> {
    constructor() {
        super("GasCounter_1");
    }
}

export class GasCounterHistoricClient extends GenericInstanceHistoricClient<GasCounter1DataEventValue> {
    constructor() {
        super("GasCounter_1");
    }
}

export class GasCounterClient implements ServiceTypeClient<GasCounter1DataEventValue, GasCounter1AlertEventValue, GasCounterConfigurationParams> {
    private _configurationClient: GasCounterConfigClient;
    private _dataClient: GasCounterDataClient;
    private _alertClient: GasCounterAlertClient;
    private _historicClient: GasCounterHistoricClient;

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
        this._configurationClient = new GasCounterConfigClient();
        this._dataClient = new GasCounterDataClient();
        this._alertClient = new GasCounterAlertClient();
        this._historicClient = new GasCounterHistoricClient();
    }
}

export const gasCounterClient = new GasCounterClient();
