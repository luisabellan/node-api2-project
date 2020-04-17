import React, {useState, useEffect} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.scss';

function App() {

  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/posts`
      )
      .then(res => setData(res.data))
      .catch(err => `Houston we have an error: ${err}`)
  }, []);


  return (
    <div className="App">
      <ul>
            {data.map(post =>{
              return (
                <div className="post">
                  <h2>{post.title}</h2>
                  <p>{post.contents}</p>
                </div>

              )
            })}

      </ul>




    </div>
  );
}

export default App;
