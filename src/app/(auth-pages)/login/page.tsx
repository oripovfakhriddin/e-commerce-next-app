"use client"

import useAuthStore from "@/store/auth/auth"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuthStore()
  const data = {
    username: 'abdulaziz',
    password: '1234567'
  }
  useEffect(() => {
    login(data, router)
  }, [login])

  return (
    <div>LoginPage</div>
  )
}

export default LoginPage