import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
function App() {
  // const [data, setData] = useState([{}])

  // useEffect(()=>{
  //   fetch("/members").then(
  //     res => res.json()
  //   )
  //   .then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // },[])
  return (
  <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
     </Routes>
  </BrowserRouter>
  );
}

export default App;
