
import LoginComp from '@/components/AdminLogin/Admin_Login'
import TransitionWrapper from '@/components/FramerTransition/FramerTransition'
import React from 'react'

function LoginPage() {


  return (
        <div>
        
       <TransitionWrapper>
          <LoginComp/>
        
        </TransitionWrapper>
        
        </div>
  )
}

export default LoginPage