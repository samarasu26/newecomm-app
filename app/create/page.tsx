"use client"

import { useState}  from 'react'

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSession } from '@/lib/auth-client'
import {fileActionForm}  from "@/app/file-actions"













const CreateDocumentFile = () => {

  const [price, setPrice] = useState("")

  const handlePriceChange = (value: string) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  }
   




  return (

    <div className="flex flex-col mx-auto justify-center items-center h-160">

    <form action = {fileActionForm} className="flex flex-col items-center justify-center lg:w-[500px] w-80">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your Document</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Create Document
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Title</FieldLabel>
          <Input name ="title" type="title" placeholder="title" required />
        </Field>
        

        <Field>
          <FieldLabel htmlFor="name">Content</FieldLabel>
          <Input name ="content" type="title" placeholder="content" required />
        </Field>
        

        
        <Field>
          <FieldLabel htmlFor="name">Price</FieldLabel>
          <Input  placeholder = "0.00" name = "price" type = "number"
            id = "price" value= {price}

          onChange = {(e)=>setPrice(e.target.value)}

          required
          
          
          
          
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="name">Url</FieldLabel>
          <Input name ="url" type="url" placeholder="url"  />
        </Field>
        
        

        
        
        <Field>
          <FieldLabel htmlFor="">File</FieldLabel>
          <Input type ="file" name = "media"  accept = " .text/*, .pdf/*" multiple required />
          <FieldDescription>
            Upload Text document to Create Doc.
          </FieldDescription>
        </Field>

        
        
        <Field>
          <Button type="submit">Create Document</Button>
        </Field>
        
        
      </FieldGroup>
    </form>
    </div>



    
     

    
  )
}

export default CreateDocumentFile