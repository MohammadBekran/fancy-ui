# Fancy UI

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A modern, accessible, and highly customizable React component library built with TypeScript and Tailwind CSS.

</div>

## Overview

Fancy UI is a production-ready component library designed for building modern web applications. It provides a comprehensive set of accessible, performant, and customizable UI components that follow the latest web standards and best practices.

### Key Features

- 🎨 **Modern Design System**: Clean, consistent, and professional-looking components
- ♿ **Accessibility First**: WCAG 2.1 compliant with full keyboard navigation and screen reader support
- 🚀 **Performance Optimized**: Minimal bundle size and optimized rendering
- 🛠️ **Developer Experience**: TypeScript support, comprehensive documentation, and Storybook integration
- 🧪 **Quality Assurance**: Extensive test coverage and strict type checking

## Core Components

### Button

```tsx
import { Button } from "@mohammadbekran/fan wecy-ui";

// Primary button with loading state
<Button
  variant="primary"
  isLoading={true}
  onClick={() => console.log('clicked')}
>
  Submit
</Button>

// Secondary button with icon
<Button
  variant="secondary"
  leftIcon={<IconComponent />}
>
  Download
</Button>

// Ghost button with right icon
<Button
  variant="ghost"
  rightIcon={<IconComponent />}
>
  Learn More
</Button>
```

### Calendar

```tsx
import { Calendar } from "@mohammadbekran/fancy-ui";

// Basic date picker
<Calendar
  value={date}
  onChange={setDate}
/>

// Range selection with custom styling
<Calendar
  mode="range"
  value={dateRange}
  onChange={setDateRange}
  className="custom-calendar"
/>
```

### Modal

```tsx
import { Modal } from "@mohammadbekran/fancy-ui";

<Modal title="Confirmation" isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
  <div className="p-4">
    <p>Are you sure you want to proceed?</p>
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  </div>
</Modal>;
```

## Getting Started

### Installation

```bash
# Using npm
npm install @mohammadbekran/fancy-ui

# Using yarn
yarn add @mohammadbekran/fancy-ui

# Using pnpm
pnpm add @mohammadbekran/fancy-ui
```

### Configuration

#### Vite Projects

1. First, install Tailwind CSS if you haven't already:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Add the following imports to your `src/index.css`:

```css
@import "tailwindcss";

@source "../node_modules/@mohammadbekran/fancy-ui/dist/**/*.{js,ts,jsx,tsx}";
@import "../node_modules/@mohammadbekran/fancy-ui/dist/fancy-ui.css";
```

#### Next.js Projects

1. Install Tailwind CSS if you haven't already:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Add the following imports to your `app/globals.css` or `styles/globals.css`:

```css
@import "tailwindcss";

@source "../../node_modules/@mohammadbekran/fancy-ui/**/*.{js,ts,jsx,tsx}";
@import "../../node_modules/@mohammadbekran/fancy-ui/dist/fancy-ui.css";
```

### Usage

Import components directly from the package:

```tsx
import { Button, Calendar, Modal } from "@mohammadbekran/fancy-ui";

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Calendar />
      <Modal>Content</Modal>
    </div>
  );
}
```

### TypeScript Support

The library is built with TypeScript and includes comprehensive type definitions. All components are fully typed, providing excellent IDE support and type safety.

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Considerations

- Components are tree-shakeable, ensuring minimal bundle size
- CSS is optimized and purged in production builds
- Components use React.memo where appropriate for optimal rendering performance

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/MohammadBekran/fancy-ui.git

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run Storybook
pnpm storybook
```

### Available Scripts

| Script               | Description                   |
| -------------------- | ----------------------------- |
| `pnpm dev`           | Start development server      |
| `pnpm build`         | Build the library             |
| `pnpm test`          | Run tests                     |
| `pnpm test-coverage` | Generate test coverage report |
| `pnpm storybook`     | Start Storybook               |
| `pnpm lint`          | Run ESLint                    |
| `pnpm format`        | Format code with Prettier     |

## Project Structure

```
fancy-ui/
├── src/
│   ├── app/              # Application entry point
│   ├── assets/           # Static assets (images)
│   ├── components/       # Shared UI components
│   │   └── spinner.tsx   # Loading spinner component
│   ├── core/            # Core utilities and configurations
│   ├── features/        # Feature-specific components
│   │   ├── button/      # Button component and its variants
│   │   ├── calendar/    # Calendar component
│   │   ├── input/       # Input component
│   │   └── modal/       # Modal component
│   ├── test/           # Test utilities and setup
│   ├── index.css       # Global styles
│   └── main.tsx        # Application entry point
├── .storybook/         # Storybook configuration
├── public/            # Public static assets
├── .husky/           # Git hooks configuration
├── vitest.config.ts  # Vitest configuration
├── vite.config.ts    # Vite configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Project dependencies and scripts
```

## Testing

The library uses Vitest and React Testing Library for comprehensive testing:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test-coverage

# Run tests with UI
pnpm test:ui
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks

## Performance

Fancy UI is optimized for performance:

- Tree-shakeable components
- Minimal runtime overhead
- Optimized bundle size
- Efficient re-rendering
- Lazy loading support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Radix UI](https://www.radix-ui.com/) - For accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Storybook](https://storybook.js.org/) - For component documentation
- [Vitest](https://vitest.dev/) - For testing

## Support

For support, please:

- Open an issue on GitHub
- Check the documentation

---

Built with ❤️ by [Mohammad Bekran](https://github.com/MohammadBekran)
