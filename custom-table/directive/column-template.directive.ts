import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[column]',
  standalone: true
})
export class ColumnTemplateDirective {
  @Input('column') key!: string
  constructor(public template: TemplateRef<any>) { }
}
