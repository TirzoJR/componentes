import { Component, inject } from '@angular/core';
import { LoadingTableService } from '../../services/loading-table/loading-table.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-loader',
  imports: [CommonModule],
  templateUrl: './table-loader.html',
  styleUrl: './table-loader.scss'
})
export class TableLoaderComponent {
  private readonly _loadingTableService = inject(LoadingTableService);
  readonly isLoading$ = this._loadingTableService.loading$;
}
