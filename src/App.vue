<template>
  <MainHeader />
  <div class="bg">
    <div class="flex-container button-container">
      <Filter />
      <button @click="createContactPopup?.open" class="create-contact-btn">
        <span v-if="!mobileStore.isMobile576">+ Добавить контакт</span>
        <span v-else>+ ДОБАВИТЬ</span>
      </button>
    </div>
  </div>
  <div class="container">
    <div class="grid-container categories">
      <div>КОНТАКТ</div>
      <div v-if="!mobileStore.isMobile768">ТЕЛЕФОН</div>
      <div v-if="!mobileStore.isMobile768">E-MAIL</div>
      <div v-else>ТЕЛЕФОН / E-MAIL</div>
      <div class="date-col">СОЗДАН</div>
    </div>
    <Contact @click="editContactPopup?.open(contact.id)" v-for="contact in contactStore.filteredContacts" :contact="contact" :key="contact.id"/>
    <CreateContact ref="createContactPopup" />
    <EditContact  ref="editContactPopup" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Contact from './components/Contact.vue';
import MainHeader from './components/MainHeader.vue';
import Filter from './components/Filter.vue';
import CreateContact from './components/CreateContact.vue';
import EditContact from './components/EditContact.vue';
import { useContactStore } from './stores/contactStore';
import { useMobileStore } from './stores/mobileStore'

const contactStore = useContactStore()
const mobileStore = useMobileStore()

const createContactPopup = ref<InstanceType<typeof CreateContact> | null>(null)
const editContactPopup = ref<InstanceType<typeof EditContact> | null>(null)

</script>

<style scoped lang="scss">
.container {
  padding: 0 40px;
  @media (max-width: 767px) {
    padding: 0 12px;
  }
}
.create-contact-btn {
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #2F80ED;
  border-radius: 9999px;
  background-color: #F9FCFF;

  span {
    color: #2F80ED;
  }

  @media (max-width: 575px) {
    padding: 8px 16px;
  }
}

.button-container {
  justify-content: space-between;
  max-width: 990px;
  margin: 0 auto;
  padding: 8px 40px;

  button {
    font-weight: 700;
  }

  @media (max-width: 575px) {
    padding: 8px 10px;
  }
}

.bg {
  background-color: #F9FCFF;
  width: 100%;
}

.categories {
  font-size: 10px;
  color: #B5B5B5;
  border: none;
}
</style>
