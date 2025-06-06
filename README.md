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
import { Button } from "@mohammadbekran/fancy-ui";

// Primary button with loading state
<Button
  variant="primary"
  size="md"
  isLoading={true}
  onClick={() => console.log('clicked')}
>
  Submit
</Button>

// Secondary button
<Button
  variant="secondary"
  size="lg"
>
  Download
</Button>

// Outline button
<Button
  variant="outline"
  size="sm"
>
  Cancel
</Button>
```

### Calendar

```tsx
import { Calendar } from "@mohammadbekran/fancy-ui";

// Basic date picker
<Calendar
  selected={date}
  onSelect={setDate}
  showOutsideDays
  placeholder="Select date"
/>

// Date range picker with constraints
<Calendar
  enableRange
  selected={dateRange}
  onSelect={setDateRange}
  minDate={new Date()}
  maxDate={addMonths(new Date(), 3)}
  showWeekNumbers
  fixedWeeks
  locale="en-US"
/>
```

### Modal

```tsx
import { Modal } from "@mohammadbekran/fancy-ui";

// Basic modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmation"
  description="Are you sure you want to proceed?"
  size="md"
  showCloseButton
  closeOnOutsideClick
>
  <div className="p-4">
    <p>Modal content goes here</p>
  </div>
</Modal>

// Modal with custom trigger
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Settings"
  size="lg"
  trigger={<Button>Open Settings</Button>}
  classes={{
    overlay: "bg-black/60",
    content: "bg-gray-50",
    title: "text-xl font-bold",
    closeButton: "hover:bg-gray-200"
  }}
>
  <div className="p-4">
    <p>Settings content</p>
  </div>
</Modal>
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
│   ├── assets/           # Static assets (images, fonts, etc.)
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

---

Built with ❤️ by [Mohammad Bekran](https://github.com/MohammadBekran)
