import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './screens/auth/Register';
import Dashboard from './screens/Dashboard';
import Settings from './screens/Settings';
import Landing from './screens/Landing';
import Login from './screens/auth/Login';
import LoginVerify from "./screens/auth/LoginVerify"
import RegisterVerify from './screens/auth/RegisterVerify';
import RegisterResend from './screens/auth/RegisterResend';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerverify" element={<RegisterVerify />} />
        <Route path="/registerresend" element={<RegisterResend />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginverify" element={<LoginVerify />} />

      </Routes>
  </BrowserRouter>
  )
}

export default App
