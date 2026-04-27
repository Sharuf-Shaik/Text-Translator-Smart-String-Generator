import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Translator from './pages/Translator';
import StringGenerator from './pages/StringGenerator';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <div className="font-sans min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/translator" element={<Translator />} />
            <Route path="/string-generator" element={<StringGenerator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
