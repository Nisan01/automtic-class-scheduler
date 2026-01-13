"use client"

import { Button } from '@/components/ui/Button';
import React, { useState } from 'react'


const items=[
  {
    id:1,
    name:"Nishan Chauhan",
    age:20,
    address:"Chabahil"
  },
  {
    id:2,
    name:"Nisha Chauhan",
    age:20,
    address:"Chabahil"
  },
  {
    id:3,
    name:"Nick Chauhan",
    age:20,
    address:"Chabahil"
  },
  {
    id:4,
    name:"Nirjal Chauhan",
    age:20,
    address:"Chabahil"
  }
]


function view_schedule() {


  return (
    <div>
      

{items.map((itm)=>{
return(

  <div key={itm.id}>
    <div>
      <h2>Name:{itm.name}</h2>
    </div>


  </div>

)})}


      </div>
  )
}

export default view_schedule