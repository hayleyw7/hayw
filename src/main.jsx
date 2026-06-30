import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/source-sans-pro/latin-300.css'
import '@fontsource/source-sans-pro/latin-300-italic.css'
import '@fontsource/source-sans-pro/latin-400.css'
import '@fontsource/source-sans-pro/latin-400-italic.css'
import '@fontsource/source-sans-pro/latin-600.css'
import '@fontsource/source-sans-pro/latin-600-italic.css'
import '@fontsource/source-sans-pro/latin-700.css'
import '@fontsource/source-sans-pro/latin-700-italic.css'
import '@fontsource/source-sans-pro/latin-900.css'
import '@fontsource/source-sans-pro/latin-900-italic.css'
import App from './App.jsx'
import './styles/index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
