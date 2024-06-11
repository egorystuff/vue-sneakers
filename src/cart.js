import axios from 'axios'
import { computed, ref } from 'vue'

export const drawerOpen = ref(false)
export const cartBasket = ref([])
export const totalPrice = computed(() =>
  cartBasket.value.reduce((acc, item) => acc + item.price, 0)
)

// -----------------------------------------------------------------------------------------------

export const closeDrawer = () => {
  drawerOpen.value = false
}

export const openDrawer = () => {
  drawerOpen.value = true
}

export const addToCartBasket = (item) => {
  cartBasket.value.push(item)
  item.isAdded = true
}

export const removeFromCartBasket = (item) => {
  cartBasket.value.splice(cartBasket.value.indexOf(item), 1)
  item.isAdded = false
}

export const onClickAddCartBasket = (item) => {
  if (!item.isAdded) {
    addToCartBasket(item)
  } else {
    removeFromCartBasket(item)
  }
}

export const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const obj = { item_id: item.id }
      const { data } = await axios.post(`https://bd1bfdbaf3f110ab.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://bd1bfdbaf3f110ab.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.error(error)
  }
}
