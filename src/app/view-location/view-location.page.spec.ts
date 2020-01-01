import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewLocationPage } from './view-location.page';

describe('ViewLocationPage', () => {
  let component: ViewLocationPage;
  let fixture: ComponentFixture<ViewLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
