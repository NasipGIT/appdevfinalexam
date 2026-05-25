<template>
<v-app>
    <v-navigation-drawer v-model="drawer"
        :rail="rail"
        permanent>
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            subtitle="Logged in"
            title="Jane Smith"
          ></v-list-item>
        </template>

        <v-divider></v-divider>

       <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard" value="dashboard"></v-list-item>
          
          <v-list-item prepend-icon="mdi-home-city" title="Prelim" to="/Prelim" value="prelim"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Test" to="/test" value="test"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Calculate" to="/calculate" value="calculate"></v-list-item>
          <v-list-item prepend-icon="mdi-calculator" title="midterm_exam" to="/midterm_exam" value="midterm_exam"></v-list-item>
          <v-list-item prepend-icon="mdi-note" title="Users Management" to="/users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :elevation="2">
  <template v-slot:prepend>
    <v-app-bar-nav-icon @click="drawer = !drawer">
   
    </v-app-bar-nav-icon>
  </template>

  <v-app-bar-title>Application Bar</v-app-bar-title>
</v-app-bar>
<v-main>
    <v-container fluid>
    <slot/>
</v-container>
</v-main>
</v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const drawer = ref(true)
  const rail = ref(true)
</script>

<style>

</style>