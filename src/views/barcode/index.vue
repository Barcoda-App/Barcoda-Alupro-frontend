<template>
  <div>
     <b-overlay :show="show1" rounded="sm">
    <b-container style="padding-top: 120px;">
      <b-row>
        <b-col>
          <h1 class="text-right"><b>تحميل سياره</b></h1>
        </b-col>
      </b-row>
      <b-row style="padding-top: 40px;">
        <b-col v-if="all_loading.length > 0">
          <b-table-simple sticky-header small responsive class="text-center">
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>رقم الأذن</b-th>
              <b-th>تاريخ الإذن</b-th>
              <b-th>اسم العميل</b-th>
              <b-th>اسم السائق</b-th>
              <b-th>رقم السياره</b-th>
              <b-th>وزن السياره</b-th>
              <b-th>عمليه</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr variant="light" v-for="(item,index) in all_loading" :key="index">
              <b-td stacked-heading="ID" style="font-family: Tahoma">
                {{ item.request_number }}
              </b-td>
              <b-td stacked-heading="Barcode"  style="font-family: Tahoma">
                {{ curDate(item.created_at) }}
              </b-td>
              <b-td>
               {{ item.client_name }}
              </b-td>
              <b-td>
                {{ item.truck_pilot_name }}
              </b-td>
              <b-td class="font">
               {{ item.truck_plates }}
              </b-td>
              <b-td class="font">
               {{ item.truck_weight_before }}
              </b-td>
              <b-td>
                <b-button varient="info" @click="$router.push(`/barcode/fill_truck/${item.request_number}`)">
                  تحميل
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        </b-col>
        <b-col v-else>
           <h1 class="text-center"> لا يوجد آي إذن صرف </h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h1 class="text-right"><b>تحميل سياره مرتجعه</b></h1>
        </b-col>
      </b-row>
            <b-row style="padding-top: 40px;">
        <b-col v-if="all_returned.length > 0">
          <b-table-simple sticky-header small responsive class="text-center">
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>رقم الأذن</b-th>
              <b-th>تاريخ الإذن</b-th>
              <b-th>اسم العميل</b-th>
              <b-th>اسم السائق</b-th>
              <b-th>رقم السياره</b-th>
              <b-th>وزن السياره</b-th>
              <b-th>عمليه</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr variant="light" v-for="(item,index) in all_returned" :key="index">
              <b-td stacked-heading="ID" style="font-family: Tahoma">
                {{ item.request_number }}
              </b-td>
              <b-td stacked-heading="Barcode"  style="font-family: Tahoma">
                {{ curDate(item.created_at) }}
              </b-td>
              <b-td>
               {{ item.client_name }}
              </b-td>
              <b-td>
                {{ item.truck_pilot_name }}
              </b-td>
              <b-td class="font">
               {{ item.truck_plates }}
              </b-td>
              <b-td class="font">
               {{ item.truck_weight_before }}
              </b-td>
              <b-td>
                <b-button varient="info" @click="$router.push(`/barcode/fill_truck/${item.request_number}`)">
                  تحميل
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        </b-col>
      </b-row>
    </b-container>
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
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {

  name: 'Index',

  data() {
    return {
     all_loading: [],
     all_returned: [],
      show1: false
    };
  },
  created(){
     this.show1 = true
    axios({
      url: `${process.env.VUE_APP_URL}/exports/get_loading`,
      method: 'GET'
    }).then(response=>{
      this.all_loading = response.data
       axios({
      url: `${process.env.VUE_APP_URL}/exports/get_all_finished/Returned`,
      method: 'GET'
    }).then(response=>{
      this.all_returned = response.data
       this.show1 = false
    })
       this.show1 = false
    })
  },
  methods:{
    curDate(cDate){
      return moment(cDate).format('YYYY-MM-DD')
    }
  }
};
</script>

<style lang="css" scoped>
.font{
  font-family: tahoma;
}
</style>
