import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDeviceModalComponent } from '../../shared/components/add-device-modal/add-device-modal.component';

import { Device, DeviceStats } from '../../core/models/device.model';
import { DeviceService } from '../../core/services/device.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        AddDeviceModalComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    devices: Device[] = [];

    stats: DeviceStats = {
        total: 0,
        online: 0,
        offline: 0,
        maintenance: 0,
    };

    loading = false;
    showAddDeviceModal = false;

    constructor(
        private readonly deviceService: DeviceService,
    ) { }

    ngOnInit(): void {
        this.loadDashboard();
    }

    loadDashboard(): void {
        this.loadDevices();
        this.loadStats();
    }

    loadDevices(): void {
        this.loading = true;

        this.deviceService.getDevices().subscribe({
            next: (response) => {
                this.devices = response.data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Failed to load devices:', error);
                this.loading = false;
            },
        });
    }

    loadStats(): void {
        this.deviceService.getStats().subscribe({
            next: (response) => {
                this.stats = response.data;
            },
            error: (error) => {
                console.error('Failed to load stats:', error);
            },
        });
    }

    openAddDeviceModal(): void {
        this.showAddDeviceModal = true;
    }

    closeAddDeviceModal(): void {
        this.showAddDeviceModal = false;
    }

    createDevice(device: Device): void {
        this.deviceService.createDevice(device).subscribe({
            next: () => {
                this.closeAddDeviceModal();
                this.loadDashboard();
            },
            error: (error) => {
                console.error('Failed to create device:', error);
            },
        });
    }

    deleteDevice(id?: string): void {
        if (!id) {
            return;
        }

        const confirmed = confirm(
            'Are you sure you want to delete this device?',
        );

        if (!confirmed) {
            return;
        }

        this.deviceService.deleteDevice(id).subscribe({
            next: () => {
                this.loadDashboard();
            },
            error: (error) => {
                console.error('Failed to delete device:', error);
            },
        });
    }
}