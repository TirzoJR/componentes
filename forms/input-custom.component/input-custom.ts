import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Injector, Input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { FormField } from '../../../interfaces/forms';

@Component({
  selector: 'app-input-custom',
  imports: [CommonModule],
  templateUrl: './input-custom.html',
  styleUrl: './input-custom.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCustomComponent),
      multi: true,
    },
  ],
})
export class InputCustomComponent implements ControlValueAccessor, OnInit {
  @Input() field!: FormField;
  @Input() isSearch: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition!: 'left' | 'right';
  @Input() description: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isReadonly: boolean = false;
  @Input() value: string = '';
  @Input() enablePasswordToggle: boolean = false;

  id: string = '';

  showPassword = signal(false);

  private onChange = (value: string) => {};
  private onTouched = () => {};

  private readonly injector = inject(Injector);

  private get ngControl(): NgControl | null {
    return this.injector.get(NgControl, null);
  }

  ngOnInit(): void {
    this.id = this.field?.id ?? this.field?.label?.replaceAll(' ', '_') ?? '';
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  get isPasswordField(): boolean {
    return this.field?.attributes?.['type'] === 'password' && this.enablePasswordToggle;
  }

  get type(): string {
    if (this.isPasswordField) {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.field?.attributes?.['type'] ?? 'text';
  }

  get placeholder(): string {
    return this.field?.attributes?.['placeholder'] ?? this.field?.placeholder ?? '';
  }

  get maxLength(): number {
    return this.field?.attributes?.['maxLength'] ?? 20;
  }

  get minLength(): number {
    return this.field?.attributes?.['minLength'] ?? 0;
  }

  get isRequired(): boolean {
    return !!this.field?.attributes?.['required'];
  }

  get errorMessage(): string {
    const control = this.ngControl?.control;

    if (!control || (!control.touched && !control.dirty) || !control.errors) {
      return '';
    }

    return (
      (Object.entries(this.field?.errorMessages ?? {}).find(([error]) =>
        control.hasError(error),
      )?.[1] as string) ?? ''
    );
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (this.maxLength && value.length > this.maxLength) {
      value = value.slice(0, this.maxLength);
      input.value = value;
    }

    this.value = value;
    this.onChange(value);
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

  onBlur(): void {
    this.onTouched();
  }
}
