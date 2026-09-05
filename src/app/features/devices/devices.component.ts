import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Device } from '../../core/models/device.model';
import { DeviceService } from '../../core/services/device.service';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {

  devices: Device[] = [];
  loading = true;

  constructor(
    private readonly deviceService: DeviceService,
  ) { }

  ngOnInit(): void {
    this.loadDevices();
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
}