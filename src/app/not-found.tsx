import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <section className='flex flex-col h-full items-center justify-center'>
      <h3 className='text gradient-text font-bold text-5xl leading-[60px]'>404 error</h3>
      <p>The page you are looking for does not exist.</p>
       <Link href="/" className="text-muted-foreground hover:text-foreground">
        Back to home
      </Link>

    </section>
  )
}
