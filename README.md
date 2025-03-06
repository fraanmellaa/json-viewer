<div align="center">
  <a href="https://sharejson.franmella.dev">
    <img
      src="https://sharejson.franmella.dev/favicon.png"
      alt="@franmella/json-viewer"
      height="60"
    />
  </a>
  <p />
  <p>
    <b>
      Preview JSON in a beautiful way
    </b>
  </p>

<a href="https://sharejson.franmella.dev/docs">Documentation</a>
<span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
<a href="https://sharejson.franmella.dev/docs#getting-started">Getting Started</a>
<span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
<a href="#-contributing">Contribute</a>
<span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
<a href="#-license">License</a>

</div>

<div align="center">

![React Badge](https://img.shields.io/badge/Library-61DAFB?logo=react&logoColor=000&style=flat)
![Next.js Badge](https://img.shields.io/badge/Docs-000?logo=nextdotjs&logoColor=fff&style=flat)
![Vitest Badge](https://img.shields.io/badge/Testing-6E9F18?logo=vitest&logoColor=fff&style=flat)
![GitHub releases](https://img.shields.io/badge/Version-3.0.2-informational?style=flat-square)

</div>

## 🪐 Features

- [x] 🍂 Lightweight.
- [x] ✅ Accessible.
- [x] 🎨 Full customizable.
- [x] 💙 Built completely with Typescript.

## 🚀 Getting Started

> [!IMPORTANT]
> This library requires **React v18** or higher.

1. Install the library:

```bash
# Using npm:
npm install @franmella/json-viewer

# Using pnpm:
pnpm add @franmella/json-viewer

# Using yarn:
yarn install @franmella/json-viewer
```

2. Add the component:

```tsx
// 📃 app.jsx

import { JsonViewer } from "@franmella/json-viewer";

export default function App() {
  return (
    <div>
      <JsonViewer />
    </div>
  );
}
```

3. Usage:

```jsx
// 📃 app.jsx

import { JsonViewer } from "@franmella/json-viewer";

export default function App() {
  const json = {
    name: "John Doe",
    age: 30,
    cars: [
      { name: "Ford", models: ["Fiesta", "Focus", "Mustang"] },
      { name: "BMW", models: ["320", "X3", "X5"] },
      { name: "Fiat", models: ["500", "Panda"] },
    ],
  };

  return (
    <div>
      <JsonViewer data={json} />
    </div>
  );
}
```

> [!TIP]
> 📚 Visit the [**Documentation**](https://sharejson.franmella.dev/docs) for more information.

## 🤝 Contributing

1. [Click here to fork](https://github.com/fraanmellaa/json-viewer/fork) the repository.

2. Install dependencies:

```bash
# Install pnpm globally if you don't have it:
npm install -g pnpm

# and install dependencies:
pnpm install
```

3. Commands:

```bash
# Run all development server:
pnpm dev

# Build the library:
pnpm build
```

and create a pull request with your features or fixes 🚀✨.

<a href="https://github.com/fraanmellaa/json-viewer/graphs/contributors">
  <img src="[https://contrib.rocks/image?repo=fraanmellaa/json-viewer](https://contrib.rocks/image?repo=fraanmellaa/json-viewer)" />
</a>

## 📃 License

[MIT License](https://github.com/fraanmellaa/json-viewer/blob/main/LICENSE) - [**franmella**](https://franmella.dev) 2025.
