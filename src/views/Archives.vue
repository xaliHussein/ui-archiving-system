<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <!-- Card goods -->
      <v-col cols="12" sm="12" md="12" lg="12" class="pb-8">
        <v-card class="mx-auto mt-3 card" width="95%">
          <v-form ref="form">
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Input
                    @update-value="title = $event"
                    :value="title"
                    type="text"
                    label="عنوان الارشيف"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Input
                    @update-value="number_archive = $event"
                    :value="number_archive"
                    type="text"
                    label="رقم الارشيف"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Input
                    @update-value="file_number_save = $event"
                    @random="random_number()"
                    :value="file_number_save"
                    type="text"
                    label="رقم حفظ الارشيف"
                    appendIcon="mdi-counter"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Combobox
                    @update-value="received_side = $event"
                    :value="received_side"
                    :items="received_se"
                    label="الجهه المستلمه"
                    :rules="RulseAll" />
                </v-col>

                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Combobox
                    @update-value="type_books = $event"
                    :items="type_bs"
                    :value="type_books"
                    label="نوع الكتاب"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Input
                    @update-value="name_transaction_recipient = $event"
                    :value="name_transaction_recipient"
                    type="text"
                    label="اسم المستلم"
                    :rules="RulseAll" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Textarea
                    @update-value="notes = $event"
                    :value="notes"
                    :counter="255"
                    type="text"
                    hint="الحدالاقصى 255 حرف"
                    label="ملاحظات"
                    :rules="notesRules" />
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4"
                  ><Input
                    @update-value="modified_date = $event"
                    :value="modified_date"
                    type="text"
                    label="عنوان الارشيف"
                    :rules="RulseAll" />
                </v-col> </v-row
            ></v-card-text>
          </v-form>
        </v-card>
      </v-col>
      <!-- end -->
    </v-row>
  </v-container>
</template>
<script>
  import Input from "../components/layout/Input.vue";
  import Textarea from "../components/layout/Textarea.vue";
  import Combobox from "../components/layout/combobox.vue";
  export default {
    components: { Input, Textarea, Combobox },
    data() {
      return {
        title: null,
        number_archive: null,
        file_number_save: null,
        received_side: null,
        files: [],
        notes: null,
        type_books: null,
        name_transaction_recipient: null,
        modified_date: null,

        RulseAll: [(v) => !!v || "هذا الحقل مطلوب"],
        notesRules: [
          (v) => !!v || "هذا الحقل مطلوب",
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
      };
    },
    methods: {
      random_number() {
        this.$store.dispatch("archive/random_number").then((response) => {
          console.log("rendom_code", response);
        });
      },
    },
  };
</script>
<style scoped>
  .card {
    border-radius: 25px;
  }
</style>
