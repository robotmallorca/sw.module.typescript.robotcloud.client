import {
    RoomBlePairing1AlertEventValue,
    RoomBlePairing1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { RoomBlePairingConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class RoomBlePairingConfigClient extends GenericInstanceConfigClient<RoomBlePairingConfigurationParams> {
    constructor() {
        super("RoomBlePairing_1");
    }
}

export class RoomBlePairingDataClient extends GenericInstanceDataClient<RoomBlePairing1DataEventValue> {
    constructor() {
        super("RoomBlePairing_1");
    }
}

export class RoomBlePairingAlertClient extends GenericInstanceAlertClient<RoomBlePairing1AlertEventValue> {
    constructor() {
        super("RoomBlePairing_1");
    }
}

export class RoomBlePairingHistoricClient extends GenericInstanceHistoricClient<RoomBlePairing1DataEventValue> {
    constructor() {
        super("RoomBlePairing_1");
    }
}

export class RoomBlePairingClient implements ServiceTypeClient<RoomBlePairing1DataEventValue, RoomBlePairing1AlertEventValue, RoomBlePairingConfigurationParams> {
    private _configurationClient: RoomBlePairingConfigClient;
    private _dataClient: RoomBlePairingDataClient;
    private _alertClient: RoomBlePairingAlertClient;
    private _historicClient: RoomBlePairingHistoricClient;

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
        this._configurationClient = new RoomBlePairingConfigClient();
        this._dataClient = new RoomBlePairingDataClient();
        this._alertClient = new RoomBlePairingAlertClient();
        this._historicClient = new RoomBlePairingHistoricClient();
    }
}

export const roomBlePairingClient = new RoomBlePairingClient();
