<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})

</script>

<template>
  <div>
    <h2>
      Sign in to your account
    </h2>
    <button @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })">
      Sign in with Github
    </button>
  </div>
</template>
