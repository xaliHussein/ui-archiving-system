<template>
  <v-dialog :value="loading" fullscreen full-width>
    <v-container fluid fill-height>
      <v-row>
        <v-col cols="6">
          <v-card>
            <div class="vld-parent">
              <loading
                color="#012059"
                loader="dots"
                :width="100"
                :height="100"
                :active.sync="isLoading"
                :is-full-page="fullPage"></loading>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>
<script>
  import Loading from "vue-loading-overlay";
  // Import stylesheet
  import "vue-loading-overlay/dist/vue-loading.css";
  export default {
    components: {
      Loading,
    },
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isLoading: true,
        fullPage: true,
      };
    },
  };
</script>
