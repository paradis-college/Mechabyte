# Mechabyte Website

![Mechabyte Banner](/public/banner.png)

Official website for **Mechabyte #22590**, a FIRST Tech Challenge (FTC) robotics team from Paradise International College in Iași, Romania. This website showcases our team, robots, achievements, community outreach efforts, and sponsors.

## 🚀 About the Project

The Mechabyte website is built with modern web technologies to provide an engaging, bilingual experience for visitors interested in learning about our robotics team. The site features interactive components, smooth animations, and a responsive design that works seamlessly across all devices.

### Key Features

- **Bilingual Support**: Full English and Romanian language support
- **Interactive Components**: Robot arm animation, gear conveyors, and micro-interactions
- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Multiple Pages**:
  - Home - Team introduction and overview
  - Team - Meet our team members
  - Portfolio - Our robots and achievements
  - Outreach - Community engagement activities
  - Sponsors - Our valued supporters
  - Contact - Get in touch with us
- **Accessibility**: Built with accessibility best practices, including reduced motion support
- **Performance**: Optimized for fast loading and smooth animations

## 🛠️ Technology Stack

- **Framework**: [Vue 3](https://vuejs.org/) with Composition API (`<script setup>`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Router**: [Vue Router 4](https://router.vuejs.org/)
- **Styling**: CSS with scoped styles
- **Graphics**: [p5.js](https://p5js.org/) for creative coding elements

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

To verify your installations, run:

```bash
node --version
npm --version
git --version
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/paradis-college/Mechabyte.git
cd Mechabyte
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Start the Development Server

```bash
npm run dev
```

This will start the Vite development server. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## 📜 Available Scripts

### Development

- **`npm run dev`** - Start the development server with hot module replacement (HMR)
- **`npm run type-check`** - Run TypeScript type checking

### Production

- **`npm run build`** - Build the project for production
  - Runs type checking and builds optimized assets
  - Output is generated in the `dist/` directory
- **`npm run preview`** - Preview the production build locally
- **`npm run build-only`** - Build without type checking (not recommended)

## 📁 Project Structure

```
Mechabyte/
├── public/              # Static assets (favicon, images)
│   └── banner.png
├── src/
│   ├── assets/          # Images, styles, and other assets
│   │   ├── images/
│   │   └── styles/
│   ├── components/      # Reusable Vue components
│   │   ├── NavBar.vue
│   │   ├── GearConveyor.vue
│   │   ├── HeroRobotArm.vue
│   │   ├── MicroButton.vue
│   │   └── ...
│   ├── composables/     # Vue composables (reusable logic)
│   │   └── useRevealOnScroll.ts
│   ├── data/            # Static data files
│   ├── hooks/           # Custom hooks
│   ├── i18n/            # Internationalization (translations)
│   │   └── translations.ts
│   ├── router/          # Vue Router configuration
│   │   └── index.ts
│   ├── views/           # Page components
│   │   ├── Home.vue
│   │   ├── Team.vue
│   │   ├── Portfolio.vue
│   │   ├── Outreach.vue
│   │   ├── Sponsors.vue
│   │   └── Contact.vue
│   ├── App.vue          # Root component
│   └── main.ts          # Application entry point
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## 🎨 Styling Guidelines

- Use **CSS custom properties** (variables) defined in global styles
- Available CSS variables include: `--background-grey`, `--mechabyte-green`
- Use **scoped styles** in Vue components with `<style scoped>`
- Use **viewport units** (vw, vh) for responsive sizing
- Mobile breakpoint: `1000px`

## 🌍 Internationalization

The website supports both English (`en`) and Romanian (`ro`). Translations are managed in `/src/i18n/translations.ts`.

When adding new text content:

1. Add the key to the `Translation` interface
2. Provide translations for both languages in the `translations` object
3. Use the translation in your component: `t.yourTranslationKey`

## 🤝 Contributing

We welcome contributions from team members and the community! Here's how you can help:

### Quick Edits (For Simple Text Changes)

1. Navigate to the file you want to edit on GitHub
2. Click the pencil icon (✏️) to edit
3. Make your changes
4. Propose changes via pull request

### Full Development Workflow

1. **Fork and Clone**

   ```bash
   git clone https://github.com/paradis-college/Mechabyte.git
   cd Mechabyte
   ```

2. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**

   - Follow the existing code style and conventions
   - Test your changes locally with `npm run dev`
   - Run type checking with `npm run type-check`

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub.

### Code Review Guidelines

- Ensure your code passes type checking (`npm run type-check`)
- Test on multiple screen sizes
- Verify both English and Romanian translations
- Check accessibility (keyboard navigation, screen readers)
- Follow the repository's [Copilot Instructions](/.github/copilot-instructions.md)

## 📚 Additional Documentation

- **[COMPONENTS.md](./COMPONENTS.md)** - Detailed component documentation
- **[MANUAL_QA_GUIDE.md](./MANUAL_QA_GUIDE.md)** - Quality assurance testing guide

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**

```bash
npm run type-check
```

Fix any TypeScript errors reported.

**Port already in use:**

```bash
# Kill the process using the port or specify a different port
npm run dev -- --port 3000
```

**Dependencies not installing:**

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is maintained by Mechabyte #22590, Paradise International College, Iași, Romania.

## 📞 Contact

- **Team**: Mechabyte #22590
- **Location**: Paradise International College, Iași, Romania
- **Competition**: FIRST Tech Challenge (FTC)

For questions or collaboration opportunities, please visit the Contact page on our website.

---

**Built with ❤️ by Mechabyte** | _Inspiring innovation through robotics_
