import Grid from '@components/global/grid/grid'
import Spinner from '@components/global/spinner/Spinner'
import Table from '@components/global/table/Table'
import { IProduct } from '@interfaces/model/products/Products'
import useProductsModel from '@model/products/ProductsModel'
import useSpinnerModel from '@model/spinner/SpinnerModel'
import { Button, Image, Skeleton } from '@nextui-org/react'
import { createColumnHelper, CellContext } from '@tanstack/react-table'
import { NextPage } from 'next'
import { useMemo } from 'react'
import { FaRegEye } from 'react-icons/fa'

const HomePage: NextPage = () => {
  const columnHelper = createColumnHelper<IProduct>()
  const { spinnerStorage } = useSpinnerModel()
  const { productStorage } = useProductsModel()

  const data = useMemo<Array<IProduct>>(() => {
    const products: Array<IProduct> = Array.from(productStorage.products)

    return products
  }, [productStorage.products])

  const columns = [
    columnHelper.display({
      id: 'id',
      header: () => <span>Id del producto</span>,
      cell: ({ row: { original: { id } } }: CellContext<IProduct, unknown>) => (
        <Skeleton className='rounded-lg' isLoaded={!spinnerStorage}>
          <div className="flex gap-4 items-center">
            <span>{id}</span>
          </div>
        </Skeleton>
      )
    }),
    columnHelper.display({
      id: 'title',
      header: () => <span>Nombre del producto</span>,
      cell: ({ row: { original: { title } } }: CellContext<IProduct, unknown>) => (
        <Skeleton className='rounded-lg' isLoaded={!spinnerStorage}>
          <div className="flex gap-4 items-center">
            <span>{title}</span>
          </div>
        </Skeleton>
      )
    }),
    columnHelper.display({
      id: 'price',
      header: () => <span>Precio</span>,
      cell: ({ row: { original: { price } } }: CellContext<IProduct, unknown>) => (
        <Skeleton className='rounded-lg' isLoaded={!spinnerStorage}>
          <div className="flex gap-4 items-center">
            <span className="font-bold text-lg">${price}</span>
          </div>
        </Skeleton>
      )
    }),
    columnHelper.display({
      id: 'permalink',
      header: () => <span>Mercado enlace</span>,
      cell: ({ row: { original: { permalink } } }: CellContext<IProduct, unknown>) => (
        <Skeleton className='rounded-lg' isLoaded={!spinnerStorage}>
          <div className="flex gap-4 items-center">
            <Button
              isIconOnly
              variant='bordered'
              aria-label="more"
              size='lg'
              className='hover:text-[#54d7ff]  w-14 h-14 border-[#96d7eb] text-[#96d7eb] hover:text-xl '
              onClick={() => window.open(permalink, '_blank', 'noopener,noreferrer')}
            >
              <FaRegEye/>
            </Button>
          </div>
        </Skeleton>
      )

    }),
    columnHelper.display({
      id: 'thumbnail',
      header: () => <span>Imagen</span>,
      cell: ({ row: { original: { thumbnail } } }: CellContext<IProduct, unknown>) => (
        <Skeleton className='rounded-lg' isLoaded={!spinnerStorage}>
          <div className='w-36 h-36 flex justify-center items-center overflow-hidden rounded-lg'>
            <Image alt='product-image' src={thumbnail} />
          </div>
        </Skeleton>
      )
    })
  ]

  return (
    <>
      <Spinner open={spinnerStorage} />
      <Grid >
        <Table
          columns={columns}
          data={data}
          enableTablePagination
        />
      </Grid>
    </>
  )
}

export default HomePage
