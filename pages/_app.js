import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={ store }>
      <div className='text-primary_dark_blue'>
        <Component { ...pageProps } />
      </div>
    </Provider>
  )
}

export default MyApp
