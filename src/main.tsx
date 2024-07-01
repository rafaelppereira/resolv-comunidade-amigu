import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

import { QueryClientProvider } from '@tanstack/react-query'

import './styles/global.css'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import { queryClient } from './lib/react-query.ts'

import { Toaster } from './components/ui/sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider storageKey="comunidade-amigu" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster richColors position="bottom-left" />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
