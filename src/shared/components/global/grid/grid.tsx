import React, { FC } from 'react'
import { IGrid } from '@interfaces/shared/components/grid/Grid.'
import Sidebar from '@components/base/sidebar/Sidebar'
import { Button } from '@nextui-org/react'
import useProductsModel from '@model/products/ProductsModel'

const Grid: FC<IGrid> = ({ children }) => {
  const { readProducts } = useProductsModel()
  return (
    <main className='h-screen p-2'>
      <div className='h-full rounded-3xl border-2 shadow-2xl' >
        <div className='h-[8%] text-white bg-cyan-600 flex px-40 items-center rounded-t-3xl border-solid border-2  overflow-x-hidden justify-between'>
          <span>Cliente CS3</span>
          <Button variant='bordered' className='text-white' onClick={readProducts} >
            Eliminar filtros
          </Button>
        </div>
        <div className=' h-[92%] flex flex-row '>
          <div className='rounded-b-3xl w-3/12'>
            <Sidebar/>
          </div>
          <div className=' w-9/12 p-1'>{ children }</div>
        </div>
      </div>
    </main>
  )
}

export default Grid
