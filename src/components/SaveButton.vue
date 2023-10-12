<template>
    <button type="submit" :class="contactStore.loader ? 'bg-loading' : ''" :disabled="contactStore.loader">
        <img v-if="!contactStore.loader" src="/save.svg" alt="Сохранить">
        <img v-if="contactStore.loader" src="/loader.svg" alt="Загрузка" class="spin">
        <div class="text-bold">СОХРАНИТЬ</div>
    </button>
</template>

<script setup lang="ts">
import { useContactStore } from '../stores/contactStore';

const contactStore = useContactStore()
</script>

<style scoped lang="scss">
button {
    background-color: #FFC700;
    border: 0px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 6px;
    padding: 14px 18px;
    transition-property: background-color;
    transition-duration: 300ms;
    cursor: pointer;

    &:hover {
        background-color: #FFD84C;
    }

    &:active {
        background-color: #F3C41E;
    }
}

.bg-loading {
    background-color: #F3C41E;
    &:hover {
        background-color: #F3C41E;
    }
}

.spin {
    animation: spin 1s linear infinite;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
}
</style>