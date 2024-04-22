import Rout from "./Rout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./contexts/AuthContext";
import { AdminsideProvider} from './contexts/AdminContext'
function App() {
  return (
    <div className="App">
       <AuthProvider>
        <AdminsideProvider>
            <Rout/>
          </AdminsideProvider>
       </AuthProvider>
    </div>
  );
}

export default App;
