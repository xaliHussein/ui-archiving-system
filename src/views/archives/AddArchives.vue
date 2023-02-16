<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <!-- card add archive -->
      <v-col cols="12" sm="12" md="12" lg="12" class="pb-8">
        <v-card class="mx-auto mt-3 card" width="95%">
          <v-form ref="form">
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Input
                    @update-value="title = $event"
                    :value="title"
                    icon="mdi-notebook-multiple"
                    type="text"
                    color="textI"
                    label="عنوان الارشيف"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Input
                    @update-value="number_archive = $event"
                    :value="number_archive"
                    type="text"
                    label="رقم الارشيف"
                    color="textI"
                    icon="mdi-numeric"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Input
                    @update-value="file_number_save = $event"
                    @random="random_number()"
                    :loading="loading_num"
                    :value="file_number_save"
                    type="text"
                    label="رقم حفظ الارشيف"
                    color="textI"
                    appendIcon="mdi-counter"
                    icon="mdi-bookmark"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Combobox
                    @update-value="received_side = $event"
                    :value="received_side"
                    :items="received_se"
                    color="textI"
                    icon="mdi-swap-vertical-bold"
                    label="الجهه المستلمه"
                    :rules="RulseAll" />
                </v-col>

                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Combobox
                    @update-value="type_books = $event"
                    :items="type_bs"
                    :value="type_books"
                    color="textI"
                    icon="mdi-book-multiple"
                    label="نوع الكتاب"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Input
                    @update-value="name_transaction_recipient = $event"
                    :value="name_transaction_recipient"
                    type="text"
                    color="textI"
                    icon="mdi-account-tie"
                    label="اسم المستلم"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <InputDate
                    @update-value="date = $event"
                    :value="date"
                    :rules="RulseAll"
                    icon="mdi-calendar"
                    color="#000000"
                    label=" تاريخ الكتاب" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Textarea
                    @update-value="notes = $event"
                    :value="notes"
                    :counter="255"
                    :rules="notesRules"
                    color="textI"
                    icon="mdi-comment"
                    type="text"
                    hint="الحدالاقصى 255 حرف"
                    label="ملاحظات" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <UploadImage :rules="RulseAll" v-on:files="upload_file" />
                </v-col> </v-row
            ></v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                @click="add_archive"
                :loading="loading_add"
                color="btn"
                class="px-15"
                elevation="4">
                <h4 style="color: white; font-size: 17px">اضافة ارشيف</h4>
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon color="white">mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>

              <v-btn
                @click="remove_data"
                color="btnC"
                class="px-15"
                elevation="4">
                <h4 style="color: #000000; font-size: 17px">تصفير الحقول</h4>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <!-- end card -->
      </v-col>
      <!-- table add archive 4f4e52-->
      <v-col cols="12">
        <DataTable
          :headers="headers"
          :loading="loading_archive"
          :title="table_title"
          :items="last_archive"
          :item="item"
          :pageCount="pageCount"
          :pagination="pagination"
          :box_search="false"
          button1="mdi-cast-variant"
          @mdi-cast-variant="display_files"
          @update-item="pagination.itemsPerPage = $event"
          @update-pag="pagination.page = $event" />
      </v-col>
      <!-- end -->
      <!-- display files -->
      <PopDisplayFiles
        :dialog="dialog"
        :files="table_files"
        :loading="loading_download"
        @close="dialog = false" />
      <!-- end -->
    </v-row>
  </v-container>
</template>
<script>
  import Input from "../../components/layout/Input.vue";
  import Textarea from "../../components/layout/Textarea.vue";
  import Combobox from "../../components/layout/combobox.vue";
  import InputDate from "../../components/layout/InputDate.vue";
  import UploadImage from "../../components/Archives/UploadImage.vue";
  import DataTable from "../../components/layout/Table.vue";
  import PopDisplayFiles from "../../components/Archives/PopDisplayFiles.vue";
  export default {
    components: {
      Input,
      Textarea,
      Combobox,
      UploadImage,
      InputDate,
      DataTable,
      PopDisplayFiles,
    },
    data() {
      return {
        dialog: false,
        table_files: [],
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        title: null,
        number_archive: null,
        file_number_save: null,
        received_side: null,
        files: [],
        notes: null,
        type_books: null,
        name_transaction_recipient: null,
        RulseAll: [(v) => !!v || "هذا الحقل مطلوب"],
        notesRules: [
          (v) =>
            (v || "").length <= 255 ||
            "لقد وصلت الحد الاقصى لعدد الحروف المطلوبة",
        ],

        type_bs: ["صادر", "وارد"],
        received_se: [
          "وزارة التعليم العالي والبحث العلمي",
          "وزارة التربية",
          "وزارة الزراعة",
          "وزارة التخطيط",
          "وزارة النقل",
          "وزارة الصحة",
          "وزارة التجارة",
          "وزارة الثقافة والسياحة والآثار",
          "وزارة الشباب والرياضة",
          "وزارة الإتصالات",
          "وزارة الاعمار والإسكان والبلديات والأشغال العامة",
          "وزارة الموارد المائية",
          "وزارة الهجرة والمهجرين	",
          "وزارة الكهرباء	",
          "وزارة العمل والشؤون الاجتماعية",
          "وزارة النفط",
          "وزارة المالية",
          "رئاسة وزراء",
          "وزارة الداخلية",
          "وزارة الدفاع",
          "وزارة العدل",
          "وزارة الصناعة والمعادن",
        ],
        item: [1, 2, 5, 10],
        pagination: { sortBy: [], sortDesc: [], page: 1, itemsPerPage: 10 },
        table_title: "اخر ملفات المؤرشفة",
        headers: [
          {
            text: "عنوان الارشيف",
            align: "center",
            value: "title",
            class: "  title ",
          },
          {
            text: "رقم الارشيف",
            value: "number_archive",
            align: "center",
            class: " title",
          },
          {
            text: "رقم حفظ الارشيف",
            value: "file_number_save",
            align: "center",
            class: " title",
          },
          {
            text: "الجهه المستلمه",
            value: "received_side",
            align: "center",
            class: " title",
          },
          {
            text: "نوع الكتاب",
            value: "type_books",
            align: "center",
            class: " title",
          },
          {
            text: "اسم المستلم",
            value: "name_transaction_recipient",
            align: "center",
            class: " title",
          },
          {
            text: "تاريخ الكتاب",
            value: "date",
            align: "center",
            class: " title",
          },
          {
            text: "ملاحظات",
            value: "notes",
            align: "center",
            class: " title",
          },
          {
            text: "اجرائات",
            value: "actions",
            align: "center",
            class: " title",
          },
        ],
      };
    },
    mounted() {
      this.$store.dispatch("archive/get_last_archive");
    },
    computed: {
      loading_archive() {
        return this.$store.state.archive.loading_last_archive;
      },
      loading_add() {
        return this.$store.state.archive.loading_add;
      },
      loading_download() {
        return this.$store.state.archive.loading_download;
      },
      loading_num() {
        return this.$store.state.archive.loading_random_num;
      },
      last_archive() {
        return this.$store.state.archive.last_archive;
      },
      pageCount() {
        return this.$store.state.archive.pageCount;
      },
      archive_params: {
        set(val) {
          this.$store.state.archive.param = val;
        },
        get() {
          return this.$store.state.archive.param;
        },
      },
    },
    methods: {
      // انشاء رقم حفظ ارشيف عشوائي
      random_number() {
        this.$store.dispatch("archive/random_number").then((response) => {
          this.file_number_save = response.data.result[0];
        });
      },
      // انشاء ارشيف
      add_archive() {
        if (this.$refs.form.validate()) {
          let data = {};
          data["title"] = this.title;
          data["number_archive"] = this.number_archive;
          data["file_number_save"] = this.file_number_save;
          data["received_side"] = this.received_side;
          data["files"] = this.files;
          data["notes"] = this.notes;
          data["name_transaction_recipient"] = this.name_transaction_recipient;
          data["date"] = this.date;
          data["type_books"] = this.type_books;
          console.log("files", data);
          this.$store.dispatch("archive/add_archive", data).then(() => {
            this.$refs.form.reset();
          });
        }
      },
      // تصفير الحقول
      remove_data() {
        this.$refs.form.reset();
      },
      // اضافة الملفات في مصفوفه
      upload_file(files) {
        this.files = files;
      },
      get_last_archive() {
        let pagination = this.pagination;
        let par = {
          ...pagination,
        };
        this.archive_params = par;
        this.$store.dispatch("archive/get_last_archive");
      },
      // عرض ملفات
      display_files(item) {
        this.dialog = true;
        this.table_files = item.files;
      },
    },
    watch: {
      pagination: {
        handler() {
          this.get_last_archive();
        },
        deep: true,
      },
    },
  };
</script>
<style scoped>
  .card {
    border-radius: 25px;
  }
</style>
<style lang="scss">
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
    background-color: #9a9a9a !important;
    color: #ffffff !important;
  }
</style>
