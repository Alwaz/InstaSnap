import { Route, Routes } from "react-router-dom"
import SignInForm from "./auth/forms/SignInForm"
import Home from "./root/pages/Home"

function App() {


  return (
    <main className="flex h-dvh">
      <Routes>
        {/* public routes */}
        <Route path="/sign-in" element={<SignInForm />} />
        {/* private routes */}
        <Route index element={<Home />} />
      </Routes>
      helooo

    </main>
  )
}

export default App
