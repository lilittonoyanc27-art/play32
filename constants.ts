export interface CrosswordClue {
  id: number;
  word: string;
  clue: string;
  row: number;
  col: number;
  direction: 'H' | 'V';
}

export const PEDRO_STORY = {
  title: "Lo que podemos hacer",
  text: "Hola, soy Pedro. Yo puedo hablar español. Mi padre puede cocinar comida rica. Mi hermana puede tocar la guitarra. Nosotros podemos jugar al fútbol en el parque. Mis amigos pueden bailar muy bien. ¿Tú puedes cantar? ¡Todos podemos aprender!",
  translation: "Ողջույն, ես Պեդրոն եմ: Ես կարող եմ խոսել իսպաներեն: Հայրիկս կարող է համեղ սնունդ պատրաստել: Քույրս կարող է կիթառ նվագել: Մենք կարող ենք ֆուտբոլ խաղալ այգում: Իմ ընկերները կարող են շատ լավ պարել: Դու կարո՞ղ ես երգել: Բոլորս կարող ենք սովորել:"
};

export const CROSSWORD_CLUES: CrosswordClue[] = [
  { id: 1, word: "PUEDO", clue: "Ես կարող եմ", row: 0, col: 0, direction: 'H' },
  { id: 2, word: "HABLAR", clue: "Խոսել", row: 0, col: 0, direction: 'V' },
  { id: 3, word: "PUEDE", clue: "Նա կարող է", row: 0, col: 5, direction: 'V' },
  { id: 4, word: "COCINAR", clue: "Եփել / Պատրաստել", row: 2, col: 3, direction: 'H' },
  { id: 5, word: "TOCAR", clue: "Նվագել", row: 2, col: 3, direction: 'V' },
  { id: 6, word: "PODEMOS", clue: "Մենք կարող ենք", row: 4, col: 1, direction: 'H' },
  { id: 7, word: "JUGAR", clue: "Խաղալ", row: 4, col: 1, direction: 'V' },
  { id: 8, word: "FUTBOL", clue: "Ֆուտբոլ", row: 0, col: 9, direction: 'V' },
  { id: 9, word: "PUEDEN", clue: "Նրանք կարող են", row: 6, col: 3, direction: 'H' },
  { id: 10, word: "BAILAR", clue: "Պարել", row: 6, col: 3, direction: 'V' },
  { id: 11, word: "PUEDES", clue: "Դու կարող ես", row: 8, col: 0, direction: 'H' },
  { id: 12, word: "CANTAR", clue: "Երգել", row: 8, col: 0, direction: 'V' },
  { id: 13, word: "APRENDER", clue: "Սովորել", row: 10, col: 2, direction: 'H' },
  { id: 14, word: "GUITARRA", clue: "Կիթառ", row: 0, col: 7, direction: 'V' },
  { id: 15, word: "PARQUE", clue: "Այգի", row: 5, col: 7, direction: 'H' },
];

export const GRID_SIZE = 12;
