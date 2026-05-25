
import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from 'vuetify/labs/VDateInput'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtapp) => {
  const vuetify = createVuetify({
    components: {
      VDateInput,
    },
  })
  nuxtapp.vueApp.use(vuetify)
})
