import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import { Languages, ArrowRightLeft, Loader2, Copy, Check, AlertCircle, Mic, History, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'hi', name: 'Hindi' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'ru', name: 'Russian' },
  { code: 'ko', name: 'Korean' }
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring", bounce: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Speech to text state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // History state
  const [history, setHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('translationHistory');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('translationHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://api.mymemory.translated.net/get`, {
        params: {
          q: inputText,
          langpair: `en|${targetLanguage}`
        }
      });
      
      if (response.data && response.data.responseData) {
        const result = response.data.responseData.translatedText;
        setTranslatedText(result);
        
        // Save to history
        setHistory(prev => {
          const newEntry = {
            id: Date.now(),
            sourceText: inputText,
            targetLanguage: targetLanguage,
            translatedText: result
          };
          return [newEntry, ...prev].slice(0, 10);
        });
      } else {
        throw new Error('Unexpected response format from API');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to translate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, targetLanguage]);

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev + (prev.length > 0 && !prev.endsWith(' ') ? ' ' : '') + transcript);
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const loadHistoryItem = (item) => {
    setInputText(item.sourceText);
    setTargetLanguage(item.targetLanguage);
    setTranslatedText(item.translatedText);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center py-10 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-violet-50 dark:from-slate-900 dark:to-slate-800/90 transition-colors duration-300"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-5xl space-y-8">
        {/* Translator Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center">
              <Languages className="text-violet-600 dark:text-violet-400 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">Text Translator</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Translate English to 10+ languages instantly</p>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 bg-rose-50 dark:bg-rose-900/30 border-l-4 border-rose-500 text-rose-700 dark:text-rose-400 rounded-r-lg flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300 text-sm">English (Source)</label>
                <button 
                  onClick={handleSpeech}
                  className={`p-2 rounded-full transition-colors flex items-center space-x-1 text-sm ${isListening ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400 animate-pulse' : 'text-slate-500 hover:text-violet-600 hover:bg-violet-50 dark:text-slate-400 dark:hover:text-violet-400 dark:hover:bg-violet-900/30'}`}
                  title="Speech to Text"
                >
                  <Mic className="w-4 h-4" />
                  <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Dictate'}</span>
                </button>
              </div>
              <textarea
                className="w-full h-48 sm:h-64 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none shadow-sm"
                placeholder="Type or dictate English text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </div>

            {/* Output */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center space-x-2">
                  <ArrowRightLeft className="w-4 h-4 text-violet-500" />
                  <select 
                    value={targetLanguage} 
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="bg-transparent font-semibold text-violet-700 dark:text-violet-400 text-sm focus:outline-none cursor-pointer"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code} className="dark:bg-slate-800">{lang.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="relative group h-48 sm:h-64">
                <textarea
                  className="w-full h-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 resize-none cursor-default shadow-inner"
                  placeholder="Translation will appear here..."
                  readOnly
                  value={translatedText}
                ></textarea>
                
                {translatedText && (
                  <button 
                    onClick={handleCopy}
                    className="absolute bottom-4 right-4 p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors flex items-center justify-center group-hover:opacity-100"
                    title="Copy translation"
                  >
                    {copied ? <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 dark:disabled:bg-violet-900/50 disabled:text-slate-100 text-white font-bold rounded-xl shadow-lg shadow-violet-200 dark:shadow-none transition-all transform active:scale-[0.98] flex justify-center items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Languages className="w-5 h-5" />
              )}
              <span>{isLoading ? 'Translating...' : 'Translate Text'}</span>
            </button>
          </div>
        </div>

        {/* History Panel */}
        {history.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl border-t-4 border-t-violet-500 dark:border-t-violet-600"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <History className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Recent Translations</h2>
              </div>
              <button 
                onClick={() => setHistory([])}
                className="text-sm text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 flex items-center transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Clear
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {history.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => loadHistoryItem(item)}
                    className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1 flex items-center justify-between">
                        <span>English</span>
                        <ArrowRightLeft className="w-3 h-3 mx-1" />
                        <span>{languages.find(l => l.code === item.targetLanguage)?.name || item.targetLanguage}</span>
                      </p>
                      <p className="text-sm text-slate-800 dark:text-slate-200 line-clamp-2">{item.sourceText}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-sm text-violet-700 dark:text-violet-400 font-medium line-clamp-2">{item.translatedText}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Translator;
