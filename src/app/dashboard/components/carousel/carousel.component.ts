import { Component, Input } from '@angular/core';
import { CarouselImage } from './models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input()
  images: CarouselImage[] = [];

  @Input()
  indicators = true;

  @Input()
  controls = true;

  @Input()
  autoSlide = true;

  @Input()
  slideInterval = 3000;

  selectedIndex: number = 0;

  constructor() {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  selectImage(i: number): void {
    this.selectedIndex = i;
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }
}
