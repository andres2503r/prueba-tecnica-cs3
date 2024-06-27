import AxiosContext from '@context/axios/AxiosContext'
import { useStorage } from '@context/global-state/GlobalState'
import { IAxiosResponse } from '@interfaces/context/axios/Axios'
import { IProduct, IProductsModel, IProductsStorage } from '@interfaces/model/products/Products'
import { useCallback, useContext, useEffect } from 'react'
import { ERROR_COUNTER } from '../../../data/constant/constant'
import useSpinnerModel from '@model/spinner/SpinnerModel'
import showToast from '@components/global/toast/Toast'

const useProductsModel = (): IProductsModel => {
  const axios = useContext(AxiosContext)
  const { setSpinner } = useSpinnerModel()

  const initialState: IProductsStorage = {
    state: false,
    products: [],
    errorCounter: 0
  }

  const { storage, updateStorage } = useStorage<IProductsStorage>('products', initialState)

  const readProducts = useCallback(
    async () => {
      setSpinner(true)

      let products: Array<IProduct> = []

      await axios.get<IAxiosResponse<Array<IProduct>>>(`https://api.mercadolibre.com/sites/MLM/search?q=ipod nano&limit=10`)
        .then(({ data: { results } }) => {
          products = results
        })
        .catch((error) => {
          showToast('error', error)
          updateStorage({ ...storage, errorCounter: ++storage.errorCounter })
        })
        .finally(() => {
          updateStorage({ ...storage, products, state: true })
          setTimeout(() => setSpinner(false), 1000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  const getProductsByCategory = useCallback(
    async (categoryId: string) => {
      setSpinner(true)

      let products: Array<IProduct> = []
      await axios.get(`https://api.mercadolibre.com/sites/MLA/search?category=${categoryId}`)
        .then(({ data: { results } }) => {
          products = results
        })
        .catch((error) => {
          console.log('error', error)
          updateStorage({ ...storage, errorCounter: ++storage.errorCounter })
        })
        .finally(() => {
          updateStorage({ ...storage, products })
          setTimeout(() => setSpinner(false), 1000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  useEffect(() => {
    if (!storage.state && storage.errorCounter < ERROR_COUNTER) readProducts()
  }, [readProducts, storage.errorCounter, storage.state])

  return {
    productStorage: storage,
    readProducts,
    getProductsByCategory
  }
}

export default useProductsModel
