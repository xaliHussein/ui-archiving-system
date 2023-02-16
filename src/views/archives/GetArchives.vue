<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <!-- table get archive -->
      <v-col cols="12" sm="12" md="12" lg="12">
        <DataTable
          :headers="headers"
          :loading="loading_archive"
          :title="table_title"
          :items="archive"
          :item="item"
          :pageCount="pageCount"
          :pagination="pagination"
          :box_search="true"
          :date_from="date_from"
          :date_to="date_to"
          button1="mdi-cast-variant"
          @mdi-cast-variant="display_files"
          @update-date_from="update_dateF"
          @update-date_to="update_dateT"
          @update-item="pagination.itemsPerPage = $event"
          @update-pag="pagination.page = $event"
          @update-query="update_archive_query"
          @query-change="query_change" />
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
  import PopDisplayFiles from "../../components/Archives/PopDisplayFiles.vue";
  import DataTable from "../../components/layout/Table.vue";
  export default {
    components: {
      DataTable,
      PopDisplayFiles,
    },
    data() {
      return {
        dialog: false,
        date_from: "",
        date_to: "",
        table_files: [],
        item: [1, 2, 5, 10],
        pagination: { sortBy: [], sortDesc: [], page: 1, itemsPerPage: 10 },
        table_title: "ملفات المؤرشفة",
        headers: [
          {
            text: "عنوان الارشيف",
            align: "center",
            value: "title",
            class: " title ",
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
            value: "modified_date",
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
      this.$store.dispatch("archive/get_archive");
    },
    computed: {
      loading_archive() {
        return this.$store.state.archive.loading_archive;
      },
      loading_download() {
        return this.$store.state.archive.loading_download;
      },
      archive() {
        return this.$store.state.archive.archive;
      },
      pageCount() {
        return this.$store.state.archive.pageCount2;
      },
      archive_params: {
        set(val) {
          this.$store.state.archive.archive_param = val;
        },
        get() {
          return this.$store.state.archive.archive_param;
        },
      },
      archive_query: {
        set(val) {
          this.$store.state.archive.archive_query = val;
        },
        get() {
          return this.$store.state.archive.archive_query;
        },
      },
    },
    methods: {
      get_archive() {
        let pagination = this.pagination;
        let par = {
          ...pagination,
        };
        this.archive_params = par;
        this.$store.dispatch("archive/get_archive");
      },
      // عرض ملفات
      display_files(item) {
        this.dialog = true;
        this.table_files = item.files;
      },
      update_dateF(val) {
        this.date_from = val;
        this.$store.state.archive.date_from = val;
        this.get_archive();
      },
      update_dateT(val) {
        this.date_to = val;
        this.$store.state.archive.date_to = val;
        this.get_archive();
      },
      query_change() {
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.pagination.page = 1;
          this.get_archive();
        }, 500);
      },
      update_archive_query(event) {
        this.archive_query = event;
      },
    },
    watch: {
      pagination: {
        handler() {
          this.get_archive();
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
