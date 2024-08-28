'use client'

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState('')

  let textValue = ''

  return (
    <main>
      <Select>
        <MenuItem value='GET'>GET</MenuItem>
        <MenuItem value='POST'>POST</MenuItem>
        <MenuItem value='PUT'>PUT</MenuItem>
        <MenuItem value='PATCH'>PATCH</MenuItem>
        <MenuItem value='DELETE'>DELETE</MenuItem>
        <MenuItem value='HEAD'>HEAD</MenuItem>
        <MenuItem value='OPTIONS'>OPTIONS</MenuItem>
      </Select>
    
      <TextField onChange={(e:any) =>{
        setText(e.target.value)
        textValue = e.target.value
        
        }}  value={text}/>


<div>text : {text}</div>
<div>textValue : {textValue}</div>
      
    </main>
  );
}
