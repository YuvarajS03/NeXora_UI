import {
    Component,
    EventEmitter,
    Output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Device } from '../../../core/models/device.model';

@Component({
    selector: 'app-add-device-modal',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './add-device-modal.component.html',
    styleUrls: ['./add-device-modal.component.scss'],
})
export class AddDeviceModalComponent {

    @Output() close = new EventEmitter<void>();
    @Output() deviceCreated = new EventEmitter<Device>();

    device: Device = {
        deviceId: '',
        name: '',
        serialNumber: '',
        location: '',
        status: 'OFFLINE',
    };

    closeModal(): void {
        this.close.emit();
    }

    submit(): void {
        if (
            !this.device.deviceId ||
            !this.device.name ||
            !this.device.serialNumber
        ) {
            alert('Please fill all required fields');
            return;
        }

        this.deviceCreated.emit({ ...this.device });
    }
}