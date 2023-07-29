'use client'

import { ReactElement } from 'react'

export default function UploadButton (): ReactElement {
  const handleClick = async (): Promise<void> => {
    await fetch('/api/menu').then((res) => console.log(res.json()))
  }

  return (
    <button onClick={async () => await handleClick()}>Upload</button>
  )
}
