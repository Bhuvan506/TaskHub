import React, { useEffect, useState} from 'react'
import boardsSlice from '../Redux/boardsSlice';
import { useDispatch, useSelector } from 'react-redux';

function Login({setIsLogin, setuserid}) {
    const dispatch = useDispatch();
    const [loginOrsignup, setloginOrsignup] = useState(false)
    const [loginCreds, setLoginCreds] = useState({});
    const [registerCreds, setRegisterCreds] = useState({})

    const onChangeL = (e) => {
        setLoginCreds({...loginCreds, [e.target.name]: e.target.value });
    }

    const onChangeR = (e) => {
        setLoginCreds({...loginCreds, [e.target.name]: e.target.value });
        setRegisterCreds({...registerCreds, [e.target.name]: e.target.value });
    }

    const onLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/users',{
            method: 'GET',
        });
        const data = await response.json();
        var flag = false;
        var userID = '';
        for(let i = 0; i < data.length; i++) {
            if(data[i].email === loginCreds.email && data[i].password === loginCreds.password) {
                setuserid(data[i]._id);
                flag = true;
                userID = data[i]._id;
                break;
            }
        }
        if(flag !== true) {
            alert("Incorrect email or password");
        }
        else {
            const resp = await fetch('http://localhost:4000/users/:id/data',{
                method: 'GET',
            });
            const dat = await resp.json();
            for(let i = 0; i < dat.length; i++) {
                if(dat[i]._userId === userID) {
                    var boardsData = dat[i].data;
                    for(let j = 0; j < boardsData.length; j++) {
                        var name = boardsData[j].name;
                        var newColumns = boardsData[j].columns;
                        dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
                    }
                }
            }
            setIsLogin(true);
        }
    }

    const onRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/users',{
            method: 'GET',
        });
        const data = await response.json();
        var flag = false;
        var userID = '';
        for(let i = 0; i < data.length; i++) {
            if(data[i].email === registerCreds.email) {
                setuserid(data[i]._id);
                flag = true;
                userID = data[i]._id;
                break;
            }
        }
        if(flag === true) {
            alert('User already exists!');
        }
        else {
            if(registerCreds.password === registerCreds.confirm_password) {
                const response = await fetch('http://localhost:4000/users',{
                    method: 'POST',
                    body: JSON.stringify(registerCreds),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data._id);
                setuserid(data._id);
                const response2 = await fetch('http://localhost:4000/users/:id/data',{
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data2 = await response2.json();
                setloginOrsignup(!loginOrsignup);
            }
            else {
                alert("Passwords don't match!");
            }
        }
    }

  return (
    <div className='bg-slate-100 flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>
            Welcome
          </h2>
        </div>
        { loginOrsignup ?
        <>
            <form className='mt-8 space-y-6' onSubmit={onLogin}>
            <input type='hidden' name='remember' value='false' />
            <div className='rounded-md shadow-sm -space-y-px'>
                <div>
                <label htmlFor='email-address' className='sr-only'>
                    Email address
                </label>
                <input
                    name='email'
                    type='email'
                    onChange={onChangeL}
                    required
                    className='appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                    placeholder='Email address'
                />
                </div>
                <div>
                <label htmlFor='password' className='sr-only'>
                    Password
                </label>
                <input
                    name='password'
                    type='password'
                    onChange={onChangeL}
                    required
                    className=' top-3 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                    placeholder='Password'
                />
                </div>
            </div>
            <div className=' flex items-center justify-between'>
                <div className='text-sm'>
                <a href='#' className='font-medium text-[#635fc7] hover:text-indigo-500'>
                    Forgot your password?
                </a>
                </div>
            </div>
            <div>
                <button 
                type='submit'
                className=' button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                    <svg className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                    <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                    </svg>
                </span>
                    Login
                </button>
            </div>
            </form>
            <div>
                <p className='mt-2 text-center text-sm text-gray-600'>
                    Don't have an account? 
                    <button onClick={() => setloginOrsignup(!loginOrsignup)} className='font-medium text-[#635fc7] hover:text-indigo-500'>
                        Sign Up
                    </button>
                </p>
            </div>
        </> 
        :
        <>
            <form className='mt-8 space-y-8' onSubmit={onRegister}>
            <input type='hidden' name='remember' value='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
                <div>
                <label htmlFor='email-address' className='sr-only'>
                    Email address
                </label>
                <input
                    name='email'
                    type='email'
                    onChange={onChangeR}
                    required
                    className='appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                    placeholder='Email address'
                />
                </div>
                <div>
                <label htmlFor='password' className='sr-only'>
                    Password
                </label>
                <input
                    name='password'
                    type='password'
                    onChange={onChangeR}
                    required
                    className=' top-3 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                    placeholder='Password'
                />
                </div>
                <div>
                <label htmlFor='confirm password' className='sr-only'>
                    Confirm Password
                </label>
                <input
                    name='confirm_password'
                    type='password'
                    onChange={onChangeR}
                    required
                    className=' top-6 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                    placeholder='Confirm Password'
                />
                </div>
            </div>
            <div>
                <button 
                className=' top-[2vh] button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                    <svg className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                    <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                    </svg>
                </span>
                    Sign Up
                </button>
            </div>
            </form>
            <div>
                <p className='mt-2 text-center text-sm text-gray-600'> 
                    Already registered?
                    <button
                    onClick={() => setloginOrsignup(!loginOrsignup)}
                    className='font-medium text-[#635fc7] hover:text-indigo-500'>
                        Login
                    </button>
                </p>
            </div>
        </>
        }
      </div>
    </div>
  );
}

export default Login;


{/* <div class="ab xh adg adt alo ari asu avd avk bbo bem bvg bzj bzr ceq" id="headlessui-dialog-panel-2" data-headlessui-state="open"><div class="bxr cbg"><div class="gx lx nj rl up yz ze ads akl buz bxz byt"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="oc se azc"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path></svg></div><div class="lf avl bwj bwv chs"><h3 class="avy awg awp axv" id="headlessui-dialog-title-3" data-headlessui-state="open">Deactivate account</h3><div class="lb"><p class="awa axr">Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.</p></div></div></div><div class="lj bxg bxr cbc"><button type="button" class="ly tn ze adu akq arf arv awa awg bah bbn bji bwh bzi">Deactivate</button><button type="button" class="lf ly tn ze adu alo arf arv awa awg axv bbn bbt bbx bcf bih bwv bzi">Cancel</button></div></div> */}