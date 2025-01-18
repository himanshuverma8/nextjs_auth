import React from 'react'
import Image from 'next/image'

type Props = {
    size?: number;
};

const LoadingLogo = ({size=100}: Props) => {
  return (
    <div className='h-full w-full flex justify-center items-center absolute'>
        <Image src="/lighting.png" alt="Loading Logo" width={size} height={size} className='animate-pulse '/>
    </div>
  )
}

export default LoadingLogo