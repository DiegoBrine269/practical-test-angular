# PracticalTestAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.8.

## Prerequisites

- Node.js 22+
- The backend API running (see [backend repo](link)) or a deployed instance

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Live demo

https://practical-test-orbis.neongonz.com/

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | Home | Search and list videos |
| `/play/:id` | VideoPlayer | Video playback + comments |
| `/channel/:id` | Channel | Channel info |

## Analysis, design and architecture decisions

The /src/app folder contains the main code of this application divided into the following folders:
1. core/services
>Here you can find the video.ts, a file that contains the service, used to keep global status and execute essential functions, specially, the communication with the adonis API. 

2. layouts
>This folder only includes a general component that defines a single layout.

3. pages
>This folder is a representation defined in app.routes.ts.

### Pages folder
Pages folder includes the following components:
1. home: used to display the initial view
2. video-player: used to play videos and show comments.
3. channel: used to display channels' info.

### Key decisions

- **Signals over local state**: search results, loading state, and selected video live in `VideoService` (`providedIn: 'root'`) rather than component state, so they persist across navigation (e.g. going back from `/play/:id` to `/`).
- **`withComponentInputBinding()`**: route params (like `:id`) are bound directly to component inputs instead of using `ActivatedRoute` manually.
- **TailwindCSS** was chosen over pure CSS to increase development speed.
- **Deployment** was automated with docker to ensure a proper operation.
