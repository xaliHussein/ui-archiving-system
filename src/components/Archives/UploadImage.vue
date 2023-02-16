<template>
  <v-dialog ref="dialog" v-model="dialog" persistent width="100%">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="nameFile"
        label="اضافة ملفات"
        type="text"
        class="font-weight-black"
        :rules="rules"
        color="textI"
        prepend-icon="mdi-file-multiple"
        readonly
        v-bind="attrs"
        v-on="on"></v-text-field>
    </template>
    <v-card>
      <v-toolbar class="d-flex justify-center" color="header" dark>
        <h2 style="color: white">اضافة ملفات</h2>
      </v-toolbar>
      <v-card-text class="mt-3">
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
          <v-btn @click="upload" color="btn" class="mt-5 px-15" elevation="4">
            <h4 style="color: white; font-size: 17px">اضافة</h4>
          </v-btn>
          <v-btn
            @click="cancel"
            color="btnC"
            class="mt-5 px-15 mr-4"
            elevation="4">
            <h4 style="color: #000000; font-size: 17px">الغاء</h4>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import vue2Dropzone from "vue2-dropzone";
  import "vue2-dropzone/dist/vue2Dropzone.min.css";
  import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
  export default {
    props: {
      rules: {
        type: Array,
        required: false,
      },
    },
    components: { vueDropzone: vue2Dropzone, LottieAnimation },
    data() {
      return {
        dialog: false,
        nameFile: null,
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
        pdfFile: "",
      };
    },
    methods: {
      // اضافة صور في مصفوفه
      after_complete_upload(response) {
        // اذا تم رفع ملف pdf
        if (response.status == "success") {
          // اذا تم رفع ملف pdf
          if (response.type == "application/pdf") {
            // convert pdf to base64
            var fileReader = new FileReader();
            var base64;
            fileReader.onload = (fileLoadedEvent) => {
              base64 = fileLoadedEvent.target.result;
              response.dataURL = base64;
              // اضافة base64 الى مصفوفه
              let data = {};
              data["file"] = response.dataURL;
              this.files.push(data);
            };
            fileReader.readAsDataURL(response);
            // اذا تم رفع صور
          } else if (response.type.substring(0, 5) == "image") {
            let data = {};
            data["file"] = response.dataURL;
            this.files.push(data);
          } else {
            // اذا تم ارفاق ملفات غير صور و pdf
            this.nameFile = null;
            this.$refs.myVueDropzone.removeAllFiles();
            let snack_message = {};
            snack_message["color"] = "amber darken-4";
            snack_message["icon"] = "alert-circle";
            snack_message["text"] = "الملفات المدعومه pdf و صور فقط";
            this.$store.commit("SNACK_MESSAGE", snack_message);
            setTimeout(() => {
              this.$store.commit("TIME_OUT", snack_message);
            }, 4000);
          }
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
        this.nameFile = "files " + this.files.length;
        this.$emit("files", this.files);
        this.dialog = false;
      },
      // حذف كل صور
      cancel() {
        this.nameFile = null;
        this.$refs.myVueDropzone.removeAllFiles();
        this.dialog = false;
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
