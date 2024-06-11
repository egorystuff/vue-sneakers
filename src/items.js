import axios from 'axios'
import debounce from 'lodash.debounce'
import { reactive, ref } from 'vue'

export const items = ref([])
export const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
// -----------------------------------------------------------------------------------------------

export const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

export const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 400)

// -----------------------------------------------------------------------------------------------
// функция для получения данных с закладочкой
export const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://bd1bfdbaf3f110ab.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) return item

      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (error) {
    console.error(error)
  }
}

// функция для получения данных
export const fetchItems = async () => {
  try {
    const params = { sortBy: filters.sortBy }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://bd1bfdbaf3f110ab.mokky.dev/items`, { params })
    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.error(error)
  }
}
