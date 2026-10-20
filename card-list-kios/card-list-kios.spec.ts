import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListKios } from './card-list-kios';

describe('CardListKios', () => {
  let component: CardListKios;
  let fixture: ComponentFixture<CardListKios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListKios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListKios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
