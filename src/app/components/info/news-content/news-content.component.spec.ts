import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsContentomponent } from './news-content.component';


describe('NewsContentomponent', () => {
  let component: NewsContentomponent;
  let fixture: ComponentFixture<NewsContentomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsContentomponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsContentomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
