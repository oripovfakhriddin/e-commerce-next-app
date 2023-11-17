"use client"

import React, { useEffect } from 'react'

import "./style.scss"
import useAuthStore from '@/store/auth/auth'
import { useRouter } from 'next/navigation'

const PublicAccountPage = () => {

  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("login")
    }
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default PublicAccountPage