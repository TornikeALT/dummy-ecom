import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  imports: [MatIconModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() images: string[] = [];
  @Input() selectedImage!: string;
  @Output() close = new EventEmitter<void>();
  currentIndex!: number;

  ngOnInit() {
    this.currentIndex = this.images.indexOf(this.selectedImage);
  }

  handleClose() {
    this.close.emit();
  }
  handleNextImg() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.selectedImage = this.images[this.currentIndex];
  }
  handlePrevImg() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
    this.selectedImage = this.images[this.currentIndex];
  }
}
