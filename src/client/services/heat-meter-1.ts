import {
    HeatMeter1AlertEventValue,
    HeatMeter1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { HeatMeterConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class HeatMeterConfigClient extends GenericInstanceConfigClient<HeatMeterConfigurationParams> {
    constructor() {
        super("HeatMeter_1");
    }
}

export class HeatMeterDataClient extends GenericInstanceDataClient<HeatMeter1DataEventValue> {
    constructor() {
        super("HeatMeter_1");
    }
}

export class HeatMeterAlertClient extends GenericInstanceAlertClient<HeatMeter1AlertEventValue> {
    constructor() {
        super("HeatMeter_1");
    }
}

export class HeatMeterHistoricClient extends GenericInstanceHistoricClient<HeatMeter1DataEventValue> {
    constructor() {
        super("HeatMeter_1");
    }
}

export class HeatMeterClient implements ServiceTypeClient<HeatMeter1DataEventValue, HeatMeter1AlertEventValue, HeatMeterConfigurationParams> {
    private _configurationClient: HeatMeterConfigClient;
    private _dataClient: HeatMeterDataClient;
    private _alertClient: HeatMeterAlertClient;
    private _historicClient: HeatMeterHistoricClient;

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
        this._configurationClient = new HeatMeterConfigClient();
        this._dataClient = new HeatMeterDataClient();
        this._alertClient = new HeatMeterAlertClient();
        this._historicClient = new HeatMeterHistoricClient();
    }
}

export const heatMeterClient = new HeatMeterClient();
