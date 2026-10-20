import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-load-data',
  imports: [CommonModule, Icon],
  templateUrl: './load-data.component.html',
  styleUrl: './load-data.component.css',
})
export class LoadDataComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileError = new EventEmitter<string>();
  @Input() iconName: string = 'upload';
  @Input() title: string = '';
  @Input() description: string = '';

  fileDrop(event: DragEvent): void {
    event.preventDefault();

    const file = event.dataTransfer?.files[0];

    this.fileInput({ target: { files: [file] } });
  }

  fileInput(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const isCsv = file.type === 'text/csv' || file.name.endsWith('.csv');
      const isSizeValid = file.size <= 4 * 1024 * 1024;

      if (!isCsv) {
        this.fileError.emit('Solo se permiten archivos CSV.');
        return;
      }

      if (!isSizeValid) {
        this.fileError.emit('El archivo supera los 4 MB permitidos.');
        return;
      }

      this.fileSelected.emit(file);
      event = null;
    }
    input.value = '';
  }
}
