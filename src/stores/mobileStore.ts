import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

export const useMobileStore = defineStore('mobileStore', () => {
    const { width } = useWindowSize()
    const isMobile576 = computed(() => {
        return width.value < 576
    })
    const isMobile768 = computed(() => {
        return width.value < 768
    })
    return {
        isMobile576,
        isMobile768,
    }
})