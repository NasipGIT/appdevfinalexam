<template>
  <div>
    <div class="mb-5 d-flex justify-space-between align-end" style="max-width: 500px;">
      <h1>Calculate Page</h1>
      <v-btn 
        color="grey-darken-20" 
        variant="outlined" 
        prepend-icon="mdi-arrow-left" 
        to="/dashboard"
      >
        Back to Dashboard
      </v-btn>
    </div>

    <v-card width="500">
      <v-card-text>
        <v-form>
          <v-text-field label="Enter First Number" v-model="firstNumber"></v-text-field>
          <v-text-field label="Enter Second Number" v-model="secondNumber"></v-text-field>
          <v-text-field v-model="total" label="total"></v-text-field> 
          <v-btn :loading="loading" color="primary" @click="calculate" block>calculate</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const firstNumber = ref(0);
const secondNumber = ref(0);
const total = ref(0);

function calculate() {
  total.value = Number(firstNumber.value) + Number(secondNumber.value);
}
</script>

<style>
</style>