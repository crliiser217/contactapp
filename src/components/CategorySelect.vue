<template>
    <OnClickOutside @trigger="dropdownOpen = false">
            <div @click="dropdownOpen = !dropdownOpen"
                :class="dropdownOpen ? 'toggler-active' : ''">
                <div v-if="currentCategory">{{ currentCategory }}</div>
                <div class="not-select" v-else>Не выбрано</div>
            </div>
            <div class="dropdown-content" v-if="dropdownOpen">
                <div @click="currentCategory = category" v-for="category in categories"
                    class="dropdown-row">
                    <div>{{ category }}</div>
                    <img v-if="category === currentCategory" src="/dropdown_check.svg" alt="">
                </div>
            </div>
    </OnClickOutside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { OnClickOutside } from '@vueuse/components'

const categories = ["Родственники", "Коллеги"]
const dropdownOpen = ref(false)
const currentCategory = ref('')

const emit = defineEmits<{ (e: 'onUpdate:modelValue', category: string): void }>()

watch(currentCategory, () => emit('onUpdate:modelValue', currentCategory.value))

function resetCategory() {
    currentCategory.value = ''
}

defineExpose({
    resetCategory
})

</script>

<style scoped lang="scss">

</style>