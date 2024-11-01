import { DataTable } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { ValuesType } from '../../tsFile/script';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from 'primereact/button';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {Dialog, DialogActions, DialogContent } from '@mui/material';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import EditFrom from './EditFrom';
import { useNavigate } from 'react-router-dom';

export default function Table2() {
    const [rows, setRows] = useState<ValuesType[]>([]);
    const [globalstate,setglobalstate] =useState("")
    const [visibledit,setvisibledit] = useState<boolean>(false)
    const [visibledelet,setvisibledelet] = useState<boolean>(false)
    const [item,setitem] = useState<ValuesType>( {
      id: 0,
      FirstName: "",
      LastName: "",
      Adress: "",
      email: "",
      tel: ""
  })
    const toast = useRef<Toast>(null);
    const navigate = useNavigate();
    
    const columns = [
      { field:"FirstName", header:"FirstName"  },
      { field: 'LastName', header: 'LastName' },
      { field: 'Adress', header: 'Adress' },
      { field: 'email', header: 'Email' },
      { field: 'tel', header: 'Telephone' }
  ];

    useEffect(() => {
            const storedData = localStorage.getItem("data");
            if (storedData) {
              const data: ValuesType[] = JSON.parse(storedData);
              setRows(data);
              console.log(data); 
            }
          }, []);

          function editProduct(rowData: ValuesType): void {
            console.log(rowData)
            setvisibledit(true)
            setitem(rowData)
          }

          function confirmDeleteProduct(rowData: ValuesType): void {
            console.log(rowData)
            setvisibledelet(true)
            setitem(rowData)
          }
          const actionBodyTemplate = (rowData: ValuesType) => {
            return (
                <>
                      <Button onClick={() => editProduct(rowData)}icon="pi pi-pencil" rounded outlined className="mr-2 border border-blue-500 rounded-full text-blue-500"  />
                      <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} className="border border-red-500 rounded-full text-red-500" />
                </>
            );
        };



function DeleteItem() {
  console.log(rows);
  const updatedRows = rows.filter((e) => e?.id !== item?.id); // Exclude the item to delete
  setRows(updatedRows); // Update the state with the new array
  console.log(updatedRows);
  setvisibledelet(false)
  toast.current?.show({severity:'info', summary: 'Info', detail:'the element has been deleted whit succes Content', life: 2500});
}
const textEditor = (options: ColumnEditorOptions) => {
  return <InputText type="text" value={options.value} onChange={(e) => console.log(options.value)} onKeyDown={(e) => e.stopPropagation()} />;
};
  return (
<div className='px-9 py-4'>
<Toast ref={toast} />
<div className='my-2'>
        <h1 className='font-semibold text-[40px]'>Management</h1>
        <div className='flex justify-between items-center my-2'>
          <div className='relative w-full'>
            <SearchIcon className='absolute top-2 left-2'></SearchIcon>
            <input onChange={(e) => setglobalstate(e.target.value)}  placeholder='Search' className='w-[40%] rounded-xl px-8 py-2 outline-none border-[1px] border-black'></input>
          </div>
          <button className="bg-green-600 py-2 px-6 text-white rounded-md">
            <Link to="/">
              Add new Candidate
            </Link>
          </button>
        </div>
      </div>
<DataTable 
removableSort globalFilter={globalstate} 
value={rows} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
tableStyle={{ minWidth: '50rem' }}
scrollable
scrollHeight="500px" virtualScrollerOptions={{ itemSize: 10 }} 
showGridlines
className='border border-gray-300'
editMode="cell"
>
{columns.map(({ field, header }) => {
                    return <Column editor={(options) => textEditor(options)} className='border-b border-gray-300' key={field} field={field} header={header} style={{ width: '25%' }}  />;
                })}
    <Column className='border-b border-gray-300' header="Actions" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
</DataTable>

<Dialog open={visibledelet} onClose={() => setvisibledelet(false)} style={{ width: '50rem' }} className='mx-auto'>
        <div className='flex w-full justify-between py-4 px-3'>
            <h1 className='text-[25px] font-bold'>Confirmer</h1>
            <CloseIcon className='cursor-pointer' onClick={() => setvisibledelet(false)}></CloseIcon>
        </div>
            <DialogContent className='flex gap-2'>
            <WarningAmberIcon></WarningAmberIcon>
             <p>Are you sure you want to delete {item?.FirstName}?</p>
            </DialogContent>
            <DialogActions>
                 <Button onClick={() => setvisibledelet(false)} className='border-[1px] border-red-600 px-4 py-2 text-red-600' >No</Button>
                 <Button onClick={() => 
                 DeleteItem()
                 } className='border-[1px] border-green-500 px-4 py-2 text-green-500' >Yes</Button>

            </DialogActions>
</Dialog>
<EditFrom visibledit={visibledit} setvisibledit={setvisibledit} item={item} ></EditFrom>
</div>
  )
}
