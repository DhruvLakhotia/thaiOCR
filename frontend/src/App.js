import {BrowserRouter , Route,Routes} from "react-router-dom";
import './App.css';
import  UploadImage  from './Screens/UploadImage';
import  ResultPage  from './Screens/Results';

function App() {
  return (
    <>
    <div>
      <BrowserRouter>
      <Routes>

      <Route path="/" element={<UploadImage/>}/>
      <Route exact path="/result" element={<ResultPage/>}/> 


      </Routes>
      </BrowserRouter>

    </div>
    </>
  );
}

export default App;
