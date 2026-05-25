<template>
  <div>
    <div class="mb-5 d-flex justify-space-between align-end">
      <h1>Prelim Exam</h1>
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
      <v-col cols="12">
        <v-card height="120" color="#BBB" elevation="0">
          <div class="text-center text-h6 text-uppercase">A</div>
          <div class="text-center text-h6 text-uppercase">10 points</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card height="120" color="#BBB" elevation="0">
              <div class="text-center text-h6 text-uppercase">B</div>
              <div class="text-center text-h6 text-uppercase">10 points</div>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card height="140" color="#BBB" elevation="0">
              <div class="text-center text-h6 text-uppercase">C</div>
              <div class="text-center text-h6 text-uppercase">15 points</div>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12" md="12">
                <v-card height="60" color="#BBB" elevation="0">
                  <div class="text-center text-h6 text-uppercase">D</div>
                  <div class="text-center text-h6 text-uppercase">15 points</div>
                </v-card>
              </v-col>

              <v-col cols="12" md="12">
                <v-card height="60" color="#BBB" elevation="0">
                  <div class="text-center text-h6 text-uppercase">E</div>
                  <div class="text-center text-h6 text-uppercase">10 points</div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="4">
        <v-card height="280" color="#BBB" elevation="0">
          <div class="text-center text-h6 text-uppercase">F</div>
          <div class="text-center text-h6 text-uppercase">10 points</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>