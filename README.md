# RecursosHumanosFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (see Environment Configuration below)
4. Start the development server: `npm start`

## Environment Configuration

The application uses environment variables to configure the API endpoint.

### For Development

1. Copy the example environment file:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.local.ts
   ```

2. Edit `src/environments/environment.local.ts` and set your local API URL:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://127.0.0.1:8080/api' // Your local backend URL
   };
   ```

3. The application will automatically use `environment.local.ts` if it exists, otherwise it falls back to `environment.ts`.

### For Production

The production build uses `environment.prod.ts`. Update the `apiUrl` with your production API endpoint before deploying.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
