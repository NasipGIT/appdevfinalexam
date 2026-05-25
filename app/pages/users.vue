<template>
  <div>
    <div class="mb-5 d-flex justify-space-between align-end">
      <div>
        <h1 class="text-h4 font-weight-bold">User Management App</h1>
        <div class="text-subtitle-2 text-grey">Manage and view all registered user accounts</div>
      </div>
      
      <div class="d-flex align-center">
        <v-btn 
          color="grey-darken-3" 
          variant="outlined" 
          prepend-icon="mdi-arrow-left" 
          to="/dashboard"
          class="mr-3"
        >
          Back to Dashboard
        </v-btn>
        
        <div class="text-h6 font-weight-medium text-primary bg-blue-lighten-5 px-3 py-1 rounded-lg">
          Total Users: {{ users.length }}
        </div>
      </div>
    </div>

    <v-card variant="outlined" class="rounded-lg">
      <v-toolbar color="transparent" flat class="px-2">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search user..."
          variant="outlined"
          density="compact"
          hide-details
          style="max-width: 300px;"
          class="ml-2"
        ></v-text-field>
        
        <v-spacer></v-spacer>
        
        <v-btn
          icon="mdi-refresh"
          variant="text"
          color="grey-darken-1"
          class="mr-2"
          :loading="loading"
          @click="getUsers"
        ></v-btn>

        <v-btn color="primary" @click="openCreateDialog" variant="flat" class="mr-2">
          Create User
        </v-btn>
      </v-toolbar>
      
      <v-data-table 
        :items="users" 
        :headers="headers" 
        :search="search"
        :loading="loading"
        loading-text="Loading users data... Please wait"
      >
        <template v-slot:item.address="{ item }">
          {{ item.address?.street || item.address }}, {{ item.address?.city || '' }}
        </template>

        <template v-slot:item.isActive="{ item }">
          <v-chip :color="item.isActive ? 'success' : 'error'" size="small" variant="flat">
            {{ item.isActive ? 'Active' : 'Inactive' }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn size="small" variant="text" color="info" icon="mdi-pencil" class="mr-2" @click="openEditDialog(item)"></v-btn>
          <v-btn size="small" variant="text" color="error" icon="mdi-delete" @click="deleteUser(item.id)"></v-btn>
        </template>

        <template v-slot:no-data>
          <div class="text-center pa-6">
            <v-icon size="48" color="grey-lighten-1" class="mb-2">mdi-account-search-outline</v-icon>
            <div class="text-grey-darken-1 font-weight-medium">No records found</div>
            <div class="text-caption text-grey">Try adjusting your search terms or refresh the dynamic pool list.</div>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="500">
      <v-card class="rounded-lg">
        <v-toolbar color="primary">
          <v-toolbar-title>Create User</v-toolbar-title>
        </v-toolbar>

        <v-form class="ma-5">
          <v-text-field label="Name" v-model="name" variant="outlined" density="comfortable"></v-text-field>
          <v-text-field label="Email" v-model="email" type="email" variant="outlined" density="comfortable"></v-text-field>
          <v-text-field label="Phone" v-model="phone" variant="outlined" density="comfortable"></v-text-field>
          <v-text-field label="Address" v-model="address" variant="outlined" density="comfortable"></v-text-field>
          
          <v-date-input
            prepend-icon=""
            prepend-inner-icon="mdi-calendar"
            v-model="birthdate"
            label="Birthdate"
            variant="outlined"
            density="comfortable"
          ></v-date-input>

          <v-checkbox label="Is Active?" v-model="isActive" color="primary"></v-checkbox>
        </v-form>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn variant="outlined" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="createUser">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateDialog" width="500">
      <v-card class="rounded-lg">
        <v-toolbar color="info">
          <v-toolbar-title>Update User</v-toolbar-title>
        </v-toolbar>

        <v-form class="ma-5">
          <v-text-field label="Name" v-model="name" variant="outlined" density="comfortable"></v-text-field>
          <v-text-field label="Email" v-model="email" type="email" variant="outlined" density="comfortable"></v-text-field>
          <v-text-field label="Phone" v-model="phone" variant="outlined" density="comfortable"></v-text-field>
          <v-text-field label="Address" v-model="address" variant="outlined" density="comfortable"></v-text-field>
          
          <v-date-input
            prepend-icon=""
            prepend-inner-icon="mdi-calendar"
            v-model="birthdate"
            label="Birthdate"
            variant="outlined"
            density="comfortable"
          ></v-date-input>

          <v-checkbox label="Is Active?" v-model="isActive" color="info"></v-checkbox>
        </v-form>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn variant="outlined" @click="updateDialog = false">Cancel</v-btn>
          <v-btn color="info" variant="flat" @click="updateUser">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const headers = [
  { title: "ID", key: "id" },
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Phone", key: "phone" },
  { title: "Address", key: "address" },
  { title: "Birthdate", key: "birthdate" },
  { title: "Status", key: "isActive" },
  { title: "Actions", key: "actions", sortable: false },
];

const users = ref([]);
const search = ref("");
const loading = ref(false); 
const dialog = ref(false);
const updateDialog = ref(false);

const id = ref("");
const name = ref("");
const email = ref("");
const phone = ref("");
const address = ref("");
const birthdate = ref(null);
const isActive = ref(true);

const resetForm = () => {
  id.value = "";
  name.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
  birthdate.value = null;
  isActive.value = true;
};

const openCreateDialog = () => {
  resetForm();
  dialog.value = true;
};


const getUsers = async () => {
  loading.value = true; 
  try {
    const data = await $fetch("https://playground.mockoon.com/users");
    users.value = data;
    console.log("Users fetched:", data);
  } catch (err) {
    console.error("Failed to fetch users", err);
  } finally {
    loading.value = false; 
  }
};

const createUser = async () => {
  try {
    await $fetch("https://playground.mockoon.com/users", {
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        birthdate: birthdate.value,
        isActive: isActive.value,
      },
    });
    
    alert("Successfully created user!");
    dialog.value = false;
    resetForm();
    getUsers();
  } catch (err) {
    console.error("Failed to create user", err);
  }
};

const openEditDialog = (item) => {
  id.value = item.id;
  name.value = item.name;
  email.value = item.email;
  phone.value = item.phone;
  address.value = typeof item.address === 'object' ? item.address.street : item.address;
  birthdate.value = item.birthdate ? new Date(item.birthdate) : null;
  isActive.value = item.isActive;
  updateDialog.value = true;
};

const updateUser = async () => {
  try {
    await $fetch(`https://playground.mockoon.com/users/${id.value}`, {
      method: "PUT",
      body: {
        id: id.value,
        name: name.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        birthdate: birthdate.value,
        isActive: isActive.value,
      },
    });

    alert("Successfully updated user!");
    updateDialog.value = false;
    resetForm();
    getUsers();
  } catch (err) {
    console.error("Failed to update user", err);
  }
};

const deleteUser = async (userId) => {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await $fetch(`https://playground.mockoon.com/users/${userId}`, {
        method: "DELETE",
      });
      alert("Successfully deleted user!");
      getUsers();
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  }
};

onMounted(() => {
  getUsers();
});
</script>

<style>
</style>