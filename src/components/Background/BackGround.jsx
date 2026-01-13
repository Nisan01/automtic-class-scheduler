
import React from 'react'


function BackGround({children}) {
  return (
     <div className="relative  min-h-screen w-full bg-primary overflow-hidden">
   
     
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[50%] h-screen bg-gray-200 rounded-full blur-[250px] opacity-50"></div>

      {/* Page content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default BackGround