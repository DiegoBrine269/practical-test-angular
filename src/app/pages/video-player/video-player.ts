import { Component, input, computed, inject, signal, effect,  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '../../core/services/video';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-video-player',
  imports: [DatePipe],
  templateUrl: './video-player.html',
  styleUrl: './video-player.css',
})
export class VideoPlayer {
  id = input.required<string>();


  private sanitizer = inject(DomSanitizer);
  videoService = inject(Video);

  video = computed(() => this.videoService.selectedVideo());
  comments = signal<any[]>([]);

  embedUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.id()}`
    )
  );

  constructor() {
    effect(() => {
        const currentId = this.id();
        this.videoService.getComments(currentId);
    });
  }

  
}