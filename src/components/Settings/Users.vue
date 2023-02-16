<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="12">
      <v-card width="750px" class="mx-auto card">
        <v-data-table
          :headers="headers"
          :items="users"
          :options.sync="pagination"
          :page.sync="pagination.page"
          :items-per-page="pagination.itemsPerPage"
          :loading="table_loading || false"
          hide-default-footer
          loading-text="جاري التحميل يرجى الأنتظار">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    fab
                    small
                    v-on="on"
                    icon
                    color="btnU"
                    @click="popUser = !popUser">
                    <font-awesome :icon="['fas', 'fa-plus']" size="2x" />
                  </v-btn>
                </template>
                <span>اضافة مستخدمين</span>
              </v-tooltip>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="users_Query"
                @input="query_change"
                append-icon="mdi-magnify"
                clearable
                color="black"
                label="بحث"
                single-line
                hide-details
                class="mr-5 font-weight-black"></v-text-field>
            </v-toolbar>
          </template>
          <th
            v-for="header in headers"
            :key="header.text"
            :class="[
              'column sortable',
              pagination.descending ? 'desc' : 'asc',
              header.value === pagination.sortBy ? 'active' : '',
            ]"
            @click="changeSort(header.value)">
            <v-icon small>mdi-arrow_upward</v-icon>
            {{ header.text }}
          </th>

          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center font-weight-black">{{ item.name }}</td>
              <td class="text-center font-weight-black">
                {{ item.user_name }}
              </td>
              <td
                class="text-center font-weight-black"
                v-if="item.phone_number == null">
                <h5 style="color: red">لايوجد</h5>
              </td>
              <td class="text-center font-weight-black" v-else>
                {{ item.phone_number }}
              </td>
              <td class="text-center font-weight-black" v-if="item.status == 1">
                فعال
              </td>
              <td
                class="text-center font-weight-black"
                v-else-if="item.status == 0">
                <h5 style="color: red">منتهي الاصلاحية</h5>
              </td>
              <td class="text-center font-weight-black">
                {{ item.activation_date }}
              </td>

              <td class="text-center font-weight-black">
                <v-tooltip bottom v-if="item.status == 1">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      x-small
                      style="background-color: #b71c1c"
                      v-bind="attrs"
                      v-on="on"
                      @click="user_status_change(item)">
                      <font-awesome
                        style="color: white"
                        :icon="['fas', 'fa-ban']"
                        size="2x" />
                    </v-btn>
                  </template>
                  <span>ايقاف</span>
                </v-tooltip>
                <v-tooltip bottom v-else>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      x-small
                      style="background-color: #43a047"
                      v-bind="attrs"
                      v-on="on"
                      @click="user_status_change(item)">
                      <font-awesome
                        style="color: white"
                        :icon="['fas', 'fa-circle-check']"
                        size="2x" />
                    </v-btn>
                  </template>
                  <span>تفعيل</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="text-center font-weight-black pt-2 mt-3">
          <v-row>
            <v-col
              align-self="center"
              cols="5"
              sm="5"
              md="3"
              lg="3"
              class="mr-4">
              <v-select
                v-model="pagination.itemsPerPage"
                :items="item"
                label="Items per page"
                color="textI"
                item-color="textI"></v-select>
            </v-col>
            <v-col align-self="center" cols="5" sm="5" md="4" lg="4">
              <v-pagination
                v-model="pagination.page"
                :length="pageCount"
                circle
                color="btnP"></v-pagination>
            </v-col>
          </v-row>
        </div>
        <!-- End table -->
        <AppAddUser :value="popUser" v-on:popUser="popUser = !popUser" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  import AppAddUser from "../../components/Settings/AppAddUser.vue";
  export default {
    components: { AppAddUser },
    data() {
      return {
        popUser: false,
        title: "جدول ادارة الحسابات",
        headers: [
          {
            text: "اسم العميل",
            align: "center",
            value: "name",
            class: " title ",
          },
          {
            text: "اسم المستخدم",
            value: "user_name",
            align: "center",
            class: " title",
          },
          {
            text: "رقم الهاتف",
            value: "phone_number",
            align: "center",
            class: " title",
          },
          {
            text: "الحالة",
            value: "status",
            align: "center",
            class: " title",
          },
          {
            text: "تاريح التفعيل",
            value: "activation_date",
            align: "center",
            class: " title",
          },
          {
            text: "اجرائات",
            value: "procedures",
            align: "center",
            class: " title",
          },
        ],
        item: [1, 2, 5, 10, 25, 50, 100],
        pagination: {},
      };
    },
    computed: {
      table_loading() {
        return this.$store.state.table_loading;
      },
      users() {
        return this.$store.state.users;
      },
      pageCount() {
        return this.$store.state.pageCount;
      },
      users_params: {
        set(val) {
          this.$store.state.param = val;
        },
        get() {
          return this.$store.state.param;
        },
      },
      users_Query: {
        set(val) {
          this.$store.state.userQuery = val;
        },
        get() {
          return this.$store.state.userQuery;
        },
      },
    },
    methods: {
      get_users() {
        let pagination = this.pagination;
        let par = {
          ...pagination,
        };
        this.users_params = par;
        this.$store.dispatch("get_users");
      },
      query_change() {
        clearTimeout(this._timerId);
        this._timerId = setTimeout(() => {
          this.pagination.page = 1;
          this.get_users();
        }, 500);
      },
      user_status_change(item) {
        let data = {};
        data["id"] = item.id;
        this.$store.dispatch("user_status_change", data);
      },
      changeSort(column) {
        let pagination = this.users_params;
        if (pagination.sortBy[0] === column) {
          if (pagination.sortDesc[0] === true) {
            pagination.sortBy = [];
            pagination.sortDesc = [];
          } else {
            pagination.sortDesc = [true];
          }
        } else {
          pagination.sortBy = [column];
          pagination.sortDesc = [false];
        }
        this.$store.dispatch("get_users");
        this.goods_params.page = 1;
        this.goods_params.sortBy = pagination.sortBy;
        this.goods_params.sortDesc = pagination.sortDesc;
      },
    },
    watch: {
      pagination: {
        handler() {
          this.get_users();
        },
        deep: true,
      },
    },
  };
</script>
<style scoped>
  .card {
    box-shadow: 0px 0px 0px 0px !important;
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
