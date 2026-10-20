import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
  selector: '[columnHeader]',
  standalone: true
})
export class ColumnHeaderTemplateDirective {
  @Input('columnHeader') key!: string;
  constructor(public template: TemplateRef<any>) { }
}

