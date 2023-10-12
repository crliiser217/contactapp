<template>
    <OnClickOutside @trigger="dropdownOpen = false">
        <div @click="dropdownOpen = !dropdownOpen" :class="dropdownOpen ? 'toggler-active' : ''">
            <div>{{ currentCategory }}</div>
        </div>
        <div class="dropdown-content" v-if="dropdownOpen">
            <div @click="currentCategory = category" v-for="category in categories" class="dropdown-row">
                <div>{{ category }}</div>
                <img v-if="category === currentCategory" src="/dropdown_check.svg" alt="">
            </div>
        </div>
    </OnClickOutside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { OnClickOutside } from '@vueuse/components'

const props = defineProps<{ category: string}>()
const categories = ["Родственники", "Коллеги"]
const dropdownOpen = ref(false)
const currentCategory = ref(props.category)

const emit = defineEmits<{ (e: 'onUpdate:modelValue', category: string): void }>()

watch(currentCategory, () => emit('onUpdate:modelValue', currentCategory.value))

</script>

<style scoped lang="scss">
.not-select {
    color: #A9A9A9;
}
</style>