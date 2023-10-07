import { Layout } from "../components/Layout"
import authContext from "../context/auth/authContext"
import { useContext, useEffect } from "react"

export default function Home() {

  // Extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  useEffect(()=>{
    usuarioAutenticado()
  }, [])

  return (
    <Layout>
        <h1>Index</h1>
    </Layout>
  )
}
