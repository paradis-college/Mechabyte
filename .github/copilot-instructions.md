# Copilot Instructions for Mechabyte

## Project Overview

This is the official website for Mechabyte (#22590), a robotics team from Paradise International College in Iași, Romania, competing in the FIRST Tech Challenge (FTC).

## Technology Stack

- **Framework**: Vue 3 with Composition API (`<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Scoped CSS within Vue components

## Code Style and Conventions

### Vue Components

- Always use Vue 3 Composition API with `<script setup lang="ts">`
- Use TypeScript for type safety
- Prefer `ref` and `computed` from Vue for reactive state
- Keep component logic organized and maintainable
- Use scoped styles in `<style scoped>` sections

### TypeScript

- Define proper types for all data structures
- Use interfaces or type aliases for complex objects
- Avoid using `any` type - be explicit with types
- Follow the existing type definitions pattern (see `Member`, `Translation` types in App.vue)

### Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for component names
- Use kebab-case for file names with Vue components

### Styling

- Use CSS custom properties (CSS variables) defined in the global styles
- Available CSS variables: `--background-grey`, `--mechabyte-green`
- Use viewport units (vw) for responsive sizing where appropriate
- Include responsive designs with `@media` queries for mobile devices (breakpoint at 1000px)

## Project Structure

```
src/
├── App.vue           # Main application component
├── main.ts          # Application entry point
├── components/      # Reusable Vue components
│   ├── NavigationButton.vue
│   ├── TeamMemberCard.vue
│   └── icons/
└── assets/         # Static assets (images, etc.)
```

## Development Workflow

### Building and Testing

- Install dependencies: `npm install`
- Run development server: `npm run dev`
- Type check: `npm run type-check`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

### Important Notes

- Always run `npm run type-check` before committing
- Test responsive design at mobile breakpoints
- The project supports bilingual content (English and Romanian)

## Content Guidelines

### Bilingual Support

- The site supports English (en) and Romanian (ro) languages
- When adding new text content, always provide both English and Romanian translations
- Update the `translations` object in App.vue with both language versions
- Follow the existing translation structure pattern

### Team Information

- Team members are organized by department: Technical, Non-Technical, and Mentor
- Each member has: name, department, and optional role
- Maintain alphabetical or logical ordering within departments

## Special Considerations

### Accessibility

- Use semantic HTML elements
- Include proper alt text for images
- Use ARIA labels where appropriate (see language toggle buttons)
- Ensure keyboard navigation works for interactive elements

### Performance

- Optimize images before adding them to the project
- Keep bundle size minimal - avoid unnecessary dependencies
- Use lazy loading for large assets when appropriate

## Common Tasks

### Adding a Team Member

1. Update the `members` array in App.vue
2. Ensure the member object includes: name, department, and role (optional)
3. Place in the appropriate department section

### Adding New Content Section

1. Add translation keys to both `en` and `ro` in the `translations` object
2. Update the `Translation` type to include new keys
3. Add the section in the template using the translation references
4. Style using scoped CSS with existing design patterns

### Updating Styles

1. Check if a CSS variable exists for the color/value
2. Use viewport units for responsive sizing
3. Test changes at mobile breakpoint (< 1000px)
4. Follow the existing spacing and layout patterns

## Best Practices

- Keep changes minimal and focused
- Test in both English and Romanian languages
- Verify responsive design on mobile
- Run type-check before committing
- Follow the existing code patterns and structure
- Write clear commit messages following the team's convention
