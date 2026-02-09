import {
    EnergyCounter1AlertEventValue,
    EnergyCounter1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { EnergyCounterConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class EnergyCounterConfigClient extends GenericInstanceConfigClient<EnergyCounterConfigurationParams> {
    constructor() {
        super("EnergyCounter_1");
    }
}

export class EnergyCounterDataClient extends GenericInstanceDataClient<EnergyCounter1DataEventValue> {
    constructor() {
        super("EnergyCounter_1");
    }
}

export class EnergyCounterAlertClient extends GenericInstanceAlertClient<EnergyCounter1AlertEventValue> {
    constructor() {
        super("EnergyCounter_1");
    }
}

export class EnergyCounterHistoricClient extends GenericInstanceHistoricClient<EnergyCounter1DataEventValue> {
    constructor() {
        super("EnergyCounter_1");
    }
}

export class EnergyCounterClient implements ServiceTypeClient<EnergyCounter1DataEventValue, EnergyCounter1AlertEventValue, EnergyCounterConfigurationParams> {
    private _configurationClient: EnergyCounterConfigClient;
    private _dataClient: EnergyCounterDataClient;
    private _alertClient: EnergyCounterAlertClient;
    private _historicClient: EnergyCounterHistoricClient;

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
        this._configurationClient = new EnergyCounterConfigClient();
        this._dataClient = new EnergyCounterDataClient();
        this._alertClient = new EnergyCounterAlertClient();
        this._historicClient = new EnergyCounterHistoricClient();
    }
}

export const energyCounterClient = new EnergyCounterClient();
