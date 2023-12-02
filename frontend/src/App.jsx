import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import Center from './Components/Center'
import { useDispatch, useSelector } from 'react-redux'
import boardsSlice from './Redux/boardsSlice'
import EmptyBoard from './Components/EmptyBoard'
import Sidebar from './Components/SideBar'
import Login from './Components/Login'

function App() {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards)
  const activeBoard = boards.find(board => board.isActive)
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [isLogin, setIsLogin] = useState(false);
  const [loginCreds, setLoginCreds] = useState({})
  const [userid, setuserid] = useState("")

  if(!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({index:0}))
  }

  const [boardModelOpen, setBoardModelOpen] = useState(false)

  const UpdateBoards = async () => {
    const response = await fetch('http://localhost:8080/users/:id/data1',{
      method: 'POST',
      body: JSON.stringify({
        data: boards,
        _userId: userid
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    });
    const data = await response.json();
    console.log(JSON.stringify(boards));
  }

  useEffect(() => {
    if(isLogin) {
      UpdateBoards();
    }
  })

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
            <Login isLogin={isLogin} setIsLogin={setIsLogin} loginCreds={loginCreds} setLoginCreds={setLoginCreds} userid={userid} setuserid={setuserid}/>
          </> 
        }
      </>
    </div>
  )
}

export default App