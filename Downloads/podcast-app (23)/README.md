# Podcast Explorer - Advanced React Podcast Discovery App

A comprehensive React application for discovering, searching, filtering, and sorting podcast shows with real-time updates and seamless user experience. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This application fulfills all user stories P3.53-P3.71 for advanced podcast browsing functionality, providing users with powerful tools to discover podcasts through intelligent search, filtering, and sorting capabilities.

## ✨ Key Features

### 🔍 **Advanced Search (P3.53-P3.55)**
- **Real-time Search**: Search updates dynamically as you type with 300ms debouncing
- **Flexible Matching**: Find podcasts by any part of the title or description
- **Instant Results**: Search results update immediately without losing pagination or filters
- **Search Highlighting**: Visual highlighting of search terms in results
- **Search Persistence**: Search state maintained across page navigation

### 📊 **Intelligent Sorting (P3.56-P3.58)**
- **Date Sorting**: Sort by last updated date with newest shows first
- **Alphabetical Sorting**: Sort by title in both A-Z and Z-A order
- **Combined Sorting**: Sorting works seamlessly with search and filter criteria
- **Visual Indicators**: Clear icons and labels for each sorting option

### 🎛️ **Genre Filtering (P3.59-P3.61)**
- **Multi-Select Filtering**: Select multiple genres simultaneously
- **Visual Feedback**: Selected genres highlighted with badges
- **Filter Persistence**: Selections persist during navigation and state updates
- **Combined Filtering**: Filters work together with search and sort functionality
- **Quick Removal**: Easy removal of individual filters with X buttons

### 📄 **Smart Pagination (P3.62-P3.65)**
- **Manageable Chunks**: Display 12 podcasts per page for optimal performance
- **Numbered Navigation**: Navigate through pages with numbered buttons and Previous/Next
- **State Preservation**: All search, filter, and sort criteria maintained when changing pages
- **Smart Pagination**: Ellipsis handling for large page counts
- **Results Summary**: Clear indication of current page and total results

### 🔄 **State Synchronization (P3.66-P3.69)**
- **Unified State Management**: All UI controls synchronized using React state
- **Immediate Updates**: Changes reflected instantly across all components
- **Session Persistence**: User choices maintained throughout the browsing session
- **Clean Architecture**: Well-organized state management with clear separation of concerns

### 📝 **Code Quality (P3.70-P3.71)**
- **Comprehensive Documentation**: JSDoc comments for all major functions and modules
- **Consistent Formatting**: Uniform code style across JavaScript, TypeScript, and CSS files
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Best Practices**: Following React and Next.js best practices throughout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd podcast-explorer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000` to explore the application

## 📖 How to Use

### Search Functionality
1. **Type in the search bar** to find podcasts by title or description
2. **Search updates automatically** as you type (with smart debouncing)
3. **Clear search** using the X button in the search field
4. **Search terms are highlighted** in yellow in the results

### Sorting Options
1. **Click the Sort dropdown** to choose your preferred sorting method:
   - **Newest First**: Shows most recently updated podcasts
   - **Title A-Z**: Alphabetical order from A to Z
   - **Title Z-A**: Reverse alphabetical order from Z to A

### Genre Filtering
1. **Click on genre badges** to filter podcasts by category
2. **Multiple genres** can be selected simultaneously
3. **Active filters** are shown at the top with easy removal options
4. **Selected genres** are highlighted in blue

### Navigation
1. **Use pagination controls** at the bottom to navigate through results
2. **Page numbers** show your current position
3. **Previous/Next buttons** for easy navigation
4. **All filters and search terms** are preserved when changing pages

### Clearing Filters
1. **"Clear All" button** resets all filters, search, and sorting
2. **Individual filter removal** using X buttons on active filter badges
3. **Search clearing** using the X button in the search field

## 🏗️ Technical Architecture

### Project Structure
\`\`\`
app/
├── page.tsx              # Main application component with all functionality
├── data.ts               # Genre mapping and utility functions
├── layout.tsx            # Root layout with metadata
├── globals.css           # Global styles and Tailwind configuration
└── components/ui/        # Reusable UI components (shadcn/ui)
\`\`\`

### Key Components

#### **Main App Component (`page.tsx`)**
- Manages all application state (search, filters, sorting, pagination)
- Handles API data fetching from `https://podcast-api.netlify.app`
- Implements real-time search with debouncing
- Coordinates all user interactions and state updates

#### **PodcastCard Component**
- Displays individual podcast information
- Implements search term highlighting
- Shows genre badges and metadata
- Responsive design for all screen sizes

#### **PaginationControls Component**
- Handles page navigation with smart ellipsis
- Maintains state across page changes
- Shows current position and total results
- Responsive button layout

### State Management
- **React Hooks**: `useState`, `useEffect`, `useMemo`, `useCallback`
- **Debounced Search**: 300ms delay for optimal performance
- **Memoized Calculations**: Efficient filtering and sorting
- **State Persistence**: Maintains user selections across navigation

### API Integration
- **Endpoint**: `https://podcast-api.netlify.app`
- **Data Processing**: Real-time filtering and sorting of API data
- **Error Handling**: Comprehensive error states and retry functionality
- **Loading States**: Smooth loading indicators

## 🎨 Design & Styling

### UI Framework
- **Tailwind CSS**: Utility-first styling approach
- **shadcn/ui**: Consistent, accessible component library
- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern Aesthetics**: Clean, professional interface

### Visual Features
- **Search Highlighting**: Yellow highlighting for search terms
- **Status Indicators**: Color-coded badges for genres and filters
- **Loading States**: Animated spinners and skeleton loading
- **Hover Effects**: Interactive feedback on all clickable elements

## 🔧 Performance Optimizations

- **Debounced Search**: Prevents excessive API calls during typing
- **Memoized Calculations**: Efficient re-rendering with `useMemo`
- **Lazy Loading**: Images loaded on demand
- **Pagination**: Reduces DOM load by limiting displayed items
- **Optimized State Updates**: Minimal re-renders with `useCallback`

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adaptive grid layouts
- **Desktop Enhancement**: Full-featured experience on larger screens
- **Touch-Friendly**: Appropriate touch targets and interactions

## 🧪 User Story Compliance

### ✅ **Search (P3.53-P3.55)**
- [x] Search by any part of show title
- [x] Dynamic search updates as user types
- [x] Results update without losing pagination/filters

### ✅ **Sorting (P3.56-P3.58)**
- [x] Sort by last updated date (newest first)
- [x] Sort by title A-Z and Z-A
- [x] Sorting works with search and filter criteria

### ✅ **Filtering (P3.59-P3.61)**
- [x] Filter by genre selection
- [x] Filters combine with search and sort
- [x] Filter selections persist during navigation

### ✅ **Pagination (P3.62-P3.65)**
- [x] Display in manageable chunks
- [x] Navigate through numbered pagination
- [x] Pagination respects search/filter/sort criteria
- [x] State remains intact when changing pages

### ✅ **State Synchronization (P3.66-P3.69)**
- [x] All UI controls synchronized
- [x] Immediate reflection of user choices
- [x] Clean state management organization

### ✅ **Code Quality (P3.70-P3.71)**
- [x] JSDoc documentation for all major functions
- [x] Consistent formatting across all files

## 🚀 Future Enhancements

- **Infinite Scroll**: Alternative to pagination
- **Advanced Filters**: Date ranges, episode count, ratings
- **Favorites System**: Save and manage favorite podcasts
- **Dark Mode**: Theme switching capability
- **Offline Support**: Service worker implementation
- **Social Features**: Sharing and recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Podcast API**: Data provided by [Podcast API](https://podcast-api.netlify.app)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) component library
- **Icons**: [Lucide React](https://lucide.dev) icon library
- **Styling**: [Tailwind CSS](https://tailwindcss.com) utility framework

---

**Built with ❤️ using React, Next.js, TypeScript, and Tailwind CSS**
