<template>
    <div class="grid-container hover-contact">
        <div class="flex-container">
            <div v-if="!mobileStore.isMobile576" class="contact-image">{{ props.contact.name[0] }}</div>
            <span class="larger-text">{{ props.contact.name }}</span>
        </div>
        <div v-if="!mobileStore.isMobile768">{{ props.contact.phone }}</div>
        <div v-if="!mobileStore.isMobile768">{{ props.contact.email }}</div>
        <div v-else>
            <div>{{ props.contact.phone }}</div>
            <div>{{ props.contact.email }}</div>
        </div>
        <div class="date-col larger-text">{{ props.contact.date.toLocaleDateString("ru") }}</div>
    </div>
</template>

<script setup lang="ts">
import { ContactInterface } from '../types/ContactInterface';
import { useMobileStore } from '../stores/mobileStore';

const mobileStore = useMobileStore()

const props = defineProps<{ contact: ContactInterface }>()
</script>

<style scoped lang="scss">
.hover-contact {
    transition-property: border-color;
    transition-duration: 300ms;
    cursor: pointer;
    
    &:hover{
        background-color: #EAF2FD;
    }
}
</style>