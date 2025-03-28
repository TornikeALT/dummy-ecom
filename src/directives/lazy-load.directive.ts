import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
})
export class LazyLoadDirective implements OnInit {
  @Input() src!: string;
  @Input() placeholder!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const imgElement = this.el.nativeElement;

    this.renderer.setAttribute(imgElement, 'src', this.placeholder);
    this.renderer.setStyle(imgElement, 'filter', 'blur(10px)');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage(imgElement);
          observer.unobserve(imgElement);
        }
      });
    });

    observer.observe(imgElement);
  }

  private loadImage(imgElement: HTMLImageElement) {
    const highResImg = new Image();
    highResImg.src = this.src;
    highResImg.onload = () => {
      this.renderer.setAttribute(imgElement, 'src', this.src);
      this.renderer.setStyle(imgElement, 'filter', 'blur(0)');
      this.renderer.setStyle(
        imgElement,
        'transition',
        'filter 0.5s ease-in-out'
      );
    };
  }
}
