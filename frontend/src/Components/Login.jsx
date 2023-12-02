import React, { useEffect, useState} from 'react'

function Login({isLogin, setIsLogin, loginCreds, setLoginCreds, userid, setuserid}) {

    const [loginOrsignup, setloginOrsignup] = useState(false)
    // const [loginCreds, setLoginCreds] = useState({});
    const [registerCreds, setRegisterCreds] = useState({})

    const onChangeL = (e) => {
        setLoginCreds({...loginCreds, [e.target.name]: e.target.value });
    }

    const onChangeR = (e) => {
        setRegisterCreds({...registerCreds, [e.target.name]: e.target.value });
    }

    const onLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/users',{
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);
        for(let i = 0; i < data.length; i++) {
            if(data[i].email == loginCreds.email && data[i].password == loginCreds.password) {
                setuserid(data[i]._id);
            }
        }
        setIsLogin(true);
    }

    const onRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/users',{
            method: 'POST',
            body: JSON.stringify(registerCreds),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data._id);
        setuserid(data._id);
        const response2 = await fetch('http://localhost:8080/users/:id/data',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data2 = await response2.json();
        console.log(data2);
        setloginOrsignup(!loginOrsignup);
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
                    name='confirm password'
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
