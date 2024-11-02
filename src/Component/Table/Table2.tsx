import { useEffect, useRef, useState } from 'react';
import { ValuesType } from '../../tsFile/script';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Toast } from 'primereact/toast';
import EditFrom from './EditFrom';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { stopPropagation } from 'ol/events/Event';

export default function Table2() {
    const [rows, setRows] = useState<ValuesType[]>([]);
    const [globalstate, setglobalstate] = useState("");
    const [visibledit, setvisibledit] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [item, setitem] = useState<ValuesType>({
        id: 0,
        FirstName: "",
        LastName: "",
        Adress: "",
        email: "",
        tel: ""
    });
    const toast = useRef<Toast>(null);

    useEffect(() => {
      const storedData = localStorage.getItem("data");
      if (storedData) {
          const data: ValuesType[] = JSON.parse(storedData);
          setRows(data);
          console.log(data);
      }
  }, []);

function HandelDelete(item:ValuesType){
  const NewData = rows.filter((row)=>{
    return row.id !== item.id
  })
  setRows(NewData)
  localStorage.setItem("data",JSON.stringify(NewData))
  console.log(NewData)
  toast.current?.show({severity:'success', summary: 'Success', detail:'the element has been delted', life: 2500});
}



const columns: GridColDef<ValuesType>[] = [
  { 
      field: "FirstName", 
      headerName: "First Name", 
      flex: 1,
      renderCell: (params) => (
          <div onClick={(event) => event.stopPropagation()}>
              {params.value} {/* Display the value */}
          </div>
      )
  },
  { 
      field: "LastName", 
      headerName: "Last Name", 
      flex: 1,
      renderCell: (params) => (
          <div onClick={(event) => event.stopPropagation()}>
              {params.value} {/* Display the value */}
          </div>
      )
  },
  { 
      field: "Adress", 
      headerName: "Address", 
      flex: 1,
      renderCell: (params) => (
          <div onClick={(event) => event.stopPropagation()}>
              {params.value} {/* Display the value */}
          </div>
      )
  },
  { 
      field: "email", 
      headerName: "Email", 
      flex: 1,
      renderCell: (params) => (
          <div onClick={(event) => event.stopPropagation()}>
              {params.value} {/* Display the value */}
          </div>
      )
  },
  { 
      field: "tel", 
      headerName: "Telephone", 
      flex: 1,
      renderCell: (params) => (
          <div onClick={(event) => 
            event.stopPropagation()
          }>
              {params.value} {/* Display the value */}
          </div>
      )
  },
  { 
      field: "Action", 
      headerName: "Action", 
      flex: 1,
      renderCell: (params: { row: ValuesType; }) => (
          <div className='flex h-full gap-4 items-center justify-center' onClick={(event) => event.stopPropagation()}>
              <div 
                  className='bg-blue-600 h-2/3 flex justify-center items-center rounded-full px-1 py-1'
                  onClick={(event) => {
                      event.stopPropagation(); // Prevent row selection
                      setitem(params.row); // Your logic to handle edit
                  }}
              >
                  <ModeEditIcon className='cursor-pointer text-white' />
              </div>
              <div 
                  className='bg-red-600 h-2/3 flex justify-center items-center rounded-full px-1 py-1'
                  onClick={(event) => {
                      event.stopPropagation(); // Prevent row selection
                      HandelDelete(params.row); // Your logic to handle delete
                      console.log("Delete clicked for row:", params.row);
                  }}
              >
                  <DeleteIcon className='cursor-pointer text-white' />
              </div>
          </div>
      ),
  }
];

    const handleFilter = (data: ValuesType[]) => {
        if (!globalstate) return data; // If there's no input, return all data

        return data.filter(row => {
            return (
                row.FirstName.toLowerCase().includes(globalstate.toLowerCase()) ||
                row.LastName.toLowerCase().includes(globalstate.toLowerCase()) ||
                row.Adress.toLowerCase().includes(globalstate.toLowerCase()) ||
                row.email.toLowerCase().includes(globalstate.toLowerCase()) ||
                row.tel.toLowerCase().includes(globalstate.toLowerCase())
            );
        });
    };

    const filteredRows = handleFilter(rows); 



    return (
        <div className='px-9 py-4'>
            <Toast ref={toast} />
            <div className='my-2'>
                <h1 className='font-semibold text-[40px]'>Management</h1>
                <div className='flex justify-between items-center my-2'>
                    <div className='relative w-full'>
                        <SearchIcon className='absolute top-2 left-2'></SearchIcon>
                        <input
                            onChange={(e) => setglobalstate(e.target.value)}
                            placeholder='Search'
                            className='w-[40%] rounded-xl px-6 py-2 outline-none border-[1px] border-black'
                        />
                    </div>
                    <button className="bg-green-600 py-2 px-6 text-white rounded-md">
                        <Link to="/">
                            Add new Candidate
                        </Link>
                    </button>
                    <div>

                    </div>
                </div>
            </div>
            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={filteredRows} // Use filtered rows
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                  onRowSelectionModelChange={(newSelectionModel) => {
                    setSelectedRows(newSelectionModel);
                    console.log("Selected rows:", newSelectionModel);
                }}
                getRowClassName={(params) =>
                  selectedRows.includes(params.id) ? 'bg-red-600' : ''
              }
                />
            </Paper>
            <EditFrom visibledit={visibledit} setvisibledit={setvisibledit} item={item}></EditFrom>
        </div>
    );
}