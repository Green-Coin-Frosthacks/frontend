import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from './App.jsx'
import AuthContextProvider from './features/Auth/Auth.context.jsx';

const queryClient = new QueryClient();


import { ModalProvider } from './global/context/ModalContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <AuthContextProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
