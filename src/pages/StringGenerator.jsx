import { useState, useCallback, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring", bounce: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const StringGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedString, setGeneratedString] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const generateString = useCallback(() => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);

    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!charset) {
      setGeneratedString('Please select at least one option');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedString(result);
    setCopied(false);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    generateString();
  }, [generateString]);

  const handleCopy = () => {
    if (!generatedString || generatedString.startsWith('Please')) return;
    navigator.clipboard.writeText(generatedString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkboxClass = "flex items-center space-x-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors";

  return (
    <motion.div 
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center p-6 sm:p-10 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800/90 transition-colors duration-300"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-xl glass-panel p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
            <RefreshCw className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">String Generator</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Create strong & secure random strings</p>
          </div>
        </div>

        {/* Output Area */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between p-2 shadow-inner">
            <input 
              type="text" 
              value={generatedString} 
              readOnly 
              className="w-full bg-transparent border-none text-slate-700 dark:text-slate-200 font-mono text-lg px-4 focus:outline-none"
            />
            <button 
              onClick={handleCopy}
              className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                copied ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' : 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-slate-600 hover:scale-105'
              }`}
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
            {copied && (
              <span className="absolute -top-10 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg animate-bounce">
                Copied!
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Length: <span className="text-indigo-600 dark:text-indigo-400">{length}</span></label>
              <input 
                type="number" 
                value={length} 
                onChange={(e) => setLength(Number(e.target.value))} 
                min="4" 
                max="64"
                className="w-20 px-3 py-1 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <input 
              type="range" 
              min="4" 
              max="64" 
              value={length} 
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={checkboxClass}>
              <input 
                type="checkbox" 
                checked={includeUpper} 
                onChange={() => setIncludeUpper(!includeUpper)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">Uppercase (A-Z)</span>
            </label>
            <label className={checkboxClass}>
              <input 
                type="checkbox" 
                checked={includeLower} 
                onChange={() => setIncludeLower(!includeLower)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">Lowercase (a-z)</span>
            </label>
            <label className={checkboxClass}>
              <input 
                type="checkbox" 
                checked={includeNumbers} 
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">Numbers (0-9)</span>
            </label>
            <label className={checkboxClass}>
              <input 
                type="checkbox" 
                checked={includeSymbols} 
                onChange={() => setIncludeSymbols(!includeSymbols)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">Symbols (!@#$)</span>
            </label>
          </div>

          <button 
            onClick={generateString}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all transform active:scale-[0.98] flex justify-center items-center space-x-2"
          >
            <RefreshCw className={`w-5 h-5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>Generate New String</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StringGenerator;
