import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecettesPage } from './recettes.page';

describe('RecettesPage', () => {
  let component: RecettesPage;
  let fixture: ComponentFixture<RecettesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecettesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
