import { RegimState } from "./RobotCloudClient";

export interface RoomClime1Data {
    demandRF: boolean;
    eco_mode: "STANDBY"|"ECO"|"VIP";
    fancoil_manual: boolean;
    fancoil_speed: number;
    humidity: number;
    humidity_set_point: number; 
    
    on: boolean;
    onRF: boolean;

    temperature: number;
    temperature_set_point: number; 
    regim: RegimState;
}

export interface RoomConsumes1Data {
    energy_electric: number;
    energy_thermal: number;
    hot_water: number;
    cold_water: number;

    daily_energy_electric: number;
    daily_energy_thermal: number;
    daily_hot_water: number;
    daily_cold_water: number;
    daily_co2_footprint: number;
    daily_tree_equivalent: number;

    guest_energy_electric: number;
    guest_energy_thermal: number;
    guest_hot_water: number;
    guest_cold_water: number;
    guest_co2_footprint: number;
    guest_tree_equivalent: number;
}

export interface RoomGuestStatus1Data {
    sold: boolean;
    vip: boolean;
    occupied: boolean;
    do_not_disturb: boolean;
    make_up_room: boolean;
    tray_status: "IDLE"|'READY'|'FINISH';
    remote_occupation: boolean;
    door_open: boolean;
    window_open: boolean;
    medical_alarm: boolean;
}

export interface ServiceInstanceDeviceConfig {
  device: string;
}

export interface RoomGrouping1InstanceDeviceConfig {
  Main: ServiceInstanceDeviceConfig;
  Replica_1: ServiceInstanceDeviceConfig;
  Replica_2: ServiceInstanceDeviceConfig;
  Replica_3: ServiceInstanceDeviceConfig;
}

export interface RoomGrouping1DataEventValue {
  replica_1_active: boolean;
  replica_2_active: boolean;
  replica_3_active: boolean;
}
