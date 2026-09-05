import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, DeviceStats } from '../models/device.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class DeviceService {
    private readonly apiUrl = `${environment.apiUrl}/devices`;
    
    constructor(private readonly http: HttpClient) { }

    getDevices(): Observable<{ data: Device[] }> {
        return this.http.get<{ data: Device[] }>(this.apiUrl);
    }

    getStats(): Observable<{ data: DeviceStats }> {
        return this.http.get<{ data: DeviceStats }>(
            `${this.apiUrl}/stats`,
        );
    }

    createDevice(device: Device): Observable<{ data: Device }> {
        return this.http.post<{ data: Device }>(
            this.apiUrl,
            device,
        );
    }

    deleteDevice(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}