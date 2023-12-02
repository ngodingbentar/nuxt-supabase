<template>
  <div>
    <UTable :rows="rows" :columns="columns">
      <template #name-data="{ row }">
        <span class="hah text-primary-500 dark:text-primary-400">{{ row.name }} hah</span>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="tasks.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '~~/types'

const props = defineProps({
  tasks: {
    type: Array as PropType<ITask[]>,
  }
})

const emit = defineEmits(['complete-task', 'remove-task'])

// table
const columns = [{
  key: 'title',
  label: 'Title',
  sortable: true
}, {
  key: 'completed',
  label: 'completed',
  sortable: true
}, {
  key: 'actions'
}]

const items = (row: ITask) => [
  [{
    label: row.completed ? 'Uncomplete' : 'Complete',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => emit('complete-task', row)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => emit('remove-task', row)
  }]
]

const page = ref(1)
const pageCount = 10

const rows = computed(() => {
  return props.tasks.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
</script>