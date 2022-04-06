import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//====== below components start ======//
import Blob from './components/blob';
import Card from './components/CardDetail';
//====== below components end ======//

//====== below icon start ======//
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
//====== above icon end ======//

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  //====== 黑白主題改變時切換設定 start ======//
  const toggleTheme = () => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
      console.log('remove dark:白天主題'); //for check
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
      console.log('add dark:黑色主題'); //for check
    }
  };
  //====== 黑白主題改變時切換設定  ======//

  return (
    <>
      <div className="w-full h-full min-h-screen px-4 py-16 text-slate-800 dark:text-blue-50 bg-blue-50 dark:bg-slate-800 relative">
        <div className="w-full max-w-xl p-2 mx-auto relative">
          <Card />
          <div className="absolute top-1/3 right-1/4 w-[650px] z-10">
            <Blob />
          </div>
        </div>
        {/* 黑夜白天按鈕 start */}
        {isDarkMode ? (
          <SunIcon
            onClick={toggleTheme}
            className="w-6 h-6 absolute top-2.5 right-2.5 cursor-pointer"
          />
        ) : (
          <MoonIcon
            onClick={toggleTheme}
            className="w-6 h-6 absolute top-2.5 right-2.5 cursor-pointer"
          />
        )}
        {/* 黑夜白天按鈕 end */}
      </div>
    </>
  );
}

export default App;
