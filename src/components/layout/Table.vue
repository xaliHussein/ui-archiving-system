<template>
  <v-card class="mx-auto card mb-15" width="99%">
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="pagination.itemsPerPage"
        :loading="loading"
        hide-default-footer
        loading-text="جاري التحميل يرجى الأنتظار">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              :value="search"
              @input="updateQuery"
              v-if="box_search"
              append-icon="mdi-magnify"
              clearable
              color="textI"
              label="بحث"
              single-line
              hide-details
              class="mr-5 font-weight-black"></v-text-field>
          </v-toolbar>
        </template>
        <th v-for="header in headers" :key="header.text">
          <v-icon small>mdi-arrow_upward</v-icon>
          {{ header.text }}
        </th>

        <template v-slot:item="{ item }">
          <tr>
            <td class="text-center font-weight-black">
              {{ item.title }}
            </td>
            <td class="text-center font-weight-black">
              {{ item.number_archive }}
            </td>
            <td class="text-center font-weight-black">
              {{ item.file_number_save }}
            </td>
            <td class="text-center font-weight-black">
              {{ item.received_side }}
            </td>
            <td class="text-center font-weight-black">
              {{ item.type_books }}
            </td>
            <td class="text-center font-weight-black">
              {{ item.name_transaction_recipient }}
            </td>
            <td class="text-center font-weight-black">
              {{ item.date }}
            </td>
            <td class="text-center font-weight-black">
              {{ item.notes }}
            </td>

            <td class="text-center font-weight-black">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="button1"
                    fab
                    x-small
                    color="grey darken-3 "
                    v-bind="attrs"
                    v-on="on"
                    @click="popDisplay(item)">
                    <v-icon color="white">{{ button1 }}</v-icon>
                  </v-btn>
                </template>
                <span>عرض ملفات</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="button2"
                    fab
                    x-small
                    class="mr-1"
                    color="#E65100"
                    v-bind="attrs"
                    v-on="on"
                    @click="payDebts(item)">
                    <font-awesome
                      style="color: white"
                      :icon="['fas', button2]"
                      size="2x" />
                  </v-btn>
                </template>
                <span>تعديل</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div class="text-center font-weight-black pt-2 mt-3">
        <v-row>
          <v-col align-self="center" cols="5" sm="5" md="2" lg="2" class="mr-4">
            <v-select
              :value="pagination.itemsPerPage"
              :items="item"
              color="textI"
              item-color="textI"
              @input="$emit('update-item', $event)"
              label="Items per page"></v-select>
          </v-col>
          <v-col align-self="center" cols="5" sm="5" md="3" lg="3">
            <v-pagination
              :value="pagination.page"
              :length="pageCount"
              @input="changePagination"
              circle
              color="btnP"></v-pagination>
          </v-col>
          <v-col
            align-self="center"
            v-if="box_search"
            cols="5"
            sm="5"
            md="3"
            lg="3">
            <InputDate
              @update-value="$emit('update-date_from', $event)"
              :value="date_from"
              icon="mdi-calendar"
              color="#000000"
              label="من تاريخ" />
          </v-col>
          <v-col
            align-self="center"
            v-if="box_search"
            cols="5"
            sm="5"
            md="3"
            lg="3">
            <InputDate
              @update-value="$emit('update-date_to', $event)"
              :value="date_to"
              icon="mdi-calendar"
              color="#000000"
              label="الى" />
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-card>
</template>
<script>
  import InputDate from "../../components/layout/InputDate.vue";
  export default {
    components: { InputDate },
    props: {
      headers: {
        type: Array,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
      item: {
        type: Array,
        required: true,
      },
      pagination: {
        type: Object,
        required: true,
      },
      button1: {
        type: String,
        required: false,
      },
      button2: {
        type: String,
        required: false,
      },
      date_from: {
        type: String,
        default: "",
      },
      date_to: {
        type: String,
        default: "",
      },
      box_search: {
        type: Boolean,
        default: false,
      },
      loading: Boolean,
      title: String,
      pageCount: Number,
      search: String,
    },
    methods: {
      changePagination(event) {
        this.$emit("update-pag", event);
      },
      updateQuery(event) {
        this.$emit("update-query", event);
        this.$emit("query-change");
      },
      popDisplay(item) {
        this.$emit(this.button1, item);
      },
      payDebts(item) {
        this.$emit(this.button2, item);
      },
    },
  };
</script>
<style scoped>
  .card {
    border-radius: 25px !important;
  }
</style>
