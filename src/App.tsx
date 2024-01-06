import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { useRoutes } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { Home } from "./components/home"
import Layout from "./components/layout"
import { Toaster } from "./components/ui/toaster"
import { ApiProvider } from "./lib/api-provider"

const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
]

function App() {
  const children = useRoutes(routes)

  return (
    <ApiProvider>
      <RecoilRoot>
        <Toaster />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
        </ThemeProvider>
      </RecoilRoot>
    </ApiProvider>
  )
}

export default App
