<template>
    <div v-if="popupOpen" class="modal-window">
        <div class="popup-header">
            <div class="small-contact-image">{{ values.name[0] }}</div>
            <span class="header-tytle">{{ values.name }}</span>
            <img @click="close" src="/x_mark.svg" alt="" class="x-mark">
        </div>

        <form class="form-contact" @submit="onSubmit">
            <h3>Контакт</h3>
            <div class="grid-2-cols">
                <div class="text-bold">Имя</div>
                <div>
                    <input :class="errors.name ? 'input-error' : 'input-style'" name="name" v-bind="name"
                        placeholder="Введите имя" />
                    <span>{{ errors.name }}</span>
                </div>
                <div class="text-bold">Телефон</div>
                <div>
                    <input type="tel" v-mask="'+7(###)###-##-##'" :class="errors.phone ? 'input-error' : 'input-style'"
                        name="phone" v-bind="phone" placeholder="+7(___)___-__-__">
                    <span>{{ errors.phone }}</span>
                </div>
                <div class="text-bold">E-mail</div>
                <div>
                    <input :class="errors.email ? 'input-error' : 'input-style'" name="email" v-bind="email"
                        placeholder="Введите e-mail">
                    <span>{{ errors.email }}</span>
                </div>
                <div class="text-bold">Категория</div>
                <CategoryEdit :category="values.category" v-bind="category"
                    @on-update:model-value="(el) => setFieldValue('category', el)" class="long-dropdown" />
                <div class="text-bold">Создан</div>
                <div class="date-padding">{{ values.date.toLocaleDateString("ru") }}</div>
            </div>
            <div class="flex-box">
                <SaveButton />
                <button :disabled="showNotificator" class="delete-button" @click="handleDelete">
                    <img src="/bin.svg" alt="">
                    <div>Удалить контакт</div>
                </button>
            </div>
        </form>
    </div>
    <Notificator v-if="showNotificator">{{ messageForNotificator }}</Notificator>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContactStore } from '../stores/contactStore';
import { ContactInterface } from '../types/ContactInterface';
import SaveButton from './SaveButton.vue';
import Notificator from './Notificator.vue';
import CategoryEdit from './CategoryEdit.vue';
import { useForm } from "vee-validate";
import { formValidSchema } from "../types/formSchema";

const popupOpen = ref(false)
const contactStore = useContactStore()

const { errors,
    handleSubmit,
    defineInputBinds,
    values,
    setValues,
    setFieldValue, } = useForm({
        validationSchema: formValidSchema,
    });

const email = defineInputBinds('email')
const name = defineInputBinds('name')
const phone = defineInputBinds('phone')
const category = defineInputBinds('category')

const messageForNotificator = ref('')
const showNotificator = ref(false)

const open = (id: number) => {
    setValues(contactStore.getContactById(id)!)
    popupOpen.value = true
};
const close = () => {
    popupOpen.value = false
}

const onSubmit = handleSubmit((values) => {
    contactStore.loader = true
    try {
        setTimeout(() => {
            contactStore.updateContact(values as ContactInterface)
            contactStore.loader = false
            messageForNotificator.value = 'Контакт успешно изменен'
            showNotificator.value = true
            setTimeout(() => {
                showNotificator.value = false
            }, 3000)
        }, 3000)
    } catch {
        console.log('error')
    }
})

function handleDelete() {
    if (!contactStore.loader) {
        contactStore.deleteContact(values.id)
        messageForNotificator.value = 'Контакт удален'
        showNotificator.value = true
        close()
        setTimeout(() => {
            showNotificator.value = false
        }, 3000)
    }
}

defineExpose({
    open
})
</script>

<style scoped lang="scss">
.flex-box {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 24px;
    margin-top: 32px;
}

.delete-button {
    border: none;
    background-color: inherit;
    display: flex;
    align-items: center;
    row-gap: 2px;
    cursor: pointer;
    div {
        color: #2F80ED;
    }
}

.date-padding {
    padding-left: 8px;
}
</style>