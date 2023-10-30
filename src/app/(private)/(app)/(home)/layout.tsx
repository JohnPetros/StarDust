import { ReactNode } from 'react'

import { Layout } from './components/Layout'

import { SidebarProvider } from '@/contexts/SidebarContext'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Layout>{children}</Layout>
    </SidebarProvider>
  )
}
