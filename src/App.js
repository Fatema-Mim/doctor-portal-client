import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";


function App() {
  return (
    <div className="max-w-[1440px] mx-auto">
     <RouterProvider router={router}></RouterProvider> 
     <Toaster />
  
    </div>
  );
}

export default App;
