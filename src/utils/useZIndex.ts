import {ref,computed} from "vue"

const index = ref(0)
const useZIndex = (initialZIndex=100) => {
    const initialZIndexValue = ref(initialZIndex)
    const currentZIndex = computed(() => index.value + initialZIndexValue.value)
    const nextZIndex = () => {
        index.value++
        return currentZIndex.value
    }

    return {
        currentZIndex,
        nextZIndex,
        initialZIndexValue
    }
}

export default useZIndex
