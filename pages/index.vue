<template>
  <div>
    <div>
      <button @click="logout">logout</button>
    </div>
    hah
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()

const {data} = await useAsyncData('tasks', async () => client.from('tasks').select('*').order('id'))
console.log('data', data.value)

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}
</script>