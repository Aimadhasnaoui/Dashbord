import { ComponentPropsWithoutRef } from "react"
type InputProps = {
  label:string,
  name:string,
  error?: string;
  touched?: boolean; 
} & ComponentPropsWithoutRef<"input">

export default function Input({label,name,error,touched,value,...data} : InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full mb-2">
      <label className="font-medium uppercase open-sans" htmlFor={name}>{label}</label>
      <input id={name} {...data}  className="px-2 py-1 outline-none border-[1px] border-black" />
      {error && touched && error &&
       <p className="text-red-600">{error}</p>
       }
    </div>
  )
}
