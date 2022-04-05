import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='text-primary_dark_blue'>
      <Component { ...pageProps } />
    </div>
  )
}

export default MyApp
