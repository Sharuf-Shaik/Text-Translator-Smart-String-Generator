import { Link } from 'react-router-dom';
import { Languages, Fingerprint, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-violet-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <motion.div className="text-center max-w-3xl glass-panel p-10 rounded-3xl shadow-xl" variants={itemVariants}>
        <motion.div className="mb-6 flex justify-center space-x-4" variants={itemVariants}>
          <div className="p-4 bg-violet-100 dark:bg-violet-900/50 rounded-2xl">
            <Languages className="w-12 h-12 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl">
            <Fingerprint className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
        </motion.div>
        
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-800 dark:text-slate-100" variants={itemVariants}>
          Welcome to <span className="primary-gradient-text">MultiTool</span>
        </motion.h1>
        
        <motion.p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed" variants={itemVariants}>
          Your one-stop solution for everyday tasks. Instantly translate text across multiple languages with the power of Google Translate, or generate highly secure, complex strings for passwords and tokens.
        </motion.p>
        
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
          <Link 
            to="/translator" 
            className="flex items-center justify-center space-x-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-violet-200 dark:shadow-none"
          >
            <Languages className="w-5 h-5" />
            <span>Open Translator</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          
          <Link 
            to="/string-generator" 
            className="flex items-center justify-center space-x-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-100 dark:border-slate-700 hover:border-indigo-200 px-8 py-4 rounded-xl font-semibold transition-all shadow-sm"
          >
            <Fingerprint className="w-5 h-5" />
            <span>Open String Gen</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
