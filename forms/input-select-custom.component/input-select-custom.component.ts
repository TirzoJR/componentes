import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  OnInit,
  output,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormField } from '../../../interfaces/forms';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-input-select-custom',
  imports: [CommonModule],
  templateUrl: './input-select-custom.component.html',
  styleUrl: './input-select-custom.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectCustomComponent),
      multi: true,
    },
  ],
})
export class InputSelectCustomComponent
  implements ControlValueAccessor, OnInit {

  @Input() field!: FormField;
  @Input() description : string = '';
  @Input() optionsInput: SelectOption[] = [];

  selectedItem = output<string>();

  id = '';

  value = '';

  isDisabled = false;

  ngOnInit(): void {
    this.id =
      this.field?.id ??
      this.field?.label?.replaceAll(' ', '_') ??
      '';
  }

  get isRequired(): boolean {
    return !!this.field?.attributes?.['required'];
  }

  private onChange = (value: string) => {};

  private onTouched = () => {};

  onChangeSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;

    const value = select.value;

    this.value = value;

    // Actualiza el FormControl
    this.onChange(value);

    // Envía el valor seleccionado al padre
    this.selectedItem.emit(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
