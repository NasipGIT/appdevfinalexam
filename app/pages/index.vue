<template>
  <div class="d-flex justify-center align-center bg-grey-lighten-4" style="height: 100vh;"> 
    <v-card width="450" class="text-center rounded-xl pa-4" elevation="12">
      
      <div class="d-flex justify-center mt-6">
        <v-avatar color="primary-lighten-5" size="120" class="border-lg border-primary elevation-3">
          <v-img
            :src="avatarUrl"
            alt="Admin API Avatar"
            cover
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                <v-progress-circular color="primary" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-avatar>
      </div>
      
      <v-card-title class="text-h5 font-weight-bold mt-4">
        System Sign In
      </v-card-title>
      <v-card-subtitle class="mb-4">
        Connected to Live User API Backend
      </v-card-subtitle>

      <v-card-text class="py-6">
        <v-form @submit.prevent="login">
          <v-text-field  
            variant="outlined" 
            v-model="username" 
            label="Username" 
            prepend-inner-icon="mdi-account" 
            clearable
            class="mb-2"
          ></v-text-field>

          <v-text-field 
            variant="outlined" 
            v-model="password" 
            label="Password" 
            prepend-inner-icon="mdi-lock" 
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            clearable 
            class="mb-4"
          ></v-text-field>
          
          <v-btn 
            color="primary" 
            size="large"
            type="submit"
            block 
            class="rounded-lg py-4 font-weight-bold"
            elevation="2"
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'auth',
});


const defaultUsername = ref("Admin");
const defaultPassword = ref("Admin123");
const username = ref("");
const password = ref("");
const showPassword = ref(false);


const avatarUrl = ref("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=256");


const fetchAdminAvatar = async () => {
  try {
    
    const users = await $fetch("https://playground.mockoon.com/users");
    
    if (users && users.length > 0) {
      
      const firstUserName = encodeURIComponent(users[0].name);
      avatarUrl.value = `https://robohash.org/${firstUserName}.png?set=set4&bgset=bg1`;
    }
  } catch (err) {
    console.error("Failed to fetch avatar from API:", err);
    
  }
};


onMounted(() => {
  fetchAdminAvatar();
});


function login() {
  if (username.value === defaultUsername.value && password.value === defaultPassword.value) {
    navigateTo("/dashboard"); 
  } else {
    alert("Invalid username or password");
  }
}
</script>