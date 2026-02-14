import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import RootLayout from './Layouts/RootLayout.jsx';
import Baby  from '../src/Pages/Baby.jsx';
import Tots from '../src/Pages/Tots.jsx';
import Junior from '../src/Pages/Junior.jsx';
import Kids from '../src/Pages/Kids.jsx';
import Teen from '../src/Pages/Teen.jsx';
import Gifts from '../src/Pages/Gifts.jsx';
import Sale from '../src/Pages/Sale.jsx';
import Home from '../src/Pages/Home.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* You "Plug In" the RootLayout here as the main wrapper */}
    <Route path='/' element={<RootLayout/>}>
    {/* Add this line so the screen isn't empty on arrival */}
      <Route index element={<Home />} />

      {/* These pages "Fill the hole" inside the Layout */}
        <Route path='baby' element={<Baby />}/>
        <Route path='tots' element={<Tots />}/>
        <Route path='junior' element={<Junior />}/>
        <Route path='kids' element={<Kids />}/>
        <Route path='teen' element={<Teen />}/>
        <Route path='gifts' element={<Gifts />}/>
        <Route path='sale' element={<Sale />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
