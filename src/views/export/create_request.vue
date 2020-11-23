<template>
	<div>
		<b-container style="padding-top: 100px;">
          <b-row>
        <b-col class="text-right">
          <h3><b>إذن دخول سياره</b></h3>
        </b-col>
        <b-col class="text-left">
           <b-button variant="dark" class="mb-2" @click="$router.push('/export/')">
            رجوع <b-icon icon="arrow-left"  aria-hidden="true"></b-icon>
          </b-button>
        </b-col>
      </b-row>
		</b-container>
		<b-container style="padding: 50px;">
        <b-row class="text-center">
          <b-col>
            <h5 v-if="app != null" class="text-right">اذن رقم : <b class="text-danger"  style="font-family: tahoma">E-{{app.exports_requests + 1}}</b></h5>
          </b-col>
          <b-col>
             <h5 class="text-right">الميزان : <b :class="[portStatus ? 'text-success':'text-danger']">{{ portStatus ? 'متصل' : 'غير متصل'  }} <b-icon-emoji-dizzy v-if="!portStatus"/> <b-icon-emoji-smile v-if="portStatus"/></b></h5>
          </b-col>
          <b-col>
            <h5 class="text-right">التاريخ :  <b-badge variant="info"> <b class=""  style="font-family: tahoma">{{ curDate }}</b></b-badge></h5>
          </b-col>
        </b-row>
        <hr class="my-4">
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
      <b-container style="padding-top: 10px;">
      	<b-row>
      		<b-col sm="8">
      			<b-form style="padding-top: 20px;" @reset="onReset">
        <b-container class="">
          <b-row>
            <b-col sm="12" lg="6">
                <b-form-input v-model="form.truck_pilot_name" list="input-list" id="input-with-list" placeholder="اسم السائق"></b-form-input>
            </b-col>
            <b-col sm="12" lg="6">
              <b-form-input v-model="form.truck_plates" list="input-list" placeholder="رقم السيارة" id="input-with-list"></b-form-input>
            </b-col>
          </b-row>
           <b-row style="padding-top: 10px;">
            <b-col sm="12" lg="6">
                <b-form-input v-model="form.client_name" list="input-list" id="input-with-list" placeholder="اسم العميل"></b-form-input>
            </b-col>
            <b-col sm="12" lg="6">
              <b-button variant="dark" style="width:100%;" @click="onSubmit">
               <b-icon-check /> <b>فتح إذن</b>
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
      		</b-col>
     <b-col sm="4">
      <b-row style=" background-color: white; border-top-right-radius: 15px; border-top-left-radius: 15px;">
        <b-col  class="text-center">
          <h3>
           <b-col style="font-size:40px; padding: 0px !important">
      			<b-icon-truck-flatbed style="padding: 0px !important;" :class="[test > 0 ? 'text-success':'text-danger']" />
      		</b-col>
          </h3>
        </b-col>
      </b-row>
      <b-row style=" background-color: white; border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;">
        <b-col>
          <b-button disabled variant="dark" style="width:100%">
                <span>
                	<b-col style="padding: 0px !important;" v-if="test != null">
                		<b class="text-center"> <span style=" font-family: 'Segment7Standard' !important; font-size:30px; color: lime;">{{ test }}</span> <span style="font-size: 20px;">كم</span></b>
                	</b-col>
                  <b-col style="padding: 0px !important;" v-else>
                    <b style=" font-size:20px;" class="text-center text-danger">غير متصل</b>
                  </b-col>
                </span>
        </b-button>
        </b-col>
      </b-row>
     </b-col>
     </b-row>

      </b-container>
	</div>
</template>

<script>
import { ipcRenderer } from 'electron';
import axios from 'axios'
import moment from 'moment'
export default {

  name: 'createExport',

  data() {
    return {
    form : {
      truck_plates: '',
      truck_pilot_name: '',
      truck_weight_before: 0,
      client_name: ''
    },
    ports: [],
    selected: '',
    selecFlag: false,
    portStatus: false,
    app: null,
    test: null
    };
  },
  methods:{
  	onSubmit () {
      axios({
        url: `${process.env.VUE_APP_URL}/exports/create`,
        method:'POST',
        data: {
              truck_plates: this.form.truck_plates,
              truck_pilot_name: this.form.truck_pilot_name,
              truck_weight_before: this.form.truck_weight_before,
              client_name: this.form.client_name
            }
      }).then(response=>{ //eslint-disable-line
        this.form = {
          truck_plates: '',
          truck_pilot_name: '',
          truck_weight_before: 0,
          client_name: ''
          }
         axios({
      url: `${process.env.VUE_APP_URL}/app/retrieve`,
      method: 'GET',
      params: {app_name: 'Aluafric'}
     }).then(response=>{
      this.app = response.data
     })
     this.$router.push('/export/')
      }).catch(err =>{
        this.$bvToast.toast(`Error: ${err}`, {
          title: `Export Faild!`,
          variant: 'danger',
          solid: true
        })
      })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    selectPort(){
 if (this.selected) {
                this.selecFlag = false
                ipcRenderer.send("channel1", this.selected);
                ipcRenderer.on("channel1", (e, data) => {
                    if (data != null) {
                        if (!isNaN(data)) {
                            this.form.truck_weight_before = parseFloat(Number(data))
                            this.test = parseFloat(Number(data))
                        }
                        this.portStatus = true
                    } else {
                      this.form.truck_weight_before = null
                        this.portStatus = false
                    }
                });
            } else {
                this.selecFlag = true
            }
    }
  },
  created(){
  	 ipcRenderer.send("channel2", "open dialog to getFiles from user");
   	 ipcRenderer.on("channel2", (e, data)=>{
      this.ports = data
    })
    axios({
      url: `${process.env.VUE_APP_URL}/app/retrieve`,
      method: 'GET',
      params: {app_name: 'Aluafric'}
     }).then(response=>{
      this.app = response.data
     })
  },
  computed: {
    curDate(){
      return moment().format('YYYY-MM-DD')
    }
  }
};
</script>

<style lang="css" scoped>
.bottom {
   position: absolute;
   bottom: 0;
   left: 0;
}
</style>
