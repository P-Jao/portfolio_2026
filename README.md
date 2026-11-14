# Portfolio 2026

A multi-page Vue 3 portfolio built with Vue Router and Vite.

## Pages

- `/` — introduction and featured-project carousel
- `/projects` — project explorer and screenshot viewer
- `/skills` — interactive skills editor
- `/experience` — work history
- `/contact` — contact details and social links

The supplied sample portfolio content is in `src/data/portfolio.ts`.

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
```

## Lint

```sh
npm run lint
```

The application uses HTML5 history routing. Configure production hosting to serve `index.html` for unknown paths so that direct visits to nested routes work.

For Vue single-file component type support, use [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) in VS Code.
