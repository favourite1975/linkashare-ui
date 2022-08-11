import Axios from '../Config/axios';
import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Input from '../Components/Input';
import AuthBanner from '../Layout/AuthBanner';


const Login = () => {
    const [state, setState] = useState({
    email:'',
    password:''
  })

  const [progress, setProgress] = useState({
    error:[false, undefined],
    loading:false
  })
  return (
    <main className="min-h-screen flex bg-dark text-white">
    <AuthBanner heading='Login to Your Account' suggest={(
      <p className='absolute top-0 text-xs p-4'>
      <span className="opacity-80"> Don't Have an Account Yet? ?</span> <Link to='/register' className='text-primary transition-all underline hover:decoration-double'>Sign up</Link>
        </p>
    )}>
      <form className="" onSubmit={(e)=>{
        e.preventDefault()
      
        setProgress({
          ...progress,
          loading:true
        })
        Axios.post('/login.php',state)
        .then(res=>{
          console.log(res);
          setProgress({
            loading:false,
            error:[false,undefined]
          })
          if(res.data[0] == 'Success'){
            alert('Signed in Successfully')

          }
        })
        .catch(err=>{
          setProgress({
            loading:false,
            error:[true, err.message]
          })
          console.error(err);
        })
      }}>

        <Input
          type="email"
          label="E-mail"
          placeholder="example@mail.com"
           onChange={(e:any)=> setState({...state,email:e.target.value})}
          icon={<FaEnvelope />}
        />

        <Input
          type="password"
          label="Password"
          placeholder="*******"
           onChange={(e:any)=> setState({...state,password:e.target.value})}
          icon={<FaLock />}
        />

        <Link
          className="underline hover:decoration-double text-primary"
          to="/forgotten-password"
        >
          Forgotten Password?
        </Link>
        <div>
          <button disabled={progress.loading} className={`p-5 py-4 text-white hover:text-dark hover:bg-white transition-colors my-6 cursor-pointer w-full bg-primary disabled:pointer-events-none disabled:opacity-60 disabled:select-none`}>
            {progress.loading ?(
              <div className="">
                Please Wait ...
              </div>
            ): 'Login into Account'}
          </button>
        </div>
      </form>
    </AuthBanner>
  </main>
  )
}

export default Login