import { Dialog } from "@mui/material";
import Input from "../Style/Input";
import { Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction, useState } from "react";
import { ValuesType } from "../../tsFile/script";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
type EditProps = {
    visibledit:boolean,
    setvisibledit: Dispatch<SetStateAction<boolean>>,
    item:ValuesType
} 
export default function EditFrom({visibledit,setvisibledit,item}:EditProps) {
  const [data, setData] = useState<ValuesType[]>([]);

  return (      
    <Dialog open={visibledit} onClose={() => setvisibledit(false)}  PaperProps={{
        style: {
          width: '50rem', 
          maxWidth: '90%', 
          height: 'auto', 
        }
      }} className='mx-auto'>
            <div className='flex w-full border-b border-black py-4 px-3'>
                <h1 className='text-[25px] font-bold py-2'>Update Candidat</h1>
            </div>
            <Formik
        initialValues={item}
        validate={values => {
          const errors: Partial<ValuesType> = {};

          if (!values.FirstName) {
            errors.FirstName = 'Please enter the First Name';
          } else if (values.FirstName.length < 2) {
            errors.FirstName = 'The First Name is too short';
          }

          if (!values.LastName) {
            errors.LastName = 'Please enter the Last Name';
          } else if (values.LastName.length < 2) {
            errors.LastName = 'The Last Name is too short';
          }

          if (!values.Adress) {
            errors.Adress = 'Please enter the Address';
          } else if (values.Adress.length < 2) {
            errors.Adress = 'The Address is too short';
          }

          if (!values.email) {
            errors.email = 'Please enter the Email';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'The Email is incorrect';
          }

          if (!values.tel) {
            errors.tel = 'Please enter the phone number';
          } else if (!/^06[0-9]{8}$/.test(values.tel)) {
            errors.tel = 'The Phone number is incorrect';
          }

          return errors;
        } } 
                      onSubmit={(values, {resetForm}) => {
                    const newEntry: ValuesType = {
                        ...values,
                        id: Date.now(),
                    };
                    setData(prevData => {
                        const newData = [...prevData, newEntry];
                        localStorage.setItem("data", JSON.stringify(newData));
                        console.log("Submitted values:", newData);
                        toast.success("Data loaded successfully!");
                        resetForm()
                        return newData;
                    });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    
                }) => (
                    <form  className="p-4">
                        <Input
                            label={"First Name"}
                            name={"FirstName"}
                            error={errors.FirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.FirstName}
                        />
                        <Input
                            label={"Last Name"}
                            name={"LastName"}
                            error={errors.LastName}
                            touched={touched.LastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.LastName}
                        />
                        <Input
                            label={"Address"}
                            name={"Adress"}
                            error={errors.Adress}
                            touched={touched.Adress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Adress}
                        />
                        <Input
                            label={"Email"}
                            name={"email"}
                            error={errors.email}
                            touched={touched.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <Input
                            label={"Tel"}
                            name={"tel"}
                            error={errors.tel}
                            touched={touched.tel}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tel}
                        />

                        <div className="w-full gap-3 justify-end">
                        <input
                            type="submit"
                            value="Update"
                            className="border-[1px] border-green-600 px-4 py-2 text-red-600px-2 mr-4  text-green-600  cursor-pointer"
                        />
                          <Button onClick={() => setvisibledit(false)} className='border-[1px] border-red-600 px-4 py-2 text-red-600' >No</Button>
                        </div>

                    </form>
                )}
            </Formik>
    </Dialog>
  )
}
