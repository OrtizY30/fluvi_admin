import QrContent from '@/components/qr-code/QrContent'
import QrHeader from '@/components/qr-code/QrHeader'
import React from 'react'

export default function QrCodePage() {
  return (
    <div className="flex-1 flex h-full pb-20 flex-col bg-surface-base overflow-hidden">
        <QrHeader/>
        <QrContent/>
    </div>
  )
}
