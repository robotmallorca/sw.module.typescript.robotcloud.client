import { WaterCounterConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceAlertClient, GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceHistoricClient } from "./generics";
import { WaterCounter1Data ,WaterCounter1AlertEventValue, ServiceTypeClient } from "../../../types/services";



export class WaterCounterConfigClient extends GenericInstanceConfigClient<WaterCounterConfigurationParams> {
    constructor() {
        super("WaterCounter_1");
    }
}

export class WaterCounterDataClient extends GenericInstanceDataClient<WaterCounter1Data> {
    constructor() {
        super("WaterCounter_1");
    }
}

export class WaterCounterAlertClient extends GenericInstanceAlertClient<WaterCounter1AlertEventValue> {
    constructor() {
        super("WaterCounter_1");
    }
}

export class WaterCounterHistoricClient extends GenericInstanceHistoricClient<WaterCounter1Data> {
    constructor() {
        super("WaterCounter_1");
    }
}

export class WaterCounterClient implements ServiceTypeClient<WaterCounter1Data, WaterCounter1AlertEventValue, WaterCounterConfigurationParams> {
    private _configurationClient: WaterCounterConfigClient;
    private _dataClient: WaterCounterDataClient;
    private _alertClient: WaterCounterAlertClient;
    private _historicClient: WaterCounterHistoricClient;

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
        this._configurationClient = new WaterCounterConfigClient();
        this._dataClient = new WaterCounterDataClient();
        this._alertClient = new WaterCounterAlertClient();
        this._historicClient = new WaterCounterHistoricClient();
    }
}

export const watercounterClient = new WaterCounterClient();
