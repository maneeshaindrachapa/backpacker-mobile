import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingsPage } from './readings.page';

describe('ReadingsPage', () => {
  let component: ReadingsPage;
  let fixture: ComponentFixture<ReadingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
