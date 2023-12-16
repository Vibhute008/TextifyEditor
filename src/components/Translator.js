import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// const axios = require('axios').default;
import axios from 'axios';
import { textActions } from '../store/features/text/textSlice';


function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const textState = useSelector((state) => state.text);
  const themeState = useSelector((state) => state.theme);

  const translate = () => {
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      console.log(res.data)
      setOutput(res.data.translatedText)
    })
  };

  const handleOnChange = (event) =>
    dispatch(textActions.updateText({ text: event.target.value }));

  useEffect(() => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        console.log(res.data);
        setOptions(res.data);
      });
  }, []);

  //  curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"

  return (

    <div className="container" style={{ textAlign:"center", color: themeState.color, }}>
      <h1 className="mb-2">Enter The Text Below To Translate</h1>
      <div className='my-3'>
        From({from}) : {' '}
        <select onChange={(e) => setFrom(e.target.value)} style={{ padding: '5px' }}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option> 
          ))}
        </select>

        {'\t'}

        To({to}) : {' '}
        <select onChange={(e) => setTo(e.target.value)} style={{ padding: '5px' }}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
        <div className='mb-3 my-3'>
        <textarea
        className='form-control'
        id='myBox'
          rows="8"
          onChange={handleOnChange}
          style={{
            backgroundColor: themeState.backgroundColor,
            color: themeState.color,
          }}
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
        <div className='mb-3 my-3' >
        <textarea
        className='form-control'
        id='myBox' rows="8" value={output}
          onChange={handleOnChange}
          style={{
            backgroundColor: themeState.backgroundColor,
            color: themeState.color,
          }}></textarea>
        </div>
      </div>
      
      <div>
        <button type="button" className="btn btn-primary mx-1 my-1" onClick={e => translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;