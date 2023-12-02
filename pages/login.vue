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
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <div>
      <h2>
        Sign in to your account
      </h2>
      <UButton
        class="mt-4"
        color="blue"
        @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })"
      >
        Sign in with Github
      </UButton>
    </div>
  </div>
</template>
