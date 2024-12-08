import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjouterModifierPage } from './ajouter-modifier.page';

describe('AjouterModifierPage', () => {
  let component: AjouterModifierPage;
  let fixture: ComponentFixture<AjouterModifierPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterModifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
