import React, { useEffect, useState} from 'react'

function Login({isLogin, setIsLogin}) {

    const [loginOrsignup, setloginOrsignup] = useState(false)
    const [loginCreds, setLoginCreds] = useState({});
    const [registerCreds, setRegisterCreds] = useState({})

    const onChangeL = (e) => {
        console.log(e.target.value,e.target.name);
        setLoginCreds({...loginCreds, [e.target.name]: e.target.value });
    }

    const onChangeR = (e) => {
        console.log(e.target.value,e.target.name);
        setRegisterCreds({...registerCreds, [e.target.name]: e.target.value });
    }

    const onLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/demo',{
            method: 'POST',
            body: JSON.stringify(loginCreds),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setIsLogin(!isLogin);
    }

    const onRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/demo',{
            method: 'POST',
            body: JSON.stringify(registerCreds),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setloginOrsignup(!loginOrsignup);
    }

    const getUsers = async () => {
        const response = await fetch('http://localhost:8080/demo',{
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        getUsers();
    })

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
