import { ReactElement } from 'react'
import Footer from '~/components/shared/Footer'
import Header from '~/components/shared/Header'
import Filters from '~/components/menu/Filters'
import Products from '~/components/shared/Products'
import { artifika } from '~/utils/fonts'
import dynamic from 'next/dynamic'

const OrderModal = dynamic(async () => await import('~/components/menu/OrderModal'), { ssr: false })

export default function page ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): ReactElement {
  return (
    <>
      <Header />
      <main className='bg-neutral-100 lg:gap-4 lg:px-20 lg:pt-28 lg:pb-8'>
        <h2 className={`text-4xl text-center ${artifika.className}`}>Menu</h2>
        {OrderModal !== null
          ? <OrderModal />
          : <div className='h-8 lg:h-24 content-[""]' />}
        <div className='flex gap-8'>
          <Filters page='menu' />
          <Products searchParams={searchParams} />
        </div>
      </main>
      <Footer />
    </>
  )
}
