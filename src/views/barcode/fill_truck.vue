<template>
	<div class="droid-arabic-kufi">
      <b-overlay :show="show1" rounded="sm">
		<b-container style="padding-top: 40px;">
       <b-row v-if="requestDetails != null">
          <b-col sm="12" md="3">
            <h5 class="text-right">إذن رقم : <b-badge variant="danger"> <b class=""  style="font-family: tahoma">{{ requestDetails.request_number }}</b></b-badge></h5>
          </b-col>
          <b-col sm="12" md="3">
            <h5 class="text-right"><b-icon-person style="color: #263238"/>اسم العميل : <b class="text-primary">
               <b>{{ requestDetails.client_name }} </b>  
            </b>
          </h5>
          </b-col>
          <b-col sm="12" md="3">
            <h5 class="text-right"><b-icon-truck/> اسم السائق : <b>{{ requestDetails.truck_pilot_name }}</b></h5>
          </b-col>
          <b-col sm="12" md="3">
            <h5 class="text-right">التاريخ :  <b-badge variant="info"> <b class=""  style="font-family: tahoma">{{ curDate }}</b></b-badge></h5>
          </b-col>
        </b-row>
          <hr class="my-4">
     <b-row style="padding-top: 25px;">
       <b-col sm="12" md="6">
         <b-row>
           <b-col sm="8" md="8">
         <b-form-input
         class="droid-arabic-kufi"
          v-model="barcode"
          v-on:keyup.enter="barcoda"
          required
          placeholder=" صرف باركود"
        ></b-form-input>
       </b-col>
       <b-col sm="4" md="4">
         <b-btn @click="barcoda" style="padding-top: 2px; padding-bottom: 2px; width: 100%;">
          <b-row>
            <b-col style="margin-top: 5px;"><span >صرف</span></b-col>
            <b-col><b-img src="/bar.png" width="30"/></b-col>
          </b-row>
        </b-btn>
       </b-col>
         </b-row>
         <b-row style="padding-top: 10px;">
           <b-col sm="8" md="8">
         <b-form-input
         class="droid-arabic-kufi"
          v-model="deleteBar"
          required
          placeholder="حذف باركود"
        ></b-form-input>
       </b-col>
       <b-col sm="4" md="4">
         <b-btn @click="barcodaDelete" variant="danger" style="padding-top: 2px; padding-bottom: 2px; width: 100%;">
          <b-row>
            <b-col style="margin-top: 5px;"><span >حذف</span></b-col>
            <b-col><b-img src="/bar.png" width="30"/></b-col>
          </b-row>
        </b-btn>
       </b-col>
         </b-row>
         <b-row style="padding-top: 10px;" >
           <b-col sm="8" md="8">
             <b-form-textarea
              autofocus
              v-model="bartest"
              required
              rows="4"
              placeholder=" صرف مجموعه باركود"
            ></b-form-textarea>
           </b-col>
           <b-col sm="4" md="4">
             <b-btn @click="BulkIt" variant="warning" style="padding-top: 2px; padding-bottom: 2px; width: 100%; height: 100%;">
              <b-row>
            <b-col style="margin-top: 5px;"><span >مجموعه</span></b-col>
            <b-col><b-img src="/bar.png" width="30"/></b-col>
          </b-row>
            </b-btn>
           </b-col>
         </b-row>
       </b-col>
       <b-col  class="bg-dark" style="border-radius: 10px;">
         <b-row style="padding-top: 5px; border-top-right-radius: 15px; border-top-left-radius: 15px;" >
        <b-col  class="text-center" md="6" sm="12" >
          <h3 class="text-warning" style="padding-top: 10px;">
            <b>اجمالى الوزن</b>
          </h3>
          <h3 class="text-danger"  style="font-size: 35px;"><b style="color: lime; padding-top: 10px; font-family: 'Segment7Standard' !important;">{{ totalWeight.toFixed(2) }}</b><br><b class="droid-arabic-kufi" style=" font-size: 25px; color: white"> كجم</b> </h3>
        </b-col>
        <b-col class="text-center" md="6" sm="12">
          <h3 class="text-warning" style="padding-top: 10px;">
            <b>اجمالى العدد</b>
          </h3>
          <h3 class="text-danger" ><b style="padding-top: 10px; font-family: 'Segment7Standard' !important; font-size: 35px;">{{ totalCount }}</b><br><b style="color: white;"> ربطه</b></h3>
        </b-col>
      </b-row>
       <b-row style="padding-bottom: 20px; border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;">
        <b-col>
          <b-row>
            <b-col>
              <b-button @click="endRequest" variant="success" style="width:100%">
                <b>إنهاء التحميل</b><b-icon-stop-fill  animation="throb" style="color: white;" /> 
              </b-button>
            </b-col>
            <b-col>
              <b-button @click="emptyCargo" variant="info" style="width:100%">
                <b>مرتجع الكل </b><b-icon-cart  animation="throb" style="color: white;" /> 
              </b-button>
            </b-col>
                        <b-col>
              <b-button @click="goBack" variant="danger" style="width:100%">
                <b>تعليق الإذن</b><b-icon-exclamation-circle  animation="throb" style="color: white;" /> 
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
       </b-col>
     </b-row>
       <hr class="my-4">
    </b-container>
     <b-container style="padding-top: 50px;" v-if="all_barcodes.length > 0">
            <b-row>
            <b-col sm="12" md="8">
         <b-table-simple sticky-header small responsive class="text-center">
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>رقم</b-th>
              <b-th>باركود</b-th>
              <b-th>القطاع</b-th>
              <b-th>اللون</b-th>
              <b-th>العدد</b-th>
              <b-th>الطول</b-th>
              <b-th>نوع الانتاج</b-th>
              <b-th>الوزن</b-th>
              <b-th>حذف</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr variant="light" v-for="(items,indexs) in all_barcodes" :key="indexs">
              <b-th style="font-family: Tahoma">
                {{ indexs + 1 }}
              </b-th>
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
              <td>
                <b-btn style="font-size: 10px; padding-top: 2px; padding-bottom: 2px;" variant="danger" @click="removeFromList(indexs)"><b>حذف</b></b-btn>
              </td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
            </b-col>
        <b-col sm="12" md="4">
                   <b-table-simple sticky-header small responsive class="text-center">
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>القطاع</b-th>
              <b-th>اللون</b-th>
              <b-th>الطول</b-th>
              <b-th>العدد</b-th>
              <b-th>عدد الربط</b-th>
              <b-th>الوزن</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr variant="light" v-for="(item,index) in totalBarcodes" :key="index">
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
                {{ item.totalPacks }}
              </b-td>
              <b-td>
               {{ item.weight }}
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        </b-col>

            </b-row>
    </b-container>  
    <b-container v-else>
       <b-row>
         <b-col class="text-center" style="padding-top: 20px; font-size: 90px;">
           <h1>السيارة خاليه من آى حموله</h1>
           <b-icon-truck-flatbed />
         </b-col>
       </b-row>
    </b-container>
    <div id="printer" style="-webkit-print-color-adjust: exact !important;" v-if="showPrint">
      <div>
              <table style="width: 100%;">
        <tr >
          <td style="text-align: right; border: 0px !important;" >
              <h1>الافريقية لصناعة وتجارة الالومنيوم</h1>
          </td>
          <td style="text-align: center; border: 0px !important;" >
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTQ0LjAwMDAwMHB0IiBoZWlnaHQ9IjE0NC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDE0NC4wMDAwMDAgMTQ0LjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgcG90cmFjZSAxLjE2LCB3cml0dGVuIGJ5IFBldGVyIFNlbGluZ2VyIDIwMDEtMjAxOQo8L21ldGFkYXRhPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwxNDQuMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIgpmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiPgo8cGF0aCBkPSJNOCAxMDkzIGMxIC0xOTIgMyAtNDA1IDUgLTQ3NSBsMiAtMTI4IDMwMSA0NjMgMzAxIDQ2MiAxMjMgMyBjOTYgMgoxMjEgMCAxMTcgLTEwIC0yIC03IC0xOTMgLTMwMSAtNDIzIC02NTMgLTQwNCAtNjE4IC00MTggLTY0MiAtNDI0IC02OTggbC02Ci01NyA3MTggMCA3MTggMCAwIDcyMCAwIDcyMCAtNzE3IDAgLTcxOCAwIDMgLTM0N3ogbTE0MjIgLTQzIGwwIC04OSAtMzcgLTExCmMtMjEgLTYgLTE4MCAtNTEgLTM1MyAtOTggLTMwMSAtODQgLTMxNSAtODkgLTMxOCAtMTEyIC0xIC0xNCAxNyAtMTg0IDQxCi0zNzcgbDQzIC0zNTMgLTkxIDAgLTkxIDAgLTQzIDQyNyBjLTM3IDM1OCAtNDIgNDI4IC0zMCA0MzIgMjIgOCA4NjMgMjY5IDg3MgoyNzAgNCAxIDcgLTM5IDcgLTg5eiBtLTE0NiAtMzc5IGM5IC0zMCAxNiAtNTggMTYgLTYyIDAgLTggLTk4IC0zOSAtMTIyIC0zOQotMTYgMCAtNTQgMTE3IC00MyAxMjkgMTEgMTEgMTIwIDM5IDEyNyAzMiAzIC0zIDEzIC0zMCAyMiAtNjB6IG0tMjk5IC03NyBjOQotMzEgMTQgLTYyIDEyIC02OCAtNCAtOSAtOTQgLTM4IC0xMjYgLTQxIC01IDAgLTQwIDEyOSAtMzYgMTMzIDUgNiA5OCAzMCAxMTcKMzEgMTIgMSAyMSAtMTUgMzMgLTU1eiBtMTkwIC0xMDEgYzkgLTMyIDE4IC02MyAyMCAtNzAgNSAtMTQgLTEyNSAtNTcgLTEzNgotNDUgLTEyIDEyIC00MCAxMjQgLTM0IDEzMSA3IDcgMTAzIDM4IDEyMiA0MCA3IDEgMjAgLTI1IDI4IC01NnogbS0xMDUgLTIwNQpjNyAtMjYgMTAgLTUzIDcgLTYxIC01IC0xNCAtMTExIC00MiAtMTI1IC0zMyAtMTMgOCAtMzUgMTE3IC0yNSAxMjYgNCA1IDMzCjE1IDYzIDIzIDYyIDE1IDYwIDE2IDgwIC01NXoiLz4KPC9nPgo8L3N2Zz4K" width="50" />
          </td>
          <td style="text-align: center; border: 0px; padding: 0px;">
            <img src="data:image/png;base64,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
" width="70">
          </td>
        </tr>
      </table>
      </div>
      <div style="padding-top: 20px; padding-bottom: 20px;">
        <table style="width: 100%;">
        <tr>
          <td style="text-align: center; border: 0px !important;"> 
            <h6>إذن رقم : <b-badge variant="danger"> <b class=""  style="font-family: tahoma">{{ requestDetails.request_number }}</b></b-badge>
            </h6>
          </td>
          <td style="text-align: center; border: 0px !important;">
            <h6>التاريخ :  <b-badge variant="info"> <b class=""  style="font-family: tahoma">{{ curDate }}</b></b-badge></h6>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; border: 0px !important;">
             <h6><b-icon-person style="color: #263238"/>اسم العميل : <b class="text-primary">
               <b>{{ requestDetails.client_name }} </b>  
            </b>
          </h6>
          </td>
          <td style="text-align: center; border: 0px !important;">
             <h6><b-icon-truck/> اسم السائق : <b>{{ requestDetails.truck_pilot_name }}</b></h6>
          </td>
          <td style="text-align: center; border: 0px !important;">
            <h6>رقم السياره :  <b-badge variant="info"> <b class=""  style="font-family: tahoma">{{ requestDetails.truck_plates }}</b></b-badge></h6>
          </td>
        </tr>
      </table>
      </div>
      <div style="padding-top: 20px; padding-bottom: 20px;">
        <table style="width: 100%;">
        <tr>
          <td style="text-align: center; border: 0px !important;"> 
            <h4><b-icon-minecart-loaded style="color: #263238"/> صافى وزن : <b-badge variant="danger"> <b class=""  style="font-family: tahoma">{{ numbersWithCommas(totalWeight) }} كجم</b></b-badge>
            </h4>
          </td>
          <td style="text-align: center; border: 0px !important;">
             <h4><b-icon-digram3 style="color: #263238"/> إجمالى عدد : <b class="text-primary">
               <b>{{ totalCount }} ربطة </b>  
            </b>
          </h4>
          </td>
        </tr>
      </table>
      </div>
       <div style="height: 900px !important;">
          <table class="text-center" style="width: 100%;">
          <thead style="background-color: #343a40; color: white;">
            <tr>
              <th>القطاع</th>
              <th>اللون</th>
              <th>الطول</th>
              <th>العدد</th>
              <th>عدد الربط</th>
              <th>الوزن</th>
            </tr>
          </thead>
          <tbody>
            <tr variant="light" v-for="(item,index) in totalBarcodes" :key="index">
              <td>
                {{ item.code }}
              </td>
              <td>
                {{ item.color }}
              </td>
              <td>
                {{ item.length }}
              </td>
              <td>
                {{ item.count }}
              </td>
               <td>
                {{ item.totalPacks }}
              </td>
              <td>
               {{ numbersWithCommas(item.weight) }}
              </td>
            </tr>
          </tbody>
        </table>
       </div>
     <div style="padding-top: 20px; padding-bottom: 20px;">
        <table style="width: 100%;">
        <tr>
          <td style="text-align: right; border: 0px !important;"> 
            <h4><b-icon-pen style="color: #263238"/> ملاحظات
            </h4>
          </td>
          <td style="text-align: left; border: 0px !important;">
             <h4><b-icon-person style="color: #263238"/> توقيع المسؤول
          </h4>
          </td>
        </tr>
        <tr>
          <td style="text-align: right; border: 0px !important;"> 
            <h4>..............
            </h4>
          </td>
          <td style="text-align: left; border: 0px !important;">
             <h4>..............
          </h4>
          </td>
        </tr>
      </table>
      </div>
    </div>
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
import _ from 'lodash'
import moment from 'moment'
export default {

  name: 'Fill_truck',

  data() {
    return {
       barcode: '',
       bartest: '',
       showPrint: false,
       test: [],
       arr: [],
       all_barcodes : [],
       totalWeight: 0,
       totalCount: 0,
       totalBarcodes: [],
       deleteBar: '',
       requestDetails: null,
       error: null,
       arrs: [],
       show1: false
    };
  },
  methods:{
   barcoda(){
      // if(!this.arr.includes(this.barcode))
      //   this.arr.push(this.barcode)
      // this.barcode = ''
      if(!this.all_barcodes.map(e => {return e.barcode}).includes(this.barcode)){
        axios({
      url: `${process.env.VUE_APP_URL}/imports/retrieve/${this.barcode}`,
      method: 'GET',
     }).then(response=>{
      let x = response.data
      this.all_barcodes.push(x)
      this.totalWeight += x.weight
      this.totalCount ++
      this.generateTotal(this.all_barcodes)
           this.barcode = ''
     }).catch((error)=>{
      if(error.response.data == 'Exported'){
         this.$bvToast.toast(`المنتج تم صرفه من قبل`, {
          title: `حدث خطا`,
          variant: 'danger',
          solid: true
        })
      }else{
        this.$bvToast.toast(`المنتج غير موجود`, {
          title: `حدث خطا`,
          variant: 'danger',
          solid: true
        })
      }
         this.barcode = ''
     })
   }else{
    this.$bvToast.toast(`المنتج موجود بالفعل فى اختياراتك`, {
          title: `حدث خطأ`,
          variant: 'danger',
          solid: true
        })
         this.barcode = ''
   }
   },
   printReport(){
    this.showPrint = true
        setTimeout(()=>{
            const prtHtml = document.getElementById('printer').innerHTML;
              let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML;
            }
             const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
             WinPrint.document.write(`<!DOCTYPE html>
        <html>
          <head>
            ${stylesHtml}
          </head>
          <body>
          <div style="padding: 40px;">
                ${prtHtml}
            </div>
          </body>
          <style>
            @media print {
              body {-webkit-print-color-adjust: exact;}
              img { display: block;}
            @page {
                size:A4;
                margin-left: 0px;
                margin-right: 0px;
                margin-top: 0px;
                margin-bottom: 0px;
                margin: 0;
                -webkit-print-color-adjust: exact;
            }
            }
          </style>
        </html>`)
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
      this.$router.push('/barcode/export_barcode')

    },1000)
   },
    barcodaBulk(el){
      if(!this.all_barcodes.map(e => {return e.barcode}).includes(el)){
        axios({
      url: `${process.env.VUE_APP_URL}/imports/retrieve/${el}`,
      method: 'GET',
     }).then(response=>{
      let x = response.data
      this.all_barcodes.push(x)
      this.totalWeight += x.weight
      this.totalCount ++
      this.generateTotal(this.all_barcodes)
           this.barcode = ''
     })
   }
   this.bartest = ''
   },
   barcodaDelete(){
    if(this.all_barcodes.map(ev=>{return ev.barcode}).includes(this.deleteBar))
    {
     let Index = this.all_barcodes.map(e=> { return e.barcode}).indexOf(this.deleteBar)
     this.totalWeight = this.totalWeight - this.all_barcodes[Index].weight
      this.totalCount = this.totalCount - this.all_barcodes[Index].count
     this.all_barcodes.splice(Index,1)
      this.generateTotalWhenDelete(this.all_barcodes)
    }else{
       this.$bvToast.toast(`المنتج غير موجود بالفعل فى اختياراتك`, {
          title: `حدث خطأ`,
          variant: 'danger',
          solid: true
        })
    }
    this.barcode = ''
    this.deleteBar = ''
   },
   removeFromList(Index){
    this.totalWeight -=  this.all_barcodes[Index].weight
      this.totalCount --
     this.all_barcodes.splice(Index,1)
     this.generateTotalWhenDelete(this.all_barcodes)
   },
   generateTotal(data){
        const mapped = data.map(i => ({ ...i, key: `${i.code}${i.color}${i.length}` }))
        const unified = _.groupBy(mapped, 'key')
        const result = []
        Object.keys(unified).forEach(i => {
          let count = _.sumBy(unified[i], j => j.count)
          let weight = _.sumBy(unified[i], j => j.weight)
          let totalPacks = _.size(unified[i])
          result.push({ ...unified[i][0], count, weight, totalPacks })
        })
        this.totalBarcodes = result
    },
     generateTotalWhenDelete(data){
        const mapped = data.map(i => ({ ...i, key: `${i.code}${i.color}${i.length}` }))
        const unified = _.groupBy(mapped, 'key')
        const result = []
        Object.keys(unified).forEach(i => {
          let count = _.sumBy(unified[i], j => j.count)
          let weight = _.sumBy(unified[i], j => j.weight)
          result.push({ ...unified[i][0], count, weight })
        })
        this.totalBarcodes = result
    },
     endRequest(){
      this.show1 = true
      if(this.totalWeight > 0){
       axios({
        url: `${process.env.VUE_APP_URL}/exports/finish/`,
        method: 'PUT',
        params:{ request_number: this.requestDetails.request_number},
        data: { cargo: this.all_barcodes, total_weight: this.totalWeight }
      }).then(async response=>{
        response.data = null
         this.show1 = false
         this.showPrint = false
        await this.printReport()
      })
      }else{
         this.$bvToast.toast(`لا يمكن اغلاق الأذن بدون منتجات`, {
          title: `حدث خطأ`,
          variant: 'danger',
          solid: true
        })
         this.show1 = false
      }
    },
     numbersWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    emptyCargo(){
      if(this.all_barcodes.length > 0)
        {
          this.all_barcodes = []
          this.totalWeight = 0
          this.totalCount = 0
        }
    },
    goBack(){
      this.$router.push('/barcode/export_barcode')
    },
    BulkIt(){
      setTimeout(()=>{
        this.arrs = this.bartest.split(/\r?\n/).filter(e=>{ return e != ''})
        let temp = this.arrs
        let filterdArr = temp.filter((item, pos) => {
             return temp.indexOf(item) == pos;
        })
        for(let i=0; i<this.arrs.length; i++){
          this.barcodaBulk(filterdArr[i])
        }
      },300)
    }
  },
  created(){
    this.show1 = true
    axios({
      url: `${process.env.VUE_APP_URL}/exports/get_loading_by_number/`,
      method:'GET',
      params:{request_number : this.$route.params.id}
    }).then(response=>{
      let x = response.data.cargo
      this.requestDetails = response.data
      this.all_barcodes = response.data.cargo
      for (let i = 0; i < x.length; i++) {
           this.totalWeight += x[i].weight
           this.totalCount++
           this.generateTotal(this.all_barcodes)
      }
     this.show1 = false
    })
  },
  computed:{
     curDate(){
      return moment().format('YYYY-MM-DD')
    },
  }
};
</script>

<style lang="css" scoped>
.droid-arabic-kufi{font-family: 'Droid Arabic Kufi', serif;}
th, td {
  border:1px solid black;
  padding: 5px;
  font-size: 15px;
}
td{
  font-family: tahoma;
  font-size: 15px;
}
input{
  font-family: tahoma
}
</style>
