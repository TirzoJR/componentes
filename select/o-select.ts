import { Component, computed, ElementRef, HostListener, inject, Injector, input, OnInit, Optional, Self, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { FormField } from '@core/interfaces/forms.interface';
import { IconComponent } from "../icon/icon.component";

export interface ISelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'o-select',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './o-select.html',
  styleUrl: './o-select.scss',
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  field = input.required<FormField>();
  options = input<ISelectOption[]>([]);
  multiple = input<boolean>(false);
  searchable = input<boolean>(false);
  size = input<'sm' | 'base' | 'lg'>('base');

  isOpen = signal<boolean>(false);
  selectedValue = signal<any>(null);
  disabled = signal<boolean>(false);
  searchOption = signal<string>('');
  position = signal<'bottom' | 'top'>('bottom');
  focusedIndex = signal<number | null>(null);

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  private readonly el = inject(ElementRef);
  private readonly injector = inject(Injector);

  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) this.control.valueAccessor = this;
  }

  ngOnInit() {
    if (this.multiple() && !this.selectedValue()) {
      this.selectedValue.set([]);
    }
  }

  filteredOptions = computed(() => {
    const query = this.searchOption().toLowerCase().trim();
    if (!query) return this.options();
    return this.options().filter(opt => opt.label.toLowerCase().includes(query));
  });

  displayText = computed(() => {
    const val = this.selectedValue();
    if (this.multiple() && Array.isArray(val)) {
      if (val.length === 0) return this.field().placeholder;
      return val.map(v => this.options().find(o => o.value === v)?.label).join(', ');
    }
    return this.options().find(o => o.value === val)?.label ?? this.field().placeholder;
  });

  toggleMenu() {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.calculatePosition();
      if (this.searchable()) setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
    }
    this.focusedIndex.set(null);
  }

  isValueSelected(value: any): boolean {
    const current = this.selectedValue();
    if (!Array.isArray(current)) return false;
    return current.some(v => String(v) === String(value));
  }

  selectOption(option: ISelectOption) {
    if (this.multiple()) {
      const current = this.selectedValue() as any[];
      const exists = current.some(v => String(v) === String(option.value));
      const updated = exists
        ? current.filter(v => String(v) !== String(option.value))
        : [...current, option.value];
      this.selectedValue.set(updated);
      this._onChange(updated.join(','));
    } else {
      this.selectedValue.set(option.value);
      this._onChange(option.value);
      this.isOpen.set(false);
    }
    this._onTouched();
    this.searchOption.set('');
  }

  writeValue(val: any): void {
    if (!val) {
      if (this.multiple()) {
        this.selectedValue.set([]);
      } else {
        this.selectedValue.set(null);
      }
      return;
    }

    if (this.multiple()) {
      let arrayValue: any[] = [];
      if (typeof val === 'string') {
        arrayValue = val.split(',').filter(v => v.trim()).map(v => v.trim());
      } else if (Array.isArray(val)) {
        arrayValue = val;
      }
      this.selectedValue.set(arrayValue);
    } else {
      this.selectedValue.set(val);
    }
  }
  registerOnChange(fn: any): void { this._onChange = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }
  setDisabledState(val: boolean): void { this.disabled.set(val); }
  _onChange = (_: any) => { };
  _onTouched = () => { };

  private calculatePosition() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    this.position.set(spaceBelow < 250 ? 'top' : 'bottom');
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) this.isOpen.set(false);
  }

  get hasError() { return this.control?.invalid && this.control?.touched; }

  get activeErrorMessage(): string | null {
    const ctrl = this.control?.control;
    if (!ctrl?.errors || !ctrl.touched) return null;

    for (const [key, message] of Object.entries(this.field().errorMessages || {})) {
      if (ctrl.hasError(key)) return message as string;
    }
    return null;
  }
}
