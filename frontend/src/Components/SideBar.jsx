import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@headlessui/react';
import boardIcon from '../assets/icon-board.svg';
import DarkMode from '../Hooks/DarkMode';
import darkIcon from '../Assets/icon-dark-theme.svg';
import lightIcon from '../Assets/icon-light-theme.svg';

import showSidebarIcon from '../assets/icon-show-sidebar.svg';
import hideSidebarIcon from '../assets/icon-hide-sidebar.svg';

import boardsSlice from '../redux/boardsSlice';
import AddEditBoardModel from '../Models/AddEditBoardModel';

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
    const dispatch = useDispatch();
    const [isBoardModelOpen, setIsBoardModelOpen] = useState(false);
    const [colorTheme, setTheme] = DarkMode();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };
    const boards = useSelector((state) => state.boards);

  return (
    <div>
        <div className={isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2e2f3a]  fixed top-[72px] h-screen  items-center left-0 z-20`
            : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full  `
        }>
            <div>
                {isSideBarOpen && (
                    <div className=' bg-white  dark:bg-[#2e2f3a]    w-full   py-4 rounded-xl'>
                        <h3 className=' dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 '>
                            ALL BOARDS ({boards?.length})
                        </h3>
                        <div className='  dropdown-board flex flex-col h-[70vh]  justify-between '>
                            <div>
                                {boards.map((board, index) => (
                                    <div className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  ${board.isActive && ' bg-[#635fc7] rounded-r-full text-white mr-8 '} `}
                                    key={index}
                                    onClick={() => {
                                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                                    }}>
                                        <img src={boardIcon} className='  filter-white  h-4 ' />{' '}
                                        <p className=' text-lg font-bold '>{board.name}</p>
                                    </div>
                                ))}
                                <div className=' flex  items-baseline space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white'
                                onClick={() => {setIsBoardModelOpen(true);}}>
                                    <img src={boardIcon} className=' filter-white  h-4 ' />
                                    <p className=' text-lg font-bold'>Create New Board </p>
                                </div>
                            </div>
                            <div className=' mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
                                <img src={lightIcon}/>
                                <Switch checked={darkSide} onChange={toggleDarkMode} className={`${darkSide ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex h-5 w-11 items-center rounded-full`}>
                                    <span className={`${darkSide ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                                </Switch>
                                <img src={darkIcon}/>
                            </div>
                        </div>
                    </div>
                )}

                {isSideBarOpen ? (
                    <div onClick={() => setIsSideBarOpen((state) => !state)} className=' flex items-center mt-2 absolute bottom-18 text-lg font-bold  rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500'>
                        <img className=' min-w-[20px]' src={hideSidebarIcon}/>
                        {isSideBarOpen && <p> Hide Sidebar </p>}
                    </div>
                    ) : (
                    <div className=' absolute p-5' onClick={() => setIsSideBarOpen((state) => !state)}>
                        <img src={showSidebarIcon}/>
                    </div>
                )}
            </div>
      </div>

      {isBoardModelOpen && (
        <AddEditBoardModel type='add' setIsBoardModelOpen={setIsBoardModelOpen} />
      )}
    </div>
  );
}

export default Sidebar;
