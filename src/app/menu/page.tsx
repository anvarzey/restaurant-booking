import { ReactElement } from 'react'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Filters from './Filters'
import Products from './Products'
import { artifika } from '~/utils/fonts'
import ModalCart from '~/components/ModalCart'

export default function page ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): ReactElement {
  return (
    <>
      <Header />
      <ModalCart />
      <main className='lg:gap-4 lg:px-20 lg:pt-4 lg:pb-8'>
        <h2 className={`text-4xl text-center pb-16 ${artifika.className}`}>Menu</h2>
        <div className='flex'>
          <Filters />
          <Products searchParams={searchParams} />
        </div>
      </main>
      <Footer />
    </>
  )
}
