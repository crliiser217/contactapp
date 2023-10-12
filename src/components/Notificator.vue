<template>
    <div>
        <img src="/check_mark.svg" alt="" style="margin-right: 6px;">

        <slot></slot>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
div {
    position: fixed;
    bottom: 48px;
    left: 32px;
    display: flex;
    align-items: center;
    padding: 18px 10px;
    background-color: white;

    @media (max-width: 767px) {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: auto;
        top: 64px;
        padding: 12px 16px;
        background-color: #545454;
        color: white;
        border: 0;
        border-radius: 40px;
    }
}
</style>