import FormPage from "./Component/Form/FormPage"
import Table2 from "./Component/Table/Table2"
import EditFrom from "./Component/Table/EditFrom";
import { PrimeReactProvider } from "primereact/api"; 
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <FormPage></FormPage>,
  },
  {
    path: "Dashbord",
    element: <Table2></Table2>,
  },
  {
    path: "Dashbord2",
    element: <Table2></Table2>,
  }
  

]);
function App() {
  
  return (
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  )
}

export default App
