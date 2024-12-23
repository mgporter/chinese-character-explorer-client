import { ChineseCharacterTreeMapDTO, DerivativeStub } from "../Api/types";

export interface CharacterDerivativeBoxProps {
  chineseCharacter: ChineseCharacterTreeMapDTO;
}

function reorderBoxes(stubs: DerivativeStub[], maxPerRow: number) {
  const boxes: React.ReactNode[] = stubs.map(c => <DerivativeBox key={c.char} char={c.char} />)
  const remainder = boxes.length % maxPerRow;
  const rowCount = remainder === 0 ? Math.floor(boxes.length / maxPerRow) : Math.floor(boxes.length / maxPerRow) + 1;
  const newBoxRows: React.ReactNode[][] = [];

  for (let i = (rowCount - 1) * maxPerRow; i >= 0; i -= maxPerRow) {
    const slice = boxes.slice(i, i + maxPerRow);
    while (slice.length < maxPerRow) {
      slice.push(<DerivativeBox key={slice.length} />);
    }
    newBoxRows.push(slice);
  }

  return newBoxRows.flatMap(x => x);

}

export default function CharacterDerivativeBox({ chineseCharacter }: CharacterDerivativeBoxProps) {
  
  const maxPerRow = 4;
  const reorderedCharacters = reorderBoxes(chineseCharacter.derivatives, maxPerRow);

  return (
    <div className="self-end justify-self-center mb-6 grid grid-cols-4 gap-1
      lg:gap-1 lg:self-auto lg:first-of-type:mt-24"
      style={{ gridTemplateColumns: `repeat(${maxPerRow}, auto)`}}>
      {reorderedCharacters}
    </div>
  )
}

function DerivativeBox({ char }: {char?: string}) {
  return (
    <div data-char={char} className="component-box character-with-details flex items-center justify-center text-[1.2rem] border-2 size-[2.4rem] select-none cursor-pointer
      border-stone-400 bg-stone-100 active:border-stone-700 active:bg-stone-400
      opacity-50 hover:opacity-100"
      style={{ visibility: char ? "visible" : "hidden"}}>
      <p>{char}</p>
    </div>
  )
}