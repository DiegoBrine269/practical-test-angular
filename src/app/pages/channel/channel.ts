import { Component, effect, inject, input } from '@angular/core';
import { Video } from '../../core/services/video';
import { VideoPreview } from '../../components/video-preview/video-preview';

@Component({
  selector: 'app-channel',
  imports: [VideoPreview],


templateUrl: './channel.html',
  styleUrl: './channel.css',
})
export class Channel {

  id = input.required<string>();
  videoService = inject(Video);
  skeletonArray = Array.from({ length: 10 });


  constructor() {
    effect(() => {
        const currentId = this.id();
        this.videoService.getChannel(currentId);
                this.videoService.getChannelVideos(currentId);
    });
  }
}
