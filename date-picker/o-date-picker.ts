import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, EventEmitter, HostListener, inject, input, OnInit, Optional, Output, Self, signal } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@core/interfaces/forms.interface';
import { CalendarComponent } from "../calendar/o-calendar";
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'o-date-picker',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CalendarComponent, IconComponent],
  templateUrl: './o-date-picker.html',
  styleUrl: './o-date-picker.scss'
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  private readonly eRef = inject(ElementRef);
  private readonly fb = inject(FormBuilder);

  field = input<FormField>();
  isRange = input<boolean>(false);
  minDate = input<number | null>(null);
  maxDate = input<number | null>(null);
  showHint = input<boolean>(false);

  @Output() rangeSelected = new EventEmitter<{ start: Date; end: Date | null }>();

  rangeForm!: FormGroup;
  showCalendar = signal<boolean>(false);
  value = signal<any>(null);
  isDisabled = signal<boolean>(false);
  position = signal<'bottom' | 'top'>('bottom');
  rangeStart: Date | null = null;
  rangeEnd: Date | null = null;

  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) this.control.valueAccessor = this;
  }

  transformMinDate = computed(() => {
    const days = this.minDate();
    if (days === null) return null;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  });

  transformMaxDate = computed(() => {
    const days = this.maxDate();
    if (days === null) return null;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  });

  ngOnInit() {
    this.rangeForm = this.fb.group({
      start: [''],
      end: [''],
    });
  }

  writeValue(val: any): void {
    if (val) {
      this.value.set(val);
      this.rangeForm.patchValue({ start: val }, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void { this._onChange = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }
  setDisabledState(val: boolean): void { this.isDisabled.set(val); }

  _onChange = (_: any) => { };
  _onTouched = () => { };

  toggleCalendar() {
    if (this.isDisabled()) return;
    this.showCalendar.update(v => !v);

    if (this.showCalendar()) {
      this.calculatePosition();
    }
  }

  private calculatePosition() {
    const rect = this.eRef.nativeElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    this.position.set(spaceBelow < 380 ? 'top' : 'bottom');
  }

  onRangeSelected(event: { start: Date; end: Date | null }) {
    const { start, end } = event;
    const formattedStart = this.formatDate(start);

    this.rangeForm.get('start')?.setValue(formattedStart);

    if (this.isRange() && end) {
      const formattedEnd = this.formatDate(end);
      this.rangeForm.get('end')?.setValue(formattedEnd);
      this.rangeEnd = end;
      if (this.control) this._onChange(`${formattedStart} - ${formattedEnd}`);
    } else {
      this.rangeForm.get('end')?.setValue('');
      this.rangeEnd = null;
      if (this.control) this._onChange(formattedStart);
    }

    this.rangeStart = start;
    this._onTouched();

    this.rangeSelected.emit({ start, end: this.rangeEnd });
    this.showCalendar.set(false);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showCalendar.set(false);
    }
  }

  get activeErrorMessage(): string | null {
    const ctrl = this.control?.control;
    const fieldData = this.field();

    if (!ctrl?.errors || !ctrl.touched || !fieldData) return null;

    for (const [key, message] of Object.entries(fieldData.errorMessages || {})) {
      if (ctrl.hasError(key)) return message as string;
    }
    return null;
  }

  reset() {
    this.rangeStart = null;
    this.rangeEnd = null;
    this.value.set(null);
    this.rangeForm.reset({ start: '', end: '' });
    if (this.control) this._onChange('');
  }

  private formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }
}
