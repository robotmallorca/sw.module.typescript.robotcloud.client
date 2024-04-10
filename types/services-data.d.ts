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
