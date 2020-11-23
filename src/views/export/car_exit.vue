<template>
	<div>
		<b-container style="padding-top: 50px;">
			<b-row>
			<b-col class="text-center">
				<h1>إذن خروج سياره</h1>
			</b-col>
		        <b-col class="text-left">
		           <b-button variant="dark" class="mb-2" @click="$router.push('/export/check_weight')">
		            رجوع <b-icon icon="arrow-left"  aria-hidden="true"></b-icon>
		          </b-button>
        </b-col>
			</b-row>
		</b-container>
		<b-container style="padding-left: 50px; padding-right: 50px; padding-top: 50px;" v-if="requestDetails != null">
			  <b-row class="bg-dark"  style="border-radius: 5px;">
		      	<b-col style="" class="text-center">
		      		        <b-row>
					          <b-col sm="8" class="text-center">
					          	<b-row>
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
					          </b-col>
					          <b-col sm="4" style="padding-bottom: 20px; padding-top: 20px; font-size: 30px;">
					          	<span class="text-white">فرق وزن</span>
		      		<span style="font-family: Tahoma"><b class="text-success" :class="[ requestDetails.truck_weight_after - test < 5 || requestDetails.truck_weight_after - test > -5 ? 'text-success' : 'text-danger' ]"> {{ requestDetails.truck_weight_after - test }}</b> <span class="text-white">كجم</span></span> 
					          </b-col>
					          <b-col sm="4" style="padding-bottom: 20px; padding-top: 20px; font-size: 30px;">
		      		                 <span class="text-white">غير متصل</span>
					          </b-col>
					        </b-row>
		      	</b-col>
		      </b-row>
		</b-container>
		<b-container style="padding-bottom: 50px;" v-if="requestDetails != null">
		      		      <b-row style="padding-top: 20px; background-color: white; border-top-right-radius: 15px; border-top-left-radius: 15px; height: 77%">
		        <b-col class="text-center" sm="4">
		          <h3>
		           <b-col style="font-size: 90px; padding: 0px !important">
		      			<b-icon-person style="padding: 0px !important;" class="text-dark" />
		      		</b-col>
		          </h3>
		          <h3>اسم السائق</h3>
		          <h3 style="font-family: Tahoma"><b class="text-primary">{{ requestDetails.truck_pilot_name }}</b></h3>
		        </b-col>
		       <b-col class="text-center" sm="4">
		          <h3>
		           <b-col style="font-size: 90px; padding: 0px !important">
		      			<b-icon-pip style="padding: 0px !important;" class="text-dark" />
		      		</b-col>
		          </h3>
		          <h3>رقم السيارة</h3>
		          <h3 style="font-family: Tahoma"><b class="text-primary">{{ requestDetails.truck_plates }}</b></h3> 
		        </b-col>
		           <b-col class="text-center" sm="4">
		          <h3>
		           <b-col style="font-size: 90px; padding: 0px !important">
		      			<b-icon-briefcase style="padding: 0px !important;" class="text-dark" />
		      		</b-col>
		          </h3>
		          <h3>اسم العميل</h3>
		          <h3 style="font-family: Tahoma"><b class="text-primary">{{ requestDetails.client_name }}</b></h3> 
		        </b-col>
		      </b-row>
		      <hr>
		      			<b-row style="padding-top: 20px; background-color: white; border-top-right-radius: 15px; border-top-left-radius: 15px; height: 77%">
		        <b-col class="text-center" sm="4">
		          <h3>
		           <b-col style="font-size: 90px; padding: 0px !important">
		      			<b-icon-truck-flatbed style="padding: 0px !important;" class="text-dark" />
		      		</b-col>
		          </h3>
		          <h3>قبل التحميل</h3>
		          <h3 style="font-family: Tahoma"><b class="text-primary">{{ requestDetails.truck_weight_before }}</b> كم</h3>
		        </b-col>
		        <b-col class="text-center" sm="4">
		        	<h3>
		        		<b-col style="font-size: 90px; padding: 0px !important;">
		        			<b-icon-grid3x2-gap style="padding: 0px !important;"/>
		        			<h3>صافى حموله</h3>
		        			<h3 style="font-family: Tahoma"><b class="text-primary">{{ totalWeightOnCar }}</b> كم</h3>
		        		</b-col>
		        	</h3>
		        </b-col>
		           <b-col class="text-center" sm="4">
		          <h3>
		           <b-col style="font-size: 90px; padding: 0px !important">
		      			<b-icon-truck style="padding: 0px !important;" class="text-primary" />
		      		</b-col>
		          </h3>
		          <h3>المتوقع بعد التحميل</h3>
		          <h3 style="font-family: Tahoma"><b class="text-primary">{{ requestDetails.truck_weight_after }}</b> كم</h3> 
		        </b-col>
		      </b-row>
		      <b-row>
		      	<b-col style="padding-left: 40px; padding-right: 40px; padding-top: 10px;">
		      		<b-button @click="carExit" style="width: 100%; height: 50px;" class="bg-success"><b-icon-check2 style="margin-bottom: 3px;" />  تم الوزن</b-button>
		      	</b-col>
		      </b-row>
		</b-container>
	</div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import { ipcRenderer } from 'electron';
export default {

  name: 'car_exit',

  data() {
    return {
     requestDetails: null,
     ports: [],
     selected: '',
     selecFlag: false,
     portStatus: false,
     test: null,
     totalWeightOnCar: null
    };
  },
  methods:{
  	selectPort(){
     if(this.selected){
            this.selecFlag = false
            ipcRenderer.send("channel1", this.selected);
      ipcRenderer.on("channel1", (e, data) => {
       if(data != null){
        if(!isNaN(data)){
          this.test = parseFloat(Number(data))
        }
         this.portStatus = true
     }else{
     	this.test = null
      this.portStatus = false
     }
    });
    }else{
      this.selecFlag = true
    }
    },
    carExit(){
      axios({
        url: `${process.env.VUE_APP_URL}/exports/exported/${this.requestDetails.request_number}`,
        method: 'PUT',
      }).then(response =>{ //eslint-disable-line
        this.$router.push('/export/check_weight')
      })
    }
  },
  created(){
  	 ipcRenderer.send("channel2", "open dialog to getFiles from user");
   	 ipcRenderer.on("channel2", (e, data)=>{
      this.ports = data
    })
  	 axios({
      url: `${process.env.VUE_APP_URL}/exports/get_loading_by_number/`,
      method:'GET',
      params:{request_number : this.$route.params.id}
    }).then(response=>{
      this.requestDetails = response.data
      let data = response.data.cargo
      const totalWeight = _.sumBy( _.map(data, 'weight'))
      this.totalWeightOnCar = totalWeight
    })
  }
};
</script>

<style lang="css" scoped>
</style>
