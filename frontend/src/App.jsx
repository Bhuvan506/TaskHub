import React, { useState } from 'react'
import Header from './Components/Header'
import Center from './Components/Center'
import { useDispatch, useSelector } from 'react-redux'
import boardsSlice from './redux/boardsSlice'
import EmptyBoard from './Components/EmptyBoard'
import Sidebar from './Components/SideBar'
import Login from './Components/Login'

function App() {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards)
  const activeBoard = boards.find(board => board.isActive)
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [isLogin, setIsLogin] = useState(false);

  if(!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({index:0}))
  }

  const [boardModelOpen, setBoardModelOpen] = useState(false)

  return (
    <div className=' overflow-scroll overflow-x-scroll scrollbar-hide'>
      <>
        { isLogin ? 
          <>
            {boards.length > 0 ?
              <>
                <Header boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen}/>
                <Center boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen}/>
              </>
              :
              <>
                <Header boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen}/>
                <Sidebar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen}/>
                <EmptyBoard type='add'/>
              </>
            }
          </>
          :
          <>
            <Header boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen}/>
            <Login isLogin={isLogin} setIsLogin={setIsLogin} />
          </> 
        }
      </>
    </div>
  )
}

export default App