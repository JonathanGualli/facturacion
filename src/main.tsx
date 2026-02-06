import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/auth.context.provider.tsx'
import { ModalProvider } from './components/Modal/context/ModalContext.tsx'
import { AppRouter } from './AppRouter.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ModalProvider>
        <App>
          <AppRouter />
        </App>
      </ModalProvider>
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider>
)
