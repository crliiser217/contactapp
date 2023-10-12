<template>
    <OnClickOutside @trigger="dropdownOpen = false">
        <div class="dropdown">
            <div class="dropdown-toggler" @click="dropdownOpen = !dropdownOpen" :class="dropdownOpen ? 'toggler-active' : ''">
                {{ contactStore.currentCategory.toUpperCase() }}
            </div>
            <div class="dropdown-content" v-if="dropdownOpen">
                <div @click="contactStore.currentCategory = category" 
                    v-for="category in categories"
                    :class="category === contactStore.currentCategory ? 'dropdown-row text-bold' : 'dropdown-row'">
                    <div>{{ category.toUpperCase() }}</div>
                    <img v-if="category === contactStore.currentCategory" src="/dropdown_check.svg" alt="">
                </div>
            </div>
        </div>
    </OnClickOutside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContactStore } from '../stores/contactStore';
import { OnClickOutside } from '@vueuse/components'

const contactStore = useContactStore();
const categories = ["Все", "Родственники", "Коллеги"]
const dropdownOpen = ref(false)
</script>

<style scoped lang="scss"></style>