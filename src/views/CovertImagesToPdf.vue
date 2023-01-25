<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="12" md="10" lg="10" class="mt-15">
        <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          :includeStyling="true"
          :useCustomSlot="true"
          @vdropzone-removed-file="remove_file"
          @vdropzone-complete="after_complete_upload">
          <div class="dropzone-custom-content">
            <h3 class="dropzone-custom-title">
              Drag and drop to upload images
            </h3>
            <div class="subtitle">
              <LottieAnimation
                path="../img/upload-files.json"
                :width="256"
                :height="256" />
            </div>
          </div>
        </vue-dropzone>
        <div class="text-center">
          <v-btn
            @click="upload"
            :loading="loadingButton"
            color="#000836"
            class="mt-5 px-15"
            elevation="4">
            <h4 style="color: #ffffff; font-size: 17px">تحميل</h4>
            <font-awesome
              :icon="['fas', 'fa-cloud-arrow-up']"
              class="fa-lg mr-2"
              color="white" />
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon color="white">mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn
            @click="clear_files"
            color="white"
            class="mt-5 px-15 mr-4"
            elevation="4">
            <h4 style="color: #000836; font-size: 17px">حذف الكل</h4>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import vue2Dropzone from "vue2-dropzone";
  import "vue2-dropzone/dist/vue2Dropzone.min.css";
  import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
  export default {
    name: "app",
    components: {
      vueDropzone: vue2Dropzone,
      LottieAnimation,
    },
    data: function () {
      return {
        files: [],
        dropzoneOptions: {
          url: "http://127.0.0.1:8000/api/drop_zone",
          method: "post",
          thumbnailWidth: 200,
          maxFilesize: 4,
          parallelUploads: 6,
          uploadMultiple: true,
          addRemoveLinks: true,
        },
      };
    },
    computed: {
      loadingButton() {
        return this.$store.state.pdf.loadingButton;
      },
    },
    methods: {
      // اضافة صور في مصفوفه
      after_complete_upload(response) {
        if (response.status == "success") {
          let data = {};
          data["image"] = response.dataURL;
          this.files.push(data);
        } else if (response.status == "error") {
          let snack_message = {};
          snack_message["color"] = "amber darken-4";
          snack_message["icon"] = "alert-circle";
          snack_message["text"] = "الحد الادنى لكل صورة 4MB";
          this.$store.commit("SNACK_MESSAGE", snack_message);
          setTimeout(() => {
            this.$store.commit("TIME_OUT", snack_message);
          }, 4000);
        }
      },
      // حذف صورة معينه
      remove_file(file) {
        let index = this.files.findIndex(
          (element) => element.image === file.dataURL
        );
        this.files.splice(index, 1);
      },
      // تحميل صور على  الخادم
      upload() {
        if (this.files[0] != null) {
          this.$store.dispatch("pdf/upload_image", this.files).then(() => {
            this.clear_files;
          });
          this.files = [];
        } else {
          let snack_message = {};
          snack_message["color"] = "amber darken-4";
          snack_message["icon"] = "alert-circle";
          snack_message["text"] = "لم تقم بأضافة صور";
          this.$store.commit("SNACK_MESSAGE", snack_message);
          setTimeout(() => {
            this.$store.commit("TIME_OUT", snack_message);
          }, 4000);
        }
      },
      // حذف كل صور
      clear_files() {
        this.$refs.myVueDropzone.removeAllFiles();
      },
    },
  };
</script>
<style>
  .dz-remove {
    margin-right: 29px !important;
    margin-left: 0 !important;
  }
  .dropzone-custom-content {
    position: absolute;
    margin-top: 120px;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .dropzone-custom-title {
    margin-top: 0;
    color: #00b782;
  }

  .subtitle {
    color: #314b5f;
  }
  .dropzone {
    min-height: 350px;
    border-radius: 10px;
  }
  .vue-dropzone:hover {
    background-color: #ffffff !important;
  }
</style>
