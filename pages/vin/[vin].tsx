import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { VinDetails } from '../../components/vin-details'
import { MainLayout } from '../../components/layouts/main.layout'

const Vin: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (Array.isArray(router.query.vin) || (router.query.vin && router.query.vin.length != 17)) {
      console.log(router.query.vin)
      router.push('/')
    }
  }, [router.query.vin])

  if (Array.isArray(router.query.vin) || router.query.vin?.length != 17) {
    return null
  }

  return (
    <MainLayout>
      <VinDetails vin={router.query.vin} />
    </MainLayout>
  )
}

export default Vin
