import { useEffect, useState } from "react";
import useFetchChineseCharacterTreeMaps from "../Hooks/UseFetchChineseCharacterTreeMaps";
import CharacterTree from "./CharacterTree";
import { useSearchParams } from "react-router";
import useFetchChineseCharacterDetails from "../Hooks/UseFetchChineseCharacterDetails";
import CharacterDetailsDialogContainer from "./CharacterDetailsDialogContainer";
import CharacterDerivativeBox from "./CharacterDerivativeBox";


export default function Explorer() {

  const [searchParams] = useSearchParams();

  const { treemapsLoading, treemapsError, treemapsData } = useFetchChineseCharacterTreeMaps(searchParams.get("chars"));
  const fetchDetailsHook = useFetchChineseCharacterDetails();

  const dialogOpenState = useState(false);
  const setDialogIsOpen = dialogOpenState[1];

  useEffect(() => {
    setDialogIsOpen(false);
  }, [setDialogIsOpen, searchParams])

  function componentClickHandler(e: React.MouseEvent) {

    if (e.target instanceof HTMLElement) {
      const componentBox = e.target.closest("div.component-box");
      const char = componentBox?.getAttribute("data-char");

      if (char) {
        fetchDetailsHook.fetchCharData(char);
        setDialogIsOpen(true);
      }
    }

  }

  return (
    <div id="explorer" className="grid gap-x-24 px-[150px] pt-[210px] pb-[100px]
      content-start items-start justify-center
      w-full min-h-[100vh]
      lg:flex-col lg:min-h-min lg:max-w-full"
      style={{ gridTemplateColumns: `repeat(${treemapsData ? treemapsData.length : 1}, auto)` }} >
      <CharacterDetailsDialogContainer isOpenState={dialogOpenState} fetchDetailsHook={fetchDetailsHook} />
      {treemapsLoading && <div>Content is loading...</div>}
      {treemapsError && <div>Error loading character data: {treemapsError}</div>}
      {treemapsData && treemapsData.map((cchar, i) => (
        <CharacterDerivativeBox key={`${cchar.char}-${i}`} chineseCharacter={cchar} />
      ))}
      {treemapsData && treemapsData.map((cchar, i) => (
        <CharacterTree key={`${cchar.char}-${i}`} chineseCharacter={cchar} />
      ))}
      {/* <div id="row" onClick={componentClickHandler} className="flex items-start justify-center gap-24 mx-[150px] mt-[210px] mb-[100px]
        lg:flex-col lg:justify-start lg:items-center lg:mx-0">
        {treemapsLoading && <div>Content is loading...</div>}
        {treemapsError && <div>Error loading character data: {treemapsError}</div>}
        {treemapsData && treemapsData.map((cchar, i) => (
          <CharacterTree key={`${cchar.char}-${i}`} chineseCharacter={cchar} />
        ))}
      </div> */}
    </div>
  )
}