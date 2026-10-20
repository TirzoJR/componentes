import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, Input, output } from '@angular/core';
import { DataFilterButton } from '../../interfaces/recibe.interface';
import { ButtonFilterComponent } from "../button-filter.component/button-filter.component";


@Component({
  selector: 'app-filter-options',
  imports: [CommonModule, ButtonFilterComponent],
  templateUrl: './filter-options.component.html',
  styleUrl: './filter-options.component.css',
})
export class FilterOptionsComponent implements AfterContentInit {
  @Input() filters: DataFilterButton[] = [];
  @Input() needSeparator: boolean = true;
  selected = output<string>();
  selectItem:string = '';


  ngAfterContentInit(){
    this.selectItem = this.filters[0].title
  }

  select(title:string){
    this.selected.emit(title);
    this.selectItem = title;
  }
}
