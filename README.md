# RecipeHub Frontend

A modern recipe management application built with React, TypeScript, and Material-UI.

## Features

- 🔐 User authentication and authorization
- 📱 Responsive design for all devices
- 📖 Browse and search recipes
- ⭐ Save favorite recipes
- ✏️ Create and edit your own recipes
- 📸 Image upload support
- 🎨 Material Design with custom theming

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Material-UI (MUI)** - Component Library
- **React Query** - Server State Management
- **React Router** - Navigation
- **Axios** - HTTP Client
- **React Hook Form** - Form Management

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000
```
4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   │   ├── common/     # Shared components (Button, Input, etc.)
│   │   └── recipe/     # Recipe-specific components
│   ├── context/        # React Context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── public/             # Static assets
└── index.html         
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Environment Variables

- `VITE_API_URL` - Backend API URL

## Design Decisions

- **Material-UI**: Provides a comprehensive set of pre-built components while allowing for customization
- **React Query**: Handles server state management, caching, and synchronization
- **TypeScript**: Ensures type safety and better developer experience
- **Vite**: Offers faster build times and better development experience compared to Create React App

## API Integration

The frontend communicates with a FastAPI backend. All API calls are centralized in the `services` directory and use Axios for HTTP requests. Authentication is handled via JWT tokens stored in localStorage.

## Styling

- Uses Material-UI's styling solution with emotion
- Custom theme configuration in `src/theme.ts`
- Responsive design breakpoints following Material Design guidelines
- Dark mode support

## Future Improvements

- [ ] Implement recipe sharing
- [ ] Add recipe categories and tags
- [ ] Implement meal planning feature
- [ ] Add recipe scaling functionality
- [ ] Implement offline support with PWA
- [ ] Add recipe import from URLs

## License

MIT
