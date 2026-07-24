import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://practical-test-adonis.neongonz.com/api/v1';

export interface VideoInfo {
  id: {
    videoId: string;
    channelId: string;
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
  };
}

export interface ChannelInfo {
  snippet: {
    title: string,
    description: string
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
  };
}


export interface CommentInfo {
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class Video {
  private http = inject(HttpClient);

  videos = signal<VideoInfo[]>([]);
  comments = signal<CommentInfo[]>([]);
  isLoading = signal(false);
  lastQuery = signal('');
  selectedVideo = signal<VideoInfo | null>(null);

  channel = signal<ChannelInfo | null>(null);
  channelVideos = signal<VideoInfo[]>([]);


  private fetch<T>(url: string, onSuccess: (items: T[]) => void) {
    this.isLoading.set(true);

    this.http.get<{ items: T[] }>(url).subscribe({
      next: (response) => onSuccess(response.items),
      error: () => this.isLoading.set(false),
      complete: () => this.isLoading.set(false),
    });
  }

  search(query: string) {
    this.lastQuery.set(query);
    this.fetch<VideoInfo>(`${API_URL}/videos?q=${query}`, (items) =>
      this.videos.set(items)
    );
  }

  getComments(id: string) {
    this.fetch<CommentInfo>(`${API_URL}/videos/comments?id=${id}`, (items) =>
      this.comments.set(items)
    );
  }

  getChannel(id: string) {
    this.fetch<ChannelInfo>(`${API_URL}/videos/channel?id=${id}`, (items) =>
      this.channel.set(items[0] ?? null)
    );
  }

  selectVideo(video: VideoInfo) {
    this.selectedVideo.set(video);
  }

  getChannelVideos(channelId: string) {
    this.fetch<VideoInfo>(`${API_URL}/videos?channelId=${channelId}`, (items) =>
        this.channelVideos.set(items)
    );
  }
}