<template>
    <div v-if="popupOpen" class="modal-window">
        <div class="popup-header">
            <img style="margin-right: 4px;" src="/add_contact.svg" alt="">
            <span class="header-tytle">Добавить контакт</span>
            <img @click="close" src="/x_mark.svg" alt="" class="x-mark">
        </div>
        <div class="form-container">
            <form class="form-contact" @submit="onSubmit">
                <h3>Новый контакт</h3>
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
                    <div>
                        <CategorySelect v-bind="category" @on-update:model-value="(el) => setFieldValue('category', el)"
                            :class="errors.category ? 'dropdown-error' : 'long-dropdown'" ref="categorySelect" />
                        <span>{{ errors.category }}</span>
                    </div>
                </div>
                <div class="flex-box">
                    <SaveButton />
                </div>
            </form>
        </div>
        <Notificator v-if="showNotificator">Контакт успешно создан</Notificator>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContactStore } from '../stores/contactStore';
import { ContactInterface } from '../types/ContactInterface';
import SaveButton from './SaveButton.vue';
import Notificator from './Notificator.vue';
import CategorySelect from './CategorySelect.vue';
import { useForm } from "vee-validate";
import { formValidSchema } from "../types/formSchema";

const popupOpen = ref(false)
const contactStore = useContactStore()
const { errors,
    handleSubmit,
    defineInputBinds,
    resetForm,
    setFieldValue } = useForm({
        validationSchema: formValidSchema

    });

const email = defineInputBinds('email')
const name = defineInputBinds('name')
const phone = defineInputBinds('phone')
const category = defineInputBinds('category')

const categorySelect = ref<InstanceType<typeof CategorySelect> | null>(null)


const showNotificator = ref(false)

const open = () => {
    popupOpen.value = true
};
const close = () => {
    popupOpen.value = false
    resetForm()
    categorySelect.value?.resetCategory()
};

const onSubmit = handleSubmit((values) => {
    contactStore.loader = true
    setTimeout(() => {
        values.id = 0
        values.date = new Date()
        contactStore.createContact(values as ContactInterface)
        contactStore.loader = false
        showNotificator.value = true
        resetForm()
        categorySelect.value?.resetCategory()
        setTimeout(() => {
            showNotificator.value = false
        }, 3000)
    }, 3000)
}
)


defineExpose({
    open
})
</script>

<style scoped lang="scss">
.flex-box {
    margin-top: 32px;
    display: flex;
    justify-content: center;
}
</style>