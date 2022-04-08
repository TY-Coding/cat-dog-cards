import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//====== below components start ======//
import { Blob, Blob1 } from './components/blob';
import Card from './components/CardDetail';
import Login from './components/Login';
import BackEnd from './components/BackEnd';
//====== below components end ======//

//====== below icon start ======//
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
//====== above icon end ======//

//====== createContext start ======//
import { DataContext } from './utils/context';
//====== createContext end ======//

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [auth, setAuth] = useState(false);

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
    <DataContext.Provider value={{ auth, setAuth }}>
      <Router>
        <>
          <div className="w-full h-full min-h-screen px-4 py-16 text-slate-800 dark:text-blue-50 bg-blue-50 dark:bg-slate-800 overflow-x-hidden">
            <div className="w-full max-w-xl p-2 mx-auto relative">
              <Switch>
                <Route path="/back">
                  <BackEnd />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route exact path="/">
                  <Card />
                </Route>
              </Switch>
              <div className="absolute top-1/3 right-1/4 w-[650px] z-10">
                <Blob />
              </div>
              <div className="absolute bottom-1/4 left-1/3 w-[650px] z-10">
                <Blob />
              </div>
              <div className="absolute bottom-[25%] left-[110%] w-[950px] z-10">
                <Blob1 />
              </div>
            </div>
          </div>

          {/* 黑夜白天按鈕 start */}
          {isDarkMode ? (
            <SunIcon
              onClick={toggleTheme}
              className="w-6 h-6 absolute top-2.5 right-2.5 cursor-pointer text-blue-50 z-20"
            />
          ) : (
            <MoonIcon
              onClick={toggleTheme}
              className="w-6 h-6 absolute top-2.5 right-2.5 cursor-pointer text-slate-800 z-20"
            />
          )}
          {/* 黑夜白天按鈕 end */}
        </>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
