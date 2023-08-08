import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'

interface IVARIANTS {
  filled: string
  outline: string
}

interface IProps extends ComponentPropsWithoutRef<'button'> {
  href?: string
  link?: boolean
  children: ReactNode
  variant: keyof IVARIANTS
  onClick?: () => void
}

export default function Button ({ href, link, children, onClick, variant, ...props }: IProps): ReactElement {
  const VARIANTS: IVARIANTS = {
    filled: 'bg-primary border-primary text-white',
    outline: 'border-neutral-700 hover:border-primary hover:text-primary disabled:hover:border-neutral-700 disabled:hover:text-black'
  }

  return (
    <>
      {
        link === true
          ? (
            <Link
              href={href ?? '#'}
              className={`w-full flex items-center justify-center cursor-pointer py-2 px-4 rounded-xl border disabled:opacity-50 disabled:cursor-default ${VARIANTS[variant]}`}
            >
              {children}
            </Link>)
          : (
            <button
              className={`w-full cursor-pointer py-2 px-4 rounded-xl border disabled:opacity-50 disabled:cursor-default ${VARIANTS[variant]}`}
              onClick={onClick}
              {...props}
            >
              {children}
            </button>)
      }
    </>
  )
}
