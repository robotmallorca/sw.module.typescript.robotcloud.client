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