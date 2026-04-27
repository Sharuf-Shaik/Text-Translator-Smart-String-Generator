# Multi-Page React Application: Text Translator & Random String Generator

This is a React 18 Single Page Application featuring client-side routing, built with Vite and Tailwind CSS. It features a text translator powered by Google Translate via RapidAPI and a flexible Random String Generator.

## Features
- **Text Translator**: Translates English text to 10+ selected languages using the RapidAPI Google Translate endpoint.
- **Random String Generator**: Generates complex strings based on customizable lengths and rules character types.
- **Modern UI**: Full Tailwind CSS implementation with glassmorphic cards, fluid transitions, and responsive styling.
- **Client-Side Routing**: React Router v6 handling seamless transitions between pages.

## Getting Started

### Prerequisites
- Node.js installed

### Setup Environment Variables
1. Rename `.env` or create it if not present.
2. Obtain a Google Translate API Key from [RapidAPI](https://rapidapi.com/googlecloud/api/google-translate1).
3. Set your API Key in `.env`:
   ```env
   VITE_RAPIDAPI_KEY=your_actual_key_here
   ```

### Installation
Run the following commands:
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

## Technologies Used
- React 18
- React Router DOM v6
- Tailwind CSS
- Vite
- Axios
- Lucide React (for icons)
