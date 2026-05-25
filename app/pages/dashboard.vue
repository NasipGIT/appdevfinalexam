<template>
  <div>
    <v-card color="primary" theme="dark" flat class="rounded-xl pa-6 mb-6">
      <v-row align="center">
        <v-col cols="12" md="8">
          <h1 class="text-h4 font-weight-bold mb-2">
            {{ systemGreeting }}, Admin!
          </h1>
          <p class="text-subtitle-1 opacity-80">
            System Infrastructure Overview: Core modules initialized. Database synchronization complete with zero reported exceptions.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right">
          <v-chip color="white" variant="outlined" prepend-icon="mdi-server">
            API Status: Online
          </v-chip>
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" sm="4">
        <v-card border flat class="rounded-xl pa-4">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-primary font-weight-bold">Total Users</div>
              <div class="text-h3 font-weight-black">{{ users.length }}</div>
            </div>
            <v-avatar color="blue-lighten-5" size="70">
              <v-icon color="primary" size="40">mdi-account-group</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card border flat class="rounded-xl pa-4">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-success font-weight-bold">Active Accounts</div>
              <div class="text-h3 font-weight-black text-success">{{ activeCount }}</div>
            </div>
            <v-avatar color="green-lighten-5" size="70">
              <v-icon color="success" size="40">mdi-account-check</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card border flat class="rounded-xl pa-4">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-overline text-error font-weight-bold">Inactive Accounts</div>
              <div class="text-h3 font-weight-black text-error">{{ inactiveCount }}</div>
            </div>
            <v-avatar color="red-lighten-5" size="70">
              <v-icon color="error" size="40">mdi-account-alert</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-card border flat class="rounded-xl overflow-hidden">
          <v-card-item class="bg-grey-lighten-4">
            <div class="d-flex justify-space-between align-center">
              <v-card-title class="text-h6 font-weight-bold">Recent Registrations</v-card-title>
              
              <div>
                <v-btn 
                  icon="mdi-refresh" 
                  size="small" 
                  variant="text" 
                  color="grey-darken-1" 
                  class="mr-2"
                  :loading="isRefreshing"
                  @click="refreshDashboardData"
                ></v-btn>
                <v-btn size="small" variant="text" color="primary" to="/users">View All</v-btn>
              </div>
            </div>
          </v-card-item>
          <v-divider></v-divider>
          
          <v-table density="comfortable">
            <thead>
              <tr>
                <th class="font-weight-bold">Name</th>
                <th class="font-weight-bold">Email</th>
                <th class="font-weight-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users.slice(0, 5)" :key="user.id">
                <td v-html="user.name"></td>
                <td>{{ user.email }}</td>
                <td>
                  <v-chip :color="user.isActive ? 'success' : 'error'" size="x-small" variant="flat">
                    {{ user.isActive ? 'Active' : 'Inactive' }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card border flat class="rounded-xl overflow-hidden h-100">
          <v-card-item class="bg-grey-lighten-4">
            <v-card-title class="text-h6 font-weight-bold">Quick Shortcuts</v-card-title>
          </v-card-item>
          <v-divider></v-divider>
          <v-card-text class="pa-4">
            <div class="d-flex flex-column ga-3">
              <v-btn 
                color="primary" 
                variant="flat" 
                block 
                prepend-icon="mdi-account-cog" 
                to="/users"
                class="rounded-lg py-6 custom-shortcut-btn"
              >
                View User Controls
              </v-btn>
              
              <v-btn 
                color="primary" 
                variant="outlined" 
                block 
                prepend-icon="mdi-calculator" 
                to="/calculate"
                class="rounded-lg py-6 custom-shortcut-btn"
              >
                View Calculator
              </v-btn>

              <v-btn 
                color="primary" 
                variant="outlined" 
                block 
                prepend-icon="mdi-file-check-outline" 
                to="/test"
                class="rounded-lg py-6 custom-shortcut-btn"
              >
                View Prelim Exam
              </v-btn>

              <v-btn 
                color="primary" 
                variant="outlined" 
                block 
                prepend-icon="mdi-file-document-edit-outline" 
                to="/midterm_exam"
                class="rounded-lg py-6 custom-shortcut-btn"
              >
                View Midterm Exam
              </v-btn>

              <v-btn 
                color="primary" 
                variant="outlined" 
                block 
                prepend-icon="mdi-home-floor-b" 
                to="/prelim"
                class="rounded-lg py-6 custom-shortcut-btn"
              >
                View Prelim Project
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const users = ref([]);
const isRefreshing = ref(false); 

const systemGreeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
});

const activeCount = computed(() => {
  return users.value.filter(u => u.isActive === true).length;
});

const inactiveCount = computed(() => {
  return users.value.filter(u => u.isActive === false).length;
});

const getDashboardData = async () => {
  try {
    const data = await $fetch("https://playground.mockoon.com/users");
    users.value = data;
  } catch (err) {
    console.error("Dashboard data fetch failed:", err);
  }
};

const refreshDashboardData = async () => {
  isRefreshing.value = true;
  await getDashboardData();
  
  setTimeout(() => {
    isRefreshing.value = false;
  }, 500);
};

onMounted(() => {
  getDashboardData();
});
</script>

<style scoped>
.ga-3 {
  gap: 12px;
}
.opacity-80 {
  opacity: 0.8;
}
.custom-shortcut-btn {
  transition: transform 0.10s ease, box-shadow 0.10s ease !important;
}
.custom-shortcut-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.15) !important;
}
</style>