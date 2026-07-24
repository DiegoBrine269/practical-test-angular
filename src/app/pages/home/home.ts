import { Component, inject, signal } from '@angular/core';
import { Video } from '../../core/services/video';
import { VideoPreview } from '../../components/video-preview/video-preview';


@Component({
  selector: 'app-home',
  imports: [VideoPreview],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  videoService = inject(Video);
  videos = signal<any[]>([]);
  isLoading = signal(false);
  skeletonArray = Array.from({ length: 10 });

  searchVideos(query: string) {
    this.videoService.search(query);
  }
}
