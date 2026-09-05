export interface Device {
    _id?: string;
    deviceId: string;
    name: string;
    serialNumber: string;
    location: string;
    status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
}

export interface DeviceStats {
    total: number;
    online: number;
    offline: number;
    maintenance: number;
}