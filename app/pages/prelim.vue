<template>
  <div>
    <div class="mb-5 d-flex justify-space-between align-end">
      <h1>Analytics & Operations</h1>
      <v-btn 
        color="grey-darken-20" 
        variant="outlined" 
        prepend-icon="mdi-arrow-left" 
        to="/dashboard"
      >
        Back to Dashboard
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="3">
        <v-card height="100" color="white">
          <v-card-text>
            <v-row>
              <v-col>
                <div class="text-center">
                  <v-progress-circular :model-value="value" :rotate="360" :size="60" :width="10" color="blue">
                    <template v-slot:default> {{ value }} % </template>
                  </v-progress-circular>
                </div>
              </v-col>
              <v-col>
                <v-row no-gutters>
                  <v-col cols="12" class="text-right text-h6 text-uppercase">student</v-col>
                  <v-col cols="12" class="text-right text-h3 font-weight-bold">10</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card height="100" color="white"> 
          <v-card-text>
            <v-row>
              <v-col>
                <div class="text-center">
                  <v-progress-circular :model-value="value" :rotate="360" :size="60" :width="10" color="red">
                    <template v-slot:default> {{ value }} % </template>
                  </v-progress-circular>
                </div>
              </v-col>
              <v-col>
                <v-row no-gutters>
                  <v-col cols="12" class="text-right text-h6 text-uppercase">student</v-col>
                  <v-col cols="12" class="text-right text-h3 font-weight-bold">10</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="3">
        <v-card height="100" color="white">
          <v-card-text>
            <v-row>
              <v-col>
                <div class="text-center">
                  <v-progress-circular :model-value="value" :rotate="360" :size="60" :width="10" color="yellow">
                    <template v-slot:default> {{ value }} % </template>
                  </v-progress-circular>
                </div>
              </v-col>
              <v-col>
                <v-row no-gutters>
                  <v-col cols="12" class="text-right text-h6 text-uppercase">student</v-col>
                  <v-col cols="12" class="text-right text-h3 font-weight-bold">10</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card height="100" color="white">
          <v-card-text>
            <v-row>
              <v-col>
                <div class="text-center">
                  <v-progress-circular :model-value="value" :rotate="360" :size="60" :width="10" color="green">
                    <template v-slot:default> {{ value }} % </template>
                  </v-progress-circular>
                </div>
              </v-col>
              <v-col>
                <v-row no-gutters>
                  <v-col cols="12" class="text-right text-h6 text-uppercase">student</v-col>
                  <v-col cols="12" class="text-right text-h3 font-weight-bold">10</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card height="250" color="white"></v-card>
      </v-col>

      <v-col>
        <v-row>
          <v-col cols="12" md="12">
            <v-card height="67" color="white"></v-card>
          </v-col>
          <v-col cols="12" md="12">
            <v-card height="67" color="white"></v-card>
          </v-col>
          <v-col cols="12" md="12">
            <v-card height="67" color="white"></v-card>
          </v-col>
        </v-row>
      </v-col> 
    </v-row>

    <v-fab 
      :absolute="false"
      :app="true"
      color="primary"
      location="right bottom"
      size="large"
      icon
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-fab>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Create New Item</v-toolbar-title>
        </v-toolbar>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-btn color="primary" variants="flat" block>Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const value = ref(0)

let interval = -1
onMounted(() => {
  interval = setInterval(() => {
    if (value.value === 100) {
      return (value.value = 0)
    }
    value.value += 10
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style>
</style>