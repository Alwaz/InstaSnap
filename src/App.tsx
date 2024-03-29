import { Route, Routes } from "react-router-dom"
import { LoginForm, SignUpForm } from "./_auth/forms"
import { AllUsers, CreatePost, Explore, Home, Saved } from "./_root/pages"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "./components/ui/toaster"

function App() {


  return (
    <main className="flex h-dvh">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>


        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App
