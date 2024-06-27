import AxiosContext from '@context/axios/AxiosContext'
import {
  ICategories,
  ICategoriesStorage,
  ISidebarItem
} from '@interfaces/shared/components/sidebar/Sidebar.interface'
import useProductsModel from '@model/products/ProductsModel'
import { Button } from '@nextui-org/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const Sidebar = () => {
  const initialState: ICategoriesStorage = {
    categories: [],
    subCategories: {},
    state: false
  }

  const axios = useContext(AxiosContext)
  const [storage, setStorage] = useState<ICategoriesStorage>(initialState)
  const { getProductsByCategory } = useProductsModel()
  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>({})

  const getCategories = useCallback(async () => {
    try {
      const { data } = await axios.get<Array<ICategories>>(
        'https://api.mercadolibre.com/sites/MLA/categories'
      )
      console.log('data', data)
      setStorage((prevState) => ({
        ...prevState,
        categories: data,
        state: true
      }))
    } catch (error) {
      console.log('error', error)
    }
  }, [axios])

  const getSubcategories = useCallback(
    async (categoryId: string) => {
      try {
        const { data } = await axios.get<ICategories>(
          `https://api.mercadolibre.com/categories/${categoryId}`
        )

        console.log('getSubcategories', data)

        if (data.children_categories.length >= 1) {
          setStorage((prevState) => ({
            ...prevState,
            subCategories: {
              ...prevState.subCategories,
              [categoryId]: data.children_categories
            }
          }))
        } else {
          getProductsByCategory(categoryId)
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    [axios, getProductsByCategory]
  )

  const SidebarItem = ({ item }: ISidebarItem) => {
    const handleClick = async () => {
      if (!openCategories[item.id]) {
        await getSubcategories(item.id)
      }
      setOpenCategories((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
    }

    const isOpen = openCategories[item.id]
    const subCategories: Array<ICategories> =
      storage.subCategories[item.id] || []

    return (
      <li className='cursor-none'>
        <a
          href="#"
          className="block p-2 g gap-2 "

        >
          <Button variant='bordered' onClick={handleClick}>
            <span className="flex gap-4">
              {!isOpen
                ? (
                  <FaPlus className="w-5 h-5" />
                )
                : (
                  <FaMinus className="w-5 h-5" />
                )}
              {item.name}
            </span>
          </Button>
        </a>
        {isOpen && subCategories.length > 0 && (
          <ul className="pl-4">
            {subCategories.map((subItem) => (
              <SidebarItem key={subItem.id} item={subItem} />
            ))}
          </ul>
        )}
      </li>
    )
  }

  useEffect(() => {
    if (!storage.state) getCategories()
  }, [storage.state, getCategories])

  return (
    <div className="h-full w-full flex flex-col items-center overflow-y-scroll overflow-x-hidden p-2">
      <ul className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl flex flex-col gap-2">
        {storage.categories?.map((category) => (
          <SidebarItem key={category.id} item={category} />
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
