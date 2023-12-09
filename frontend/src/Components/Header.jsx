import React, { useState } from 'react'
import logo from '../Assets/logo-mobile.svg'
import UpIcon from '../Assets/icon-chevron-up.svg'
import DownIcon from '../Assets/icon-chevron-down.svg'
import elipsis from '../Assets/icon-vertical-ellipsis.svg'
import HeaderDropdown from './HeaderDropdown'
import AddEditBoardModel from '../Models/AddEditBoardModel'
import { useDispatch, useSelector } from 'react-redux'
import AddEditTaskModel from '../Models/AddEditTaskModel'
import ElipsisMenu from './ElipsisMenu'
import DeleteModel from '../Models/DeleteModel'
import boardsSlice from '../Redux/boardsSlice'

function Header({ setBoardModelOpen, boardModelOpen, boardType, setBoardType}) {

    const dispatch = useDispatch()

    const [openDropdown, setOpenDropdown] = useState(false)
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
    const [boardtype, setboardtype] = useState(boardType)
    const [boardmodelopen, setboardmodelopen] = useState(boardModelOpen)
    const [openAddEditTask, setOpenAddEditTask] = useState(false)
    const [isElipsisOpen, setIsElipsisOpen] = useState(false)

    const boards = useSelector((state) => state.boards)
    const board = boards.find(board => board.isActive)

    const setOpenEditModel = () => {
        setboardtype('edit')
        setboardmodelopen(true)
        setIsElipsisOpen(false)
    }

    const setOpenDeleteModel = () => {
        setIsDeleteModelOpen(true)
        setIsElipsisOpen(false)
    }

    const onDeleteBtnClick = () => {
        dispatch(boardsSlice.actions.deleteBoard())
        dispatch(boardsSlice.actions.setBoardActive({index:0}))
        setIsDeleteModelOpen(false)
    }

    const onDropdownClick = () => {
        // setBoardType('add');
        setboardtype('add');
        setOpenDropdown(state => !state)
        setIsElipsisOpen(false);
        console.log(boardtype);
    }

  return (
    <div className=' p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0'>
        <header className=' flex justify-between dark:text-white items-center'>
            <div className=' flex items-center space-x-2 md:space-x-4'>
                <img src={logo} alt="logo" className=' h-6 w-6' />
                <h3 className=' hidden md:inline-block font-bold font-sans md:text-4xl'>
                    TaskHub
                </h3>
                <div className=' flex items-center'>
                    <h3 className=' truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans'>
                        {boards.length > 0 ? board.name : ''}
                    </h3>
                    <img src={openDropdown ? UpIcon : DownIcon} alt="dropdown icon" className=' w-3 ml-2 cursor-pointer md:hidden' onClick={onDropdownClick}/>
                </div>
            </div>

            {boards.length > 0 ? (<div className=' flex space-x-4 items-center md:space-x-6'>
                <button className=' hidden md:block button' onClick={()=> {
                    setOpenAddEditTask(state => !state)
                }}>
                    + Add New Task
                </button>

                <button className=' button py-1 px-3 md:hidden' onClick={()=> {
                    setOpenAddEditTask(state => !state)
                }}>
                    +
                </button>

                <img src={elipsis} alt="elipsis" className=' cursor-pointer h-6' onClick={()=>{
                    // setBoardType('edit')
                    setboardtype('edit')
                    setOpenDropdown(false)
                    setIsElipsisOpen(state => !state)
                }}/>
                {
                    isElipsisOpen && <ElipsisMenu type='Boards' setOpenEditModel={setOpenEditModel} setOpenDeleteModel={setOpenDeleteModel} />
                }
            </div>):('')}
        </header>

        {
            openDropdown && <HeaderDropdown setBoardModelOpen={setboardmodelopen} setOpenDropdown={setOpenDropdown} setBoardType={setboardtype} boardType={boardtype}/>
        }

        {
            boardmodelopen && <AddEditBoardModel type={boardtype} setBoardModelOpen={setboardmodelopen}/>
        }

        {
            openAddEditTask && <AddEditTaskModel setOpenAddEditTask={setOpenAddEditTask} device='mobile' type='add'/>
        }

        {
            isDeleteModelOpen && <DeleteModel type='board' title={board.name} setIsDeleteModelOpen={setIsDeleteModelOpen} onDeleteBtnClick={onDeleteBtnClick}/>
        }

    </div>
  )
}

export default Header