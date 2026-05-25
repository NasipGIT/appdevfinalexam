<template>
  <div>
    <div class="mb-5 d-flex justify-space-between align-end mx-auto" style="max-width: 650px; margin-top: 20px;">
      <h1>CALCULATOR PAGE</h1>
      <v-btn 
        color="grey-darken-20" 
        variant="outlined" 
        prepend-icon="mdi-arrow-left" 
        to="/dashboard"
      >
        Back to Dashboard
      </v-btn>
    </div>

    <div class="d-flex justify-center align-center" style="min-height: 75vh;">
      <v-card width="650" class="text-center" elevation="12"> 
        <v-card-text>
          <v-form>
            <v-radio-group v-model="operation" inline class="d-flex justify-center">
              <v-radio label="Addtion" value="add"></v-radio>
              <v-radio label="Subtraction" value="sub"></v-radio>
              <v-radio label="Multiplication" value="multi"></v-radio>
              <v-radio label="Division" value="divide"></v-radio>  
            </v-radio-group>

            <v-text-field label="Enter First Number" v-model="firstNumber"></v-text-field>
            <v-text-field label="Enter Second Number" v-model="secondNumber"></v-text-field>
                                
            <v-text-field v-model="total" label="Total"></v-text-field> 
            <v-btn :loading="loading" color="primary" @click="calculate" block>calculate</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const firstNumber = ref(0);
const secondNumber = ref(0);
const total = ref(0);
const operation = ref('add');

function calculate() {
  const num1 = Number(firstNumber.value);
  const num2 = Number(secondNumber.value);

  switch (operation.value) {
    case 'add':
      total.value = num1 + num2;
      break;
    case 'sub':
      total.value = num1 - num2;
      break;
    case 'multi':
      total.value = num1 * num2;
      break;
    case 'divide':
      total.value = num2 !== 0 ? num1 / num2 : 'Error (Div by 0)';
      break;
    default:
      total.value = 0;
  }
}
</script>