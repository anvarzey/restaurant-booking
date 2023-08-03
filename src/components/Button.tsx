import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'

interface IVARIANTS {
  filled: string
  outline: string
}

interface IProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant: keyof IVARIANTS
  onClick?: () => void
}

export default function Button ({ children, onClick, variant, ...props }: IProps): ReactElement {
  const VARIANTS: IVARIANTS = {
    filled: 'bg-primary border-primary text-white',
    outline: 'border-neutral-700 hover:border-primary hover:text-primary'
  }
  return (
    <button
      className={`w-full cursor-pointer py-2 px-4 rounded-xl border disabled:opacity-50 disabled:cursor-default ${VARIANTS[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
