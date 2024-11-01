import Input from "../Style/Input";
import { Formik } from 'formik';
import { useEffect, useState } from "react";
import { ValuesType } from "../../tsFile/script";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputText } from "primereact/inputtext";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import { FloatLabel } from "primereact/floatlabel";
import { TextField } from "@mui/material";

const initialValues: Omit<ValuesType, 'id'> = {
    FirstName: "",
    LastName: "",
    Adress: "",
    email: "",
    tel: ""
};

export default function Form() {
    const [data, setData] = useState<ValuesType[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            const data = JSON.parse(storedData);
            setData(data);
        }
    }, []);

    return (
        <div className="w-1/2 h-full py-6 px-8 relative ">
            <ToastContainer />
            <h1 className="font-medium capitalize my-2 text-[30px] text-center open-sans">Register Candidate</h1>
            <Formik
                initialValues={initialValues}
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
                }}
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
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit} className="mt-6">

                        <TextField 
                            fullWidth 
                            label="FirstName" 
                            id="FirstName" 
                            name="FirstName"  
                            error={touched.FirstName && Boolean(errors.FirstName)}
                            helperText={touched.FirstName && errors.FirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.FirstName}
                            className="my-2"
                            />
                            <TextField 
                            fullWidth 
                            label="Last Name"
                            id="Last Name" 
                            name="LastName"  
                            error={touched.LastName && Boolean(errors.LastName)}
                            helperText={touched.LastName && errors.LastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.LastName}
                             className="my-2"
                            />
                            <TextField
                                fullWidth
                                label="Address"
                                id="Adress"
                                name="Adress"
                                error={touched.Adress && Boolean(errors.Adress)}
                                helperText={touched.Adress && errors.Adress}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Adress}
                                className="my-2"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                id="email"
                                name="email"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className="my-2"
                            />
                            <TextField
                                fullWidth
                                label="Tel"
                                id="tel"
                                name="tel"
                                error={touched.tel && Boolean(errors.tel)}
                                helperText={touched.tel && errors.tel}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.tel}
                                className="my-2"
                            />
                        <input
                            type="submit"
                            value="Submit"
                            className="bg-green-600 w-full py-2 mt-4 mb-2 text-white cursor-pointer"
                        />
                        <div className="w-full items-center text-center my-1">
                            <Link to='Dashbord' className="text-center text-green-600">Go to Dashboard <ArrowForwardIosIcon /></Link>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
