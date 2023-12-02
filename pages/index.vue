<template>
  <div>
    <div class="flex justify-end p-4">
      <UButton
        color="red"
        @click="logout"
      >
        Logout
      </UButton>
    </div>
    <div>
      <UTable v-model="selected" :rows="tasks" :columns="columns">
        <template #name-data="{ row }">
          <span :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable> 
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const tasks = ref([])

const {data} = await useAsyncData('tasks', async () => client.from('tasks').select('*').order('id'))
console.log('data', data.value?.data)
tasks.value = data.value?.data || []

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}

// table
const columns = [{
  key: 'title',
  label: 'Title'
}, {
  key: 'user',
  label: 'user'
}, {
  key: 'completed',
  label: 'completed'
}, {
  key: 'actions'
}]

const items = (row) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

const selected = ref([tasks.value[1]])
</script>