import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Injector,
  input,
  OnInit,
  Optional,
  Self,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { FormField } from '@core/interfaces/forms.interface';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'o-input, app-input',
  standalone: true,
  imports: [CommonModule, IconComponent, FormsModule],
  templateUrl: './o-input.html',
  styleUrl: './o-input.scss',
})
export class InputComponent implements OnInit, ControlValueAccessor {
  field = input.required<FormField>();
  size = input<'sm' | 'base' | 'lg'>('base');
  readonly = input<boolean>(false);
  iconPosition = input<'start' | 'end' | undefined>();
  maxlength = input<string | number>('');
  minlength = input<string | number>(0);
  showCounter = input<boolean>(false);

  value = signal<any>('');
  isDisabled = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  currentLength = computed(() => (this.value() || '').toString().length);
  isCounterInvalid = computed(() => this.currentLength() < Number(this.minlength()));

  private readonly injector = inject(Injector);
  private readonly _ngControl!: NgControl;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (!this.field()) throw new Error('InputComponent: [field] es requerido.');
  }

  inputType = computed(() => {
    const attrType = this.field().attributes?.type || 'text';
    if (attrType === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return attrType;
  });

  isPasswordField = computed(() => this.field().attributes?.type === 'password');

  writeValue(value: any): void {
    this.value.set(value);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  _onChange = (_: any) => {};
  _onTouched = () => {};

  handleInput(val: string) {
    this.value.set(val);
    this._onChange(val);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  get activeErrorMessage(): string | null {
    const ctrl = this.control?.control;
    if (!ctrl?.errors || !ctrl.touched) return null;

    for (const [key, message] of Object.entries(this.field().errorMessages || {})) {
      if (ctrl.hasError(key)) return message as string;
    }
    return null;
  }
}
