import type { NextPage } from 'next'
import React from 'react'
import { VinForm } from '../components/vin-form'
import { MainLayout } from '../components/layouts/main.layout'

const Home: NextPage = () => (
  <MainLayout>
    <VinForm />
  </MainLayout>
  )

export default Home
