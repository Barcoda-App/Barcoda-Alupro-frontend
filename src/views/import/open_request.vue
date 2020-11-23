<template>
  <div class="droid-arabic-kufi">
    <div style="padding: 50px">
       <b-overlay :show="show1" rounded="sm">
      <b-container>
        <b-row>
          <b-col sm="12" md="3">
            <h5 class="text-center">
              إذن رقم :
              <b-badge variant="danger">
                <b class="" style="font-family: Arial"
                  >I - {{request_number}}</b
                ></b-badge
              >
            </h5>
          </b-col>
          <b-col sm="12" md="3">
            <h5 class="text-center">
              الوردية :
              <b class="text-primary"
                >{{ period == 1 ? 'الأولى' : 'ثانيه' }}
                <b-icon-sun style="color: gold" v-if="period == 1" />
                <b-icon-moon style="color: #263238" v-if="period == 2" />
              </b>
            </h5>
          </b-col>
          <b-col sm="12" md="3">
            <h5 class="text-center">
              الميزان :
              <b :class="[portStatus ? 'text-success':'text-danger']"
                >{{ portStatus ? 'متصل' : 'غير متصل' }}
                <b-icon-emoji-dizzy v-if="!portStatus" />
                <b-icon-emoji-smile v-if="portStatus"
              /></b>
            </h5>
          </b-col>
          <b-col sm="12" md="3">
            <h5 class="text-center">
              التاريخ :
              <b-badge variant="primary">
                <b
                  class=""
                  style="font-family: Arial; font-size: 15px;"
                  >{{ curDate }}</b
                ></b-badge
              >
            </h5>
          </b-col>
        </b-row>
      </b-container>
      <hr class="my-4" />
      <b-row>
        <b-col xl="8" md="12" sm="12" lg="8">
          <b-container>
            <b-row class="bg-dark" style="border-radius: 5px;">
              
              <b-col md="8" sm="12" style="padding-bottom: 20px; padding-top: 20px;">
                <b-form-select
                  v-model="selected"
                  :options="ports"
                ></b-form-select>
              </b-col>
              <b-col md="4" sm="12" style="padding-top: 20px;">
                <b-button
                  @click="selectPort"
                  variant="warning"
                  style="width: 100%"
                >
                 <b-icon-plug-fill  style="margin-top: 3px;"/>
                  <b> توصيل الميزان</b>
                </b-button>
              </b-col>
            </b-row>
          </b-container>
          <b-row>
            <b-col
              style="padding-left: 15px; padding-right: 15px; padding-top: 15px"
            >
              <b-alert :show="selecFlag" variant="danger" class="text-center"
                ><b>يرجى اختيار الميزان الصحيح</b></b-alert
              >
            </b-col>
          </b-row>
          <b-form @submit="onSubmit" @reset="onReset">
            <b-container>
              <b-row>
                <b-col sm="12" lg="4" style="padding-bottom: 10px">
                  <b-form-input
                    required
                    v-model="form.code"
                    list="input-list1"
                    id="input-with-list"
                    placeholder="القطاع"
                  ></b-form-input>
                  <b-form-datalist
                    id="input-list1"
                    :options="all_codes"
                  ></b-form-datalist>
                </b-col>
                <b-col sm="12" lg="4" style="padding-bottom: 10px">
                  <b-form-select
                    v-model="form.color"
                    :options="optionsـcolors"
                  ></b-form-select>
                </b-col>
                <b-col sm="12" lg="4" style="padding-bottom: 10px">
                  <b-form-input
                    v-model="form.length"
                    list="input-list2"
                    placeholder="الطول"
                    id="input-with-list"
                  ></b-form-input>
                  <b-form-datalist
                    id="input-list2"
                    :options="all_sizes"
                  ></b-form-datalist>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" lg="4" style="padding-bottom: 10px">
                  <b-form-input
                    v-model="form.type"
                    list="input-list"
                    placeholder="نوع الانتاج"
                    id="input-with-list"
                  ></b-form-input>
                  <b-form-datalist
                    id="input-list"
                    :options="options"
                  ></b-form-datalist>
                </b-col>
                <b-col sm="12" lg="4" style="padding-bottom: 10px">
                  <b-form-input
                    v-model="form.finish"
                    list="input-list"
                    placeholder="التشطيب"
                    id="input-with-list"
                  ></b-form-input>
                  <b-form-datalist
                    id="input-list"
                    :options="options"
                  ></b-form-datalist>
                </b-col>
                <b-col sm="12" lg="4" style="padding-bottom: 10px">
                  <b-form-input
                    id="input-1"
                    v-model="form.count"
                    type="number"
                    required
                    placeholder="العدد"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" lg="6" style="padding-bottom: 10px">
                  <b-form-input
                    v-model="form.sales"
                    list="input-list"
                    placeholder="مبيعات القطاع"
                    id="input-with-list"
                  ></b-form-input>
                  <b-form-datalist
                    id="input-list"
                    :options="options"
                  ></b-form-datalist>
                </b-col>
                <b-col sm="12" lg="6">
                  <b-form-select
                    v-model="form.piston_number"
                    :options="optionsـpiston"
                  ></b-form-select>
                </b-col>
              </b-row>
            </b-container>
            <b-container>
              <b-row style="padding-top: 10px">
                <b-col sm="12" lg="4" style="padding-bottom: 10px">
                  <b-button
                    id="sds"
                    @click="modalShowFun"
                    variant="dark"
                    style="width: 100%"
                  >
                    <b-icon-printer style="margin-bottom: 3px;"/> <b>طباعه باركود / اضافه</b>
                    <b-icon-plus  style="margin-bottom: 3px;"/>
                  </b-button>
                </b-col>
                <b-col sm="12" lg="4" style="padding-bottom: 10px">
                  <b-button
                    id="asd"
                    @click="modalShow1Fun"
                    variant="success"
                    style="width: 100%"
                  >
                    <b-icon-printer style="margin-bottom: 3px;"/> <b>اعاده طباعه</b>
                  </b-button>
                </b-col>
                <b-col sm="12" lg="4" style="padding-bottom: 10px">
                  <b-button type="reset" variant="info" style="width: 100%">
                    <b-icon-arrow-clockwise animation="spin-pulse" style="margin-bottom: 2px;"/>
                    <b> تفريغ</b>
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-form>
        </b-col>
        <b-col sm="12" lg="4" md="12" xl="4">
          <b-row>
            <b-col
              sm="12"
              style="border-radius: 5px; border-bottom-left-radius: 0px;
              border-bottom-right-radius: 0px;"
              class="bg-dark"
            >
              <b-row>
                <b-col class="text-right" sm="5">
                  <h1 style="margin-top: 15px; color: white; border-left: 1px solid white;">الميزان</h1>
                </b-col>
                <b-col sm="7">
                   <div
                v-if="form.weight != null"
                class="text-center"
                style="
                padding: 0px;
                  margin-top: 10px;
                  font-size: 45px;
                  font-family: 'Segment7Standard' !important;
                  color: lime;
                "
              >
                {{ numbersWithCommas(form.weight) }}
              </div>
              <div
                v-else
                class="text-center"
                style="
                  padding-top: 10px;
                  font-size: 35px;
                  color: red;
                "
              >
                <b>غير متصل .</b>
              </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row
            style="
              border-top: 10px solid #dc3545;
              background-color: white;
            "
          >
            <b-col class="text-center" style="padding-top: 10px; background-color: grey;" md="6" sm="12">
              <h3>
                <b class="text-warning">إجمالى الوزن</b>
              </h3>
              <h3 class="text-danger" style="font-size: 35px">
                <b
                  style="
                    padding-top: 10px;
                    font-family: 'Segment7Standard' !important;
                    color: white;
                  "
                  >{{ parseInt(totalWeight) }}</b
                ><br /><b
                  class="droid-arabic-kufi text-dark"
                  style="font-size: 25px;"
                >
                  كجم</b
                >
              </h3>
            </b-col>
            <b-col class="text-center" style="padding-top: 10px; background-color: grey;" md="6" sm="12">
              <h3>
                <b class="text-warning">اجمالى العدد</b>
              </h3>
              <h3>
                <b
                  style="
                  color: white;
                    padding-top: 10px;
                    font-family: 'Segment7Standard' !important;
                    font-size: 35px;
                  "
                  >{{ totalCounts }}</b
                ><br /><b>عود</b>
              </h3>
            </b-col>
          </b-row>
          <b-row
            style="
              padding-bottom: 20px;
              background-color: white;
              border-bottom-right-radius: 15px;
              border-bottom-left-radius: 15px;
            "
          >
            <b-col class="bg-dark" style="padding: 10px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
              <b-button
                @click="endRequest"
                variant="danger"
                style="width: 100%"
              >
                <b>إنهاء الإإذن</b>
                <b-icon-stop-fill  animation="throb" style="margin-bottom: 3px; color: white" />
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr class="my-4" />
      <div v-if="show">
        <b-row v-if="table_loaded">
          <b-col sm="7">
            <h3 class="text-center">تفاصيل إذن الإضافه</h3>
            <b-table-simple sticky-header small responsive class="text-center">
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th>باركود</b-th>
                  <b-th>القطاع</b-th>
                  <b-th>اللون</b-th>
                  <b-th>العدد</b-th>
                  <b-th>الطول</b-th>
                  <b-th>نوع الانتاج</b-th>
                  <b-th>الوزن</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr
                  variant="light"
                  v-for="(items,indexs) in all_current_imports"
                  :key="indexs"
                >
                  <b-td>
                    {{ items.barcode }}
                  </b-td>
                  <b-td>
                    {{ items.code }}
                  </b-td>
                  <b-td>
                    {{ items.color }}
                  </b-td>
                  <b-td>
                    {{ items.count }}
                  </b-td>
                  <b-td>
                    {{ items.length }}
                  </b-td>
                  <b-td>
                    {{ items.finish }}
                  </b-td>
                  <b-td>
                    {{ items.weight }}
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col sm="5">
            <h3 class="text-center">إجمالى إذن الإضافه</h3>
            <b-table-simple sticky-header small responsive class="text-center">
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th>القطاع</b-th>
                  <b-th>اللون</b-th>
                  <b-th>الطول</b-th>
                  <b-th>العدد</b-th>
                  <b-th>الوزن</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr
                  variant="light"
                  v-for="(item,index) in total_current_imports"
                  :key="index"
                >
                  <b-td>
                    {{ item.code }}
                  </b-td>
                  <b-td>
                    {{ item.color }}
                  </b-td>
                  <b-td>
                    {{ item.length }}
                  </b-td>
                  <b-td>
                    {{ item.count }}
                  </b-td>
                  <b-td>
                    {{ item.weight.toFixed(1) }}
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col class="text-center">
            <h3 style="padding-bottom: 20px">
              يرجي الإنتظار جارى تحميل البينات
            </h3>
            <b-spinner style="width: 8rem; height: 8rem"></b-spinner>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <b-row>
          <b-col class="text-center" style="padding-top: 130px">
            <h1>لا يوجد أي مدخلات فى هذا الإذن</h1>
          </b-col>
        </b-row>
      </div>
      <b-modal
        v-model="modalShow"
        size="lg"
        body-bg-variant="dark"
        title-html="<b class='droid-arabic-kufi'> باركود منتج تام</b>"
        model-cancel
        ok-only
        ok-title="طباعه"
        ok-variant="dark"
        @ok="printMe"
      >
        <b-container>
          <b-row class="text-center">
            <b-col style="background-color: white; border-radius: 15px">
              <div id="printer" style="width: 100%">
                <table style="table-layout: fixed; width: 100% !important">
                  <tr style="border: 0px" class="text-center">
                    <th colspan="4" style="border: 0px">
                      <h5
                        style="font-family: tahoma; padding: 0px !important"
                        class="text-left"
                      >
                        AluAfric for Aluminum Indstry & Trading
                      </h5>
                      <h5 style="padding: 0px !important" class="text-right">
                        الافريقية لصناعة وتجارة الالومنيوم
                      </h5>
                    </th>
                    <th style="border: 0px; padding: 5px" class="text-left">
                      <img src="/v.svg" width="50" />
                    </th>
                  </tr>
                  <tr class="text-center">
                    <th>القطاع</th>
                    <th>التجارى</th>
                    <th>الطول</th>
                    <th>اللون</th>
                    <th>الوزن</th>
                  </tr>
                  <tr class="text-center">
                    <td>
                      {{form.code}}
                    </td>
                    <td>
                      {{form.sales}}
                    </td>
                    <td>{{form.length}}م</td>
                    <td>
                      {{ form.color }}
                    </td>
                    <td>
                      {{form.weight}}
                    </td>
                  </tr>
                  <tr class="text-center">
                    <th>العدد</th>
                    <th>الإإنتاج</th>
                    <th>مسلسل</th>
                    <th>التاريخ</th>
                    <th>الساعه</th>
                  </tr>
                  <tr class="text-center">
                    <td>
                      {{form.count}}
                    </td>
                    <td>
                      {{form.type}}
                    </td>
                    <td>
                      {{ serial }}
                    </td>
                    <td>
                      {{ curDate }}
                    </td>
                    <td>
                      {{ curTime }}
                    </td>
                  </tr>
                  <tr style="border: 0px">
                    <td colspan="5" class="text-center" style="border: 0px">
                      <barcode
                        class="svg"
                        :value="curBar"
                        style="
                          letter-spacing: 10px;
                          font-weight: 900 !important;
                        "
                        height="50"
                        font-size="14"
                        background="transparent"
                        width="3"
                        text-position="bottom"
                        font="tahoma"
                      >
                      </barcode>
                    </td>
                  </tr>
                </table>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-modal>
      <b-modal
        v-model="modalShow1"
        size="lg"
        body-bg-variant="dark"
        title-html="<b class='droid-arabic-kufi'> باركود منتج تام</b>"
        model-cancel
        ok-only
        ok-title="طباعه"
        ok-variant="dark"
        @ok="RePrint"
      >
        <b-container>
          <b-row class="text-center">
            <b-col style="background-color: white; border-radius: 15px">
              <div id="printer2">
                <table style="table-layout: fixed; width: 100% !important">
                  <tr style="border: 0px" class="text-center">
                    <th colspan="4" style="border: 0px">
                      <h5
                        style="font-family: tahoma; padding: 0px !important"
                        class="text-left"
                      >
                        AluAfric for Aluminum Indstry & Trading
                      </h5>
                      <h5 style="padding: 0px !important" class="text-right">
                        الافريقية لصناعة وتجارة الالومنيوم
                      </h5>
                    </th>
                    <th style="border: 0px; padding: 5px" class="text-left">
                      <img src="/v.svg" width="50" />
                    </th>
                  </tr>
                  <tr class="text-center">
                    <th>القطاع</th>
                    <th>التجارى</th>
                    <th>الطول</th>
                    <th>اللون</th>
                    <th>الوزن</th>
                  </tr>
                  <tr class="text-center">
                    <td>
                      {{form.code}}
                    </td>
                    <td>
                      {{form.color}}
                    </td>
                    <td>{{form.length}}م</td>
                    <td>
                      {{ form.color }}
                    </td>
                    <td>
                      {{form.weight}}
                    </td>
                  </tr>
                  <tr class="text-center">
                    <th>العدد</th>
                    <th>الإإنتاج</th>
                    <th>مسلسل</th>
                    <th>التاريخ</th>
                    <th>الساعه</th>
                  </tr>
                  <tr class="text-center">
                    <td>
                      {{form.count}}
                    </td>
                    <td>
                      {{form.type}}
                    </td>
                    <td>
                      {{ serial }}
                    </td>
                    <td>
                      {{ curDate }}
                    </td>
                    <td>
                      {{ curTime }}
                    </td>
                  </tr>
                  <tr style="border: 0px">
                    <td colspan="5" class="text-center" style="border: 0px">
                      <barcode
                        class="svg"
                        :value="curBar"
                        style="
                          letter-spacing: 15px;
                          font-weight: 900 !important;
                        "
                        height="50"
                        font-size="14"
                        background="transparent"
                        width="2"
                        text-position="bottom"
                        font="tahoma"
                      >
                      </barcode>
                    </td>
                  </tr>
                </table>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-modal>
        <template #overlay>
              <div class="text-center">
                 <h5 style="font-family: 'Seven Segment' !important; color: black"><span style="color: #dc3545 !important">-[ </span><b>BAR</b><b style="color: grey;">CODA</b><span style="color: #dc3545 !important"> ]-</span></h5>
                <img src="/bar.png" width="100">
                <p style="font-size: 20px;">جارى تحميل البينات</p>
                 <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
              </div>
            </template>
           </b-overlay>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { ipcRenderer } from 'electron';
import Barcode from 'vue-barcode';
import moment from 'moment'
import axios from 'axios'
export default {

    name: 'open_request',
    components: {
        Barcode
    },
    data() {
        return {
            all_sizes: ["1.20", "1.30", "1.52", "1.5", "1.60", "1.65", "1.80", "1.90", "10.20", "10.50", "10", "11.65", "11.70", "11.80", "12.20", "12.45", "12", "13.35", "1", "2.04", "2.10", "2.15", "2.20", "2.25", "2.30", "2.33", "2.40", "2.45", "2.50", "2.60", "2.65", "2.70", "2.75", "2.80", "2.85", "2.90", "2.91", "2.95", "2.96", "2.98", "20", "28", "2", "3.02", "3.05", "3.10", "3.12", "3.14", "3.15", "3.18", "3.20", "3.22", "3.24", "3.25", "3.30", "3.32", "3.40", "3.49", "3.50", "3.60", "3.62", "3.63", "3.64", "3.65", "3.70", "3.72", "3.80", "3.82", "3.85", "3.90", "3.98", "30", "3", "4.02", "4.05", "4.07", "4.10", "4.12", "4.20", "4.25", "4.28", "4.30", "4.35", "4.37", "4.40", "4.44", "4.45", "4.47", "4.50", "4.52", "4.55", "4.56", "4.60", "4.64", "4.65", "4.67", "4.70", "4.75", "4.80", "4.82", "4.85", "4.90", "4.96", "40", "42", "45", "4", "5.10", "5.12", "5.15", "5.20", "5.25", "5.30", "5.35", "5.39", "5.40", "5.45", "5.52", "5.53", "5.55", "5.56", "5.5", "5.60", "5.68", "5.70", "5.75", "5.80", "5.85", "5.90", "5.96", "5.98", "50", "52", "56", "5", "6.05", "6.06", "6.10", "6.15", "6.16", "6.20", "6.25", "6.30", "6.35", "6.40", "6.45", "6.5", "6.60", "6.65", "6.70", "6.75", "6.80", "6.85", "6.90", "60", "65", "6", "7.05", "7.10", "7.20", "7.25", "7.30", "7.40", "7.50", "7.70", "70", "75", "79.4", "7", "8.70", "87", "8", "90", "9"],
            curBar: 'B A R C O D E',
            period: null,
            selected: null,
            modalShow: false,
            modalShow1: false,
            table_loaded: false,
            form: {
                code: '',
                color: '',
                length: null,
                type: '',
                finish: '',
                count: null,
                weight: null,
                sales: '',
                piston_number: ''
            },
            flag: true,
            test: null,
            options: ['PS-4820', 'PS-2190', 'UN-15', 'UN-1050', 'AG-40'],
            optionsـpiston: [
            { value: '', text: 'رقم المكبس' },
            { value: '1', text: 'مكبس ١' },
            { value: '2', text: 'مكبس ٢' },
            { value: '3', text: 'مكبس ٣' },
            { value: '4', text: 'مكبس ٤' }
          ],
          optionsـcolors: [
            { value: '', text: 'لون القطاع' },
            { value: 'MF', text: 'MF' },
            { value: 'ذهبى', text: 'ذهبى' },
            { value: 'فضى', text: 'فضى' },
            { value: 'برونز', text: 'برونز' }
          ],
            show: true,
            portStatus: false,
            ports: [],
            selecFlag: false,
            app: null,
            all_current_imports: [],
            request_number: null,
            total_current_imports: [],
            all_codes: null,
            serial: null,
            show1: true,
            busy: false
        }
    },
    methods: {
        modalShowFun() {
          this.show1 = true
            axios({
                url: `${process.env.VUE_APP_URL}/imports/create`,
                method: 'POST',
                data: {
                    code: this.form.code,
                    color: this.form.color,
                    length: this.form.length,
                    type: this.form.type,
                    finish: this.form.finish,
                    count: this.form.count,
                    sales: this.form.sales,
                    piston_number: this.form.piston_number,
                    weight: this.form.weight,
                    shift_number: this.period
                }
            }).then(response => {
                this.all_current_imports.push(response.data)
                this.curBar = response.data.barcode
                this.generateTotal(this.all_current_imports)
                this.serial++
                 this.modalShow = !this.modalShow
                  this.show1 = false
                this.$bvToast.toast('Product Imported Successfully!', {
                    title: `Product Imported Successfully!`,
                    variant: 'success',
                    solid: true
                })
                            }).catch(err => {
                                this.$bvToast.toast(`Error: ${err}`, {
                                    title: `Product Faild!`,
                                    variant: 'danger',
                                    solid: true
                                })
                                 this.curBar = 'B A R C O D E'
                            })
                             
        },
        modalShow1Fun() {
                this.modalShow1 = !this.modalShow1
        },
        numbersWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        generateTotal(data) {
            const mapped = data.map(i => ({ ...i, key: `${i.code}${i.color}${i.length}` }))
            const unified = _.groupBy(mapped, 'key')
            const result = []
            Object.keys(unified).forEach(i => {
                let count = _.sumBy(unified[i], j => j.count)
                let weight = _.sumBy(unified[i], j => j.weight)
                result.push({ ...unified[i][0], count, weight })
            })
            this.total_current_imports = result
        },
        onSubmit() {
            // evt.preventDefault()
            // alert(JSON.stringify(this.form))
            const currentTime = moment(); // e.g. 11:00 pm
            const startTime = moment('07:00 am', "HH:mm a");
            const endTime = moment('07:00 pm', "HH:mm a");
            const amIBetween = currentTime.isBetween(startTime, endTime);
            if (amIBetween) {
                this.period = 1
            } else {
                this.period = 2
            }
            axios({
                url: `${process.env.VUE_APP_URL}/imports/create`,
                method: 'POST',
                data: {
                    code: this.form.code,
                    color: this.form.color,
                    length: this.form.length,
                    type: this.form.type,
                    finish: this.form.finish,
                    count: this.form.count,
                    sales: this.form.sales,
                    piston_number: this.form.piston_number,
                    weight: this.form.weight,
                    shift_number: this.period
                }
            }).then(response => {
                this.all_current_imports.push(response.data)
                this.curBar = response.data.barcode
                this.printMe()
                this.$bvToast.toast('Product Imported Successfully!', {
                    title: `Product Imported Successfully!`,
                    variant: 'success',
                    solid: true
                })
                this.generateTotal(this.all_current_imports)
            }).catch(err => {
                this.$bvToast.toast(`Error: ${err}`, {
                    title: `Product Faild!`,
                    variant: 'danger',
                    solid: true
                })
            })

        },
        endRequest() {
            if (this.total_current_imports.length > 0) {
                axios({
                    url: `${process.env.VUE_APP_URL}/app/create_request`,
                    method: 'PUT'
                }).then(res => { // eslint-disable-line
                    this.$router.push('/')
                })
            } else {
                this.$bvToast.toast('يرجى إدخال البينات بشكل كامل', {
                    title: `حدث خطأ`,
                    variant: 'danger',
                    solid: true
                })
            }
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.code = ''
            this.form.color = ''
            this.form.length = ''
            this.form.type = ''
            this.form.finish = ''
            this.form.count = ''
            this.form.sales = ''
            this.form.piston = ''
        },
        selectPort() {
            if (this.selected) {
                this.selecFlag = false
                ipcRenderer.send("channel1", this.selected);
                ipcRenderer.on("channel1", (e, data) => {
                    if (data != null) {
                        if (!isNaN(data)) {
                            this.form.weight = parseFloat(Number(data))
                            this.test = parseFloat(Number(data))
                        }
                        this.portStatus = true
                    } else {
                      this.form.weight = null
                        this.portStatus = false
                    }
                });
            } else {
                this.selecFlag = true
            }
        },
        async printMe() {
                 const prtHtml = document.getElementById('printer').innerHTML;
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML;
            }
            let print = `<!DOCTYPE html>
                        <html>
                          <head>
                            ${stylesHtml}
                          </head>
                          <body>
                          <div class="row">
                                ${prtHtml}
                            </div>
                          </body>
                          <style>
                            @media print {
                            @page {
                              size: 100mm 50mm;
                              margin: 0;
                              padding: 0px;
                            }
                            .svg {
                              width: 100% !important;
                              height: 100% !important;
                              max-width: 100% !important;
                              max-height: 100% !important;
                            }
                            .row{
                              width: 520.5px !important;
                              margin-right: 20px !important;
                            }
                          }
                          </style>
                        </html>`
                     ipcRenderer.send("printPDF", print);
                       
                    },
        RePrint() {
            const prtHtml = document.getElementById('printer2').innerHTML;
              let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML;
            }
            let print = `<!DOCTYPE html>
        <html>
          <head>
            ${stylesHtml}
          </head>
          <body>
          <div class="row">
                ${prtHtml}
            </div>
          </body>
          <style>
            @media print {
            @page {
              size: 100mm 50mm;
              margin: 0;
              padding: 0px;
            }
            .svg {
              width: 100% !important;
              height: 100% !important;
              max-width: 100% !important;
              max-height: 100% !important;
            }
            .row{
              width: 520.5px !important;
              margin-right: 20px !important;
            }
          }
          </style>
        </html>`
            ipcRenderer.send("printPDF", print);
             this.curBar = 'B A R C O D E'
        }
    },
    created() {
      this.show1 = true
        ipcRenderer.send("channel2", "open dialog to getFiles from user");
        ipcRenderer.on("channel2", (e, data) => {
          let title = [{ value:null, text:'اختار الميزان' }]
           let newArray =  title.concat(data)
            this.ports = newArray
        })
        const currentTime = moment(); // e.g. 11:00 pm
        const startTime = moment('07:00 am', "HH:mm a");
        const endTime = moment('07:00 pm', "HH:mm a");
        const amIBetween = currentTime.isBetween(startTime, endTime);
        if (amIBetween) {
            this.period = 1
        } else {
            this.period = 2
        }
        this.table_loaded = false
        axios({
            url: `${process.env.VUE_APP_URL}/app/retrieve`,
            method: 'GET',
            params: { app_name: 'Alupro' }
        }).then(response => {
            this.app = response.data
            this.request_number = response.data.import_requests + 1
            this.serial = response.data.imports_jobs
            axios({
                url: `${process.env.VUE_APP_URL}/imports/request_number`,
                method: 'GET',
                params: { request_number: this.request_number }
            }).then(response => {
                this.all_current_imports = response.data
                this.generateTotal(response.data)
                this.table_loaded = true
                this.show1 = false
            })
        })
        axios({
            url: `${process.env.VUE_APP_URL}/partcode/get_all`,
            method: 'GET'
        }).then(response => {
            let x = response.data
            this.all_codes = x.map(e => { return e.code })
        })

    },
    computed: {
        state() {
            if (this.portStatus) {
                return 'متصل'
            } else {
                return 'غير متصل'
            }
        },
        totalWeight() {
            let Total = 0
            for (let i = 0; i < this.all_current_imports.length; i++) {
                Total += this.all_current_imports[i].weight
            }
            return parseFloat(Total)
        },
        totalCounts() {
            let Total = 0
            for (let i = 0; i < this.all_current_imports.length; i++) {
                Total += this.all_current_imports[i].count
            }
            return Total
        },
        curDate() {
            return moment().format('YYYY-MM-DD')
        },
        curTime() {
            return moment().format('HH:ss A')
        }
    }
}
</script>
<style lang="css" scoped>

.droid-arabic-kufi {
  font-family: "Droid Arabic Kufi", serif;
}

th,
td {
  border: 1px solid black;
}

td {
  font-family: tahoma;
}

input {
  font-family: tahoma;
}
</style>
