import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Dashboard from './Components/userDashboard/Screens/Dashboard';
import SignIn from './Components/SignIn';
import AdminDashboard from './Components/adminDashboard/Screens/AdminDashboard';

import AdminLogin from './Components/AdminLogin';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<SignIn />} path="/login" />

          <Route element={<AdminDashboard />} path="/admindashboard/*" />
          <Route element={<AdminLogin />} path="/adminlogin" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
