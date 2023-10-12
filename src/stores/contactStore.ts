import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { ContactInterface } from '../types/ContactInterface'

export const useContactStore = defineStore('contactStore', () => {
    const contacts = ref<ContactInterface[]>([])
    const filteredContacts = ref<ContactInterface[]>([])

    const currentCategory = ref('Все')
    const loader = ref(false)

    const id = IdGenerator()

    function getFilteredContacts() {
        if (currentCategory.value !== 'Все') {
            filteredContacts.value = contacts.value.filter( el => el.category === currentCategory.value )
            filteredContacts.value.sort((a, b) => b.date.getTime() - a.date.getTime())
        } else {
            filteredContacts.value = contacts.value
            filteredContacts.value.sort((a, b) => b.date.getTime() - a.date.getTime())
        }
    }

    function createContact(contact: ContactInterface) {
        contact.id = id.next().value!
        contacts.value.push(contact)
        getFilteredContacts()
    }

    function getContactById(id: number) {
        return contacts.value.find(elem => elem.id === id)
    }

    function updateContact(contact: ContactInterface) {
        let index = contacts.value.findIndex(elem => elem.id === contact.id)
        contacts.value[index] = contact
        getFilteredContacts()
    }

    function deleteContact(id: number) {
        let index = contacts.value.findIndex(elem => elem.id === id)
        contacts.value.splice(index, 1)
        getFilteredContacts()
    }

    function* IdGenerator() {
        let id = 0
        while(true) {
            yield ++id
        }
    }

    watch(currentCategory, () => getFilteredContacts())

    return {
        filteredContacts,
        currentCategory,
        loader,
        getFilteredContacts,
        getContactById,
        createContact,
        updateContact,
        deleteContact,
    }
})