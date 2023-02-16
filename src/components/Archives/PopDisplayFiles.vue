<template>
  <v-dialog ref="dialog" :value="dialog" persistent width="100%">
    <v-toolbar class="d-flex justify-center" color="header" dark>
      <h2 style="color: white">ملفات الارشيف</h2>
    </v-toolbar>
    <v-card width="100%" class="d-flex justify-center">
      <v-col cols="8" class="d-flex justify-center">
        <v-card-text class="mt-3"
          ><v-data-table
            :headers="headers"
            :loading="loading"
            :items="files"
            hide-default-footer>
            <th v-for="header in headers" :key="header.text">
              <v-icon small>mdi-arrow_upward</v-icon>
              {{ header.text }}
            </th>

            <template v-slot:item="{ item }">
              <tr>
                <td
                  class="text-center font-weight-black"
                  v-if="item.files.slice(-4) == 'jpeg'">
                  {{ item.files.slice(-4) }}
                </td>
                <td
                  class="text-center font-weight-black"
                  v-else-if="item.files.slice(-3) == 'jpg' || 'png' || 'pdf'">
                  {{ item.files.slice(-3) }}
                </td>
                <td class="text-center font-weight-black">
                  <font-awesome
                    @click="download(item)"
                    class="fa-xl download"
                    :icon="['fas', 'fa-download']" />
                </td>
                <td class="text-center font-weight-black">
                  {{ moment(item.created_at).format("YYYY-MM-DD") }}
                </td>
              </tr>
            </template>
          </v-data-table>
          <div class="mt-4">
            <v-btn
              @click="$emit('close')"
              color="btnC"
              class="mt-5 px-15 mr-4"
              elevation="4">
              <h4 style="color: #000000; font-size: 17px">اغلاق</h4>
            </v-btn>
          </div>
        </v-card-text>
      </v-col>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      files: {
        type: Array,
        require: true,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        headers: [
          {
            text: "نوع الملف",
            value: "number_archive",
            align: "center",
            class: "color-header white--text title",
          },
          {
            text: "تنزيل",
            value: "file_number_save",
            align: "center",
            class: "color-header white--text title",
          },
          {
            text: "تاريخ اضافة",
            align: "center",
            value: "title",
            class: "color-header white--text title ",
          },
        ],
      };
    },
    methods: {
      download(item) {
        let data = {};
        data["id"] = item.id;
        this.$store.dispatch("archive/download_files", data);
      },
    },
  };
</script>
<style scoped>
  .download {
    cursor: pointer;
  }
</style>
