import { ReactElement } from 'react'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Filters from './Filters'
import Products from '~/components/Products'
import { artifika } from '~/utils/fonts'
import dynamic from 'next/dynamic'

const ModalCart = dynamic(async () => await import('~/components/ModalCart'), { ssr: false })

export default function page ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): ReactElement {
  return (
    <>
      <Header />
      <main className='bg-neutral-100 lg:gap-4 lg:px-20 lg:pt-28 lg:pb-8'>
        <h2 className={`text-4xl text-center ${artifika.className}`}>Menu</h2>
        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
        {ModalCart && <ModalCart />}
        <div className='flex gap-8'>
          <Filters page='menu' />
          <Products searchParams={searchParams} />
        </div>
      </main>
      <Footer />
    </>
  )
}
