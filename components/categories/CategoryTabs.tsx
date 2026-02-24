
import React from 'react'
import BtnNewCategory from './BtnNewCategory'
import { Category } from '@/src/schemas'

export default function CategoryTabs( {categories} : {categories: Category[]}) {
  
  return (
    <div className='flex w-full items-center justify-between '>
      <BtnNewCategory/>
      <p className='font-semibold mr-6 text-xs '>Categorías ( <span className='font-black'>{categories.length}</span> ) </p>
    </div>
  )
}
