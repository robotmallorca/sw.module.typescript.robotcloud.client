import {
    PowerMeter1AlertEventValue,
    PowerMeter1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { PowerMeterConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class PowerMeterConfigClient extends GenericInstanceConfigClient<PowerMeterConfigurationParams> {
    constructor() {
        super("PowerMeter_1");
    }
}

export class PowerMeterDataClient extends GenericInstanceDataClient<PowerMeter1DataEventValue> {
    constructor() {
        super("PowerMeter_1");
    }
}

export class PowerMeterAlertClient extends GenericInstanceAlertClient<PowerMeter1AlertEventValue> {
    constructor() {
        super("PowerMeter_1");
    }
}

export class PowerMeterHistoricClient extends GenericInstanceHistoricClient<PowerMeter1DataEventValue> {
    constructor() {
        super("PowerMeter_1");
    }
}

export class PowerMeterClient implements ServiceTypeClient<PowerMeter1DataEventValue, PowerMeter1AlertEventValue, PowerMeterConfigurationParams> {
    private _configurationClient: PowerMeterConfigClient;
    private _dataClient: PowerMeterDataClient;
    private _alertClient: PowerMeterAlertClient;
    private _historicClient: PowerMeterHistoricClient;

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
        this._configurationClient = new PowerMeterConfigClient();
        this._dataClient = new PowerMeterDataClient();
        this._alertClient = new PowerMeterAlertClient();
        this._historicClient = new PowerMeterHistoricClient();
    }
}

export const powerMeterClient = new PowerMeterClient();
