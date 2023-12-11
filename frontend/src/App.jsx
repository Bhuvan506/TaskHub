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
  const [boardType, setBoardType] = useState('add')
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [isLogin, setIsLogin] = useState(false);
  // const [loginCreds, setLoginCreds] = useState({})
  const [userid, setuserid] = useState("")

  if(!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({index:0}))
  }

  const [boardModelOpen, setBoardModelOpen] = useState(false)

  const UpdateBoards = async () => {
    const response = await fetch('http://localhost:4000/users/:id/data',{
      method: 'PATCH',
      body: JSON.stringify({
        data: boards,
        _userId: userid
      }),
      headers: {
        'Content-Type': 'application/json'
    }
    });
    const data = await response.json();
    console.log(data,"d");
    console.log(boards,"b");
    console.log(JSON.stringify(boards));
  }

  useEffect(() => {
    console.log(isLogin);
    if(isLogin) {
      console.log("inside");
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
                <Header boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen} setBoardType={setBoardType} boardType={boardType}/>
                <Center boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen} setBoardType={setBoardType} boardType={boardType}/>
              </>
              :
              <>
                <Header boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen} setBoardType={setBoardType} boardType={boardType}/>
                <Sidebar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen}/>
                <EmptyBoard type='add'/>
              </>
            }
          </>
          :
          <>
            <Header boardModelOpen={boardModelOpen} setBoardModelOpen={setBoardModelOpen}/>
            <Login setIsLogin={setIsLogin} setuserid={setuserid}/>
          </> 
        }
      </>
    </div>
  )
}

export default App