import BannerContent from '@/components/banner/BannerContent'
import HeaderBanner from '@/components/banner/HeaderBanner'
import React from 'react'

export default function BannerPage() {
  return (
       <div className="flex-1 bg-surface-base flex  flex-col overflow-hidden">
        <HeaderBanner />
        <BannerContent />
       </div>

  )
}
