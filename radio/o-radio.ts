import { CommonModule } from '@angular/common';
import { Component, input, Optional, Self, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { ISelectOption } from '../select/o-select'; // Reutilizamos la interfaz

@Component({
  selector: 'o-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './o-radio.html',
  styleUrl: './o-radio.scss'
})
export class RadioComponent implements ControlValueAccessor {
  options = input.required<ISelectOption[]>();
  name = input.required<string>();
  label = input<string>('');
  inline = input<boolean>(true);

  value = signal<any>(null);
  disabled = signal<boolean>(false);

  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) this.control.valueAccessor = this;
  }

  select(val: any) {
    if (this.disabled()) return;
    this.value.set(val);
    this._onChange(val);
    this._onTouched();
  }

  writeValue(val: any): void { this.value.set(val); }
  registerOnChange(fn: any): void { this._onChange = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }
  setDisabledState(val: boolean): void { this.disabled.set(val); }

  _onChange = (_: any) => { };
  _onTouched = () => { };

  get hasError() { return this.control?.invalid && this.control?.touched; }
}
