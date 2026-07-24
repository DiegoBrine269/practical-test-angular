import { Component, input, inject, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Video, VideoInfo } from '../../core/services/video';

@Component({
  standalone: true,
  selector: 'app-video-preview',
  imports: [NgOptimizedImage],
  templateUrl: './video-preview.html',
  styleUrls: ['./video-preview.css'],
})
export class VideoPreview {
  videoInfo = input.required<VideoInfo>();

  title = computed(() => this.videoInfo().snippet.title);
  thumbnailUrl = computed(() => this.videoInfo().snippet.thumbnails.high.url);
  videoId = computed(() => this.videoInfo().id.videoId);
  channelId = computed(() => this.videoInfo().id.channelId);
  


  private videoService = inject(Video);
  private router = inject(Router);

  onSelect() {
    // Case 1: Is a video 
    if(this.videoId()){
        this.videoService.selectVideo(this.videoInfo());
        this.router.navigate(['/play', this.videoId()]);
        return
    }
    
    // Case 2: Is a channel
    if(this.channelId()){
        this.router.navigate(['/channel', this.channelId()]);
        return
    }
  }
}