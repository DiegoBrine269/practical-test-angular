import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { VideoPlayer } from './pages/video-player/video-player';
import { Channel } from './pages/channel/channel';
 

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'play/:id',
        component: VideoPlayer
      },
      {
        path: 'channel/:id',
        component: Channel
      }
    ]
  }
];
