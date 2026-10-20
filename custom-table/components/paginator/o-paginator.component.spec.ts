import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPaginatorComponent } from './o-paginator.component';

describe('PaginatorComponent', () => {
  let component: OPaginatorComponent;
  let fixture: ComponentFixture<OPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OPaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
