import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCcw, 
  ArrowRight, 
  Sparkles,
  Trophy,
  Crown,
  Star,
  BookOpen,
  CheckCircle2,
  Gamepad2,
  Gem,
  Languages,
  PenTool,
  ChevronRight,
  Info,
  User,
  ArrowLeft
} from 'lucide-react';
import { PEDRO_STORY, CROSSWORD_CLUES, GRID_SIZE, CrosswordClue } from './constants';

type GameState = 'start' | 'reading' | 'playing' | 'results';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [selectedClue, setSelectedClue] = useState<CrosswordClue | null>(null);
  const [completedWords, setCompletedWords] = useState<number[]>([]);
  const [gridValues, setGridValues] = useState<string[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))
  );

  const startGame = () => {
    setGameState('reading');
    setScore(0);
    setCompletedWords([]);
    setGridValues(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('')));
    setSelectedClue(null);
  };

  const handleClueSelect = (clue: CrosswordClue) => {
    if (completedWords.includes(clue.id)) return;
    setSelectedClue(clue);
  };

  const submitWord = (word: string) => {
    if (!selectedClue) return;
    
    if (word.toUpperCase() === selectedClue.word.toUpperCase()) {
      const newGrid = gridValues.map(row => [...row]);
      for (let i = 0; i < selectedClue.word.length; i++) {
        const r = selectedClue.direction === 'V' ? selectedClue.row + i : selectedClue.row;
        const c = selectedClue.direction === 'H' ? selectedClue.col + i : selectedClue.col;
        if (newGrid[r]) {
          newGrid[r][c] = selectedClue.word[i].toUpperCase();
        }
      }
      setGridValues(newGrid);
      setCompletedWords(prev => [...prev, selectedClue.id]);
      setScore(s => s + 10);
      setSelectedClue(null);
      
      if (completedWords.length + 1 === CROSSWORD_CLUES.length) {
        setTimeout(() => setGameState('results'), 1000);
      }
    } else {
      setSelectedClue(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col overflow-x-hidden selection:bg-blue-400 selection:text-white">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 scale-150"><BookOpen size={200} /></div>
        <div className="absolute bottom-20 right-10 rotate-45 scale-150"><Gem size={300} /></div>
      </div>

      <header className="bg-white/90 backdrop-blur-md px-6 py-4 sticky top-0 z-50 flex items-center justify-between border-b-4 border-blue-500 shadow-sm">
         <div className="flex items-center gap-3">
           <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Languages size={24} />
           </div>
           <h1 className="font-black italic text-xl tracking-tight uppercase">ՊԵԴՐՈՅԻ <span className="text-blue-600">ՍԿԱՆՎՈՐԴԸ</span></h1>
         </div>

         <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-blue-500 text-white rounded-2xl shadow-lg border-2 border-white">
               <User size={20} />
               <span className="font-black tracking-widest text-sm">ՄԻԱՎՈՐ: {score}</span>
            </div>
         </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 relative z-10">
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center space-y-12 py-20"
            >
               <div className="relative">
                  <motion.div 
                    animate={{ rotate: [-1, 1, -1] }} 
                    transition={{ repeat: Infinity, duration: 5 }}
                    className="p-4 bg-white rounded-[4rem] shadow-2xl border-8 border-white ring-8 ring-blue-50"
                  >
                     <img 
                       src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800" 
                       className="w-72 h-72 object-cover rounded-[3rem]"
                       alt="Learning Spanish"
                     />
                     <div className="absolute -top-8 -right-8 bg-blue-500 p-5 rounded-full shadow-xl border-4 border-white">
                        <User size={40} className="text-white" />
                     </div>
                  </motion.div>
               </div>

               <div className="text-center space-y-4">
                  <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
                    ՍՈՎՈՐԻՐ <span className="text-blue-600 block">PODER</span>
                  </h2>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.5em] text-sm">
                    SPANISH MASTERCLASS • LEVEL A1
                  </p>
               </div>

               <button 
                 onClick={startGame}
                 className="group px-12 py-7 bg-slate-900 text-white rounded-[2rem] font-black text-2xl uppercase tracking-widest hover:bg-black transition-all flex items-center gap-6 shadow-2xl active:scale-95 border-b-8 border-black"
               >
                 ՍԿՍԵԼ ԱՐԿԱԾԸ <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </motion.div>
          )}

          {gameState === 'reading' && (
            <motion.div 
              key="reading"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
               <div className="bg-white p-8 md:p-16 rounded-[4rem] border-8 border-blue-50 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b-4 border-blue-50">
                     <BookOpen size={48} className="text-blue-600" />
                     <div>
                        <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight">{PEDRO_STORY.title}</h3>
                        <p className="text-xs font-black text-slate-300 uppercase tracking-widest">ԿԱՐԴԱՑԵՔ ՊԵԴՐՈՅԻ ՊԱՏՄՈՒԹՅՈՒՆԸ</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-full w-fit tracking-widest">ESPAÑOL</p>
                        <p className="text-3xl md:text-4xl font-bold leading-relaxed text-slate-800">
                          {PEDRO_STORY.text}
                        </p>
                     </div>
                     <div className="space-y-6 lg:border-l-4 lg:border-blue-50 lg:pl-12">
                        <p className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-4 py-2 rounded-full w-fit tracking-widest">ՀԱՅԵՐԵՆ</p>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-500 italic">
                          {PEDRO_STORY.translation}
                        </p>
                     </div>
                  </div>
               </div>

               <div className="flex justify-center">
                  <button 
                    onClick={() => setGameState('playing')}
                    className="px-20 py-8 bg-blue-600 text-white rounded-full font-black text-3xl uppercase shadow-3xl hover:bg-blue-700 transition-all flex items-center gap-6 active:scale-95 border-b-8 border-blue-900"
                  >
                    ԱՆՑՆԵԼ ՍԿԱՆՎՈՐԴԻՆ <Gamepad2 size={40} />
                  </button>
               </div>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
               {/* Crossword Grid */}
               <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[3rem] border-8 border-slate-100 shadow-xl flex flex-col items-center">
                  <div 
                    className="grid gap-1 sm:gap-2 mb-8 select-none"
                    style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
                  >
                    {Array(GRID_SIZE).fill(null).map((_, r) => 
                      Array(GRID_SIZE).fill(null).map((_, c) => {
                        const clueAtCell = CROSSWORD_CLUES.find(clue => {
                          if (clue.direction === 'H') {
                            return r === clue.row && c >= clue.col && c < clue.col + clue.word.length;
                          } else {
                            return c === clue.col && r >= clue.row && r < clue.row + clue.word.length;
                          }
                        });
                        
                        const isSelected = selectedClue && (
                          selectedClue.direction === 'H' 
                            ? (r === selectedClue.row && c >= selectedClue.col && c < selectedClue.col + selectedClue.word.length)
                            : (c === selectedClue.col && r >= selectedClue.row && r < selectedClue.row + selectedClue.word.length)
                        );

                        return (
                          <div 
                            key={`${r}-${c}`}
                            onClick={() => {
                              if (clueAtCell) handleClueSelect(clueAtCell);
                            }}
                            className={`w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md md:rounded-lg border-[1px] md:border-2 font-black text-xs sm:text-base md:text-xl transition-all cursor-pointer ${
                              clueAtCell 
                                ? (isSelected ? 'bg-blue-100 border-blue-400 z-10' : 'bg-slate-50 border-slate-200 hover:border-blue-300')
                                : 'invisible'
                            } ${gridValues[r][c] ? 'bg-blue-50 border-blue-400 text-blue-600 shadow-sm' : 'text-slate-800'}`}
                          >
                            {gridValues[r][c]}
                          </div>
                        );
                      })
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 bg-blue-50 px-6 py-4 rounded-2xl w-full">
                     <Info className="text-blue-500 shrink-0" />
                     <p className="text-sm font-bold text-blue-800 italic">Ընտրիր վանդակը կամ հարցը ցանկից և գրիր ճիշտ բառը:</p>
                  </div>
               </div>

               {/* Clues List & Input */}
               <div className="lg:col-span-5 space-y-6 flex flex-col h-full">
                  <div className="bg-white p-8 rounded-[3rem] border-4 border-slate-100 shadow-lg flex-1 flex flex-col min-h-0">
                     <h4 className="font-black text-xl uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                        <PenTool size={20} /> ՀԱՐՑԵՐ ({CROSSWORD_CLUES.length})
                     </h4>
                     <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                        {CROSSWORD_CLUES.map(clue => (
                          <button
                            key={clue.id}
                            disabled={completedWords.includes(clue.id)}
                            onClick={() => handleClueSelect(clue)}
                            className={`w-full p-4 rounded-2xl transition-all text-left flex items-center justify-between border-4 ${
                              completedWords.includes(clue.id)
                                ? 'bg-emerald-50 border-emerald-100 opacity-60'
                                : (selectedClue?.id === clue.id ? 'bg-blue-50 border-blue-400 scale-[1.02]' : 'bg-slate-50 border-transparent hover:border-slate-200')
                            }`}
                          >
                            <div className="flex items-center gap-4">
                               <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${completedWords.includes(clue.id) ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                  {clue.id}
                               </div>
                               <span className="font-bold text-sm md:text-base text-slate-700">{clue.clue}</span>
                            </div>
                            {completedWords.includes(clue.id) ? <CheckCircle2 className="text-emerald-500" size={20} /> : <ChevronRight className="text-slate-300" size={20} />}
                          </button>
                        ))}
                     </div>
                  </div>

                  <AnimatePresence>
                    {selectedClue && (
                      <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-3xl space-y-6"
                      >
                         <div className="flex items-center justify-between">
                            <h5 className="font-black text-xl uppercase italic text-blue-400">ԼՐԱՑՐՈՒ ԲԱՌԸ</h5>
                            <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                               {selectedClue.word.length} ՏԱՌ
                            </span>
                         </div>
                         
                         <div className="flex flex-wrap gap-2">
                            {Array.from(new Set(selectedClue.word.toUpperCase() + "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ")).sort().slice(0, 15).map((char, i) => (
                               <button 
                                 key={i}
                                 onClick={() => {
                                    const inputField = document.getElementById('word-input') as HTMLInputElement;
                                    if(inputField) inputField.value += char;
                                 }}
                                 className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center font-black text-lg transition-all"
                               >
                                 {char}
                               </button>
                            ))}
                         </div>
                         
                         <div className="flex gap-4">
                            <input 
                              id="word-input"
                              type="text"
                              autoFocus
                              autoComplete="off"
                              placeholder="..."
                              className="flex-1 p-5 rounded-2xl bg-white/5 border-2 border-white/20 font-black text-2xl uppercase tracking-widest focus:outline-none focus:border-blue-400 transition-all w-full"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  submitWord(e.currentTarget.value);
                                  e.currentTarget.value = "";
                                }
                              }}
                            />
                            <button 
                              onClick={() => {
                                const inputField = document.getElementById('word-input') as HTMLInputElement;
                                if(inputField) {
                                  submitWord(inputField.value);
                                  inputField.value = "";
                                }
                              }}
                              className="px-8 bg-blue-600 rounded-2xl font-black text-xl uppercase border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition-all"
                            >
                              OK
                            </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </motion.div>
          )}

          {gameState === 'results' && (
            <motion.div 
              key="results"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center space-y-12 py-10 text-center"
            >
               <div className="relative">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-64 h-64 md:w-96 md:h-96 rounded-[5rem] bg-white border-8 border-blue-500 flex items-center justify-center shadow-3xl"
                  >
                    <Trophy size={180} className="text-yellow-400" />
                  </motion.div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-14 py-4 rounded-full font-black text-2xl shadow-xl border-4 border-white whitespace-nowrap uppercase">
                    ԱՊՐԵ՛Ս, ԴՈՒ ՀԱՂԹԵՑԻՐ
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-6xl md:text-9xl font-black italic text-slate-800 tracking-tighter leading-none">{score}</p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.5em]">ՎԱՍՏԱԿԱԾ ՄԻԱՎՈՐՆԵՐ</p>
               </div>

               <button 
                 onClick={() => setGameState('start')}
                 className="px-20 py-8 bg-slate-900 text-white rounded-[3rem] font-black text-2xl uppercase tracking-widest hover:bg-black transition-all shadow-3xl active:scale-95 border-b-8 border-black flex items-center gap-4"
               >
                 <RotateCcw size={32} /> ՆՈՐԻՑ ՍԿՍԵԼ
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-12 text-center opacity-30 mt-auto">
         <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">
           PEDRO'S CROSSWORD • SPANISH PODER • 2026
         </p>
      </footer>
    </div>
  );
}
