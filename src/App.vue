<template>
  <div id="app">
    <div id="nav" class="droid-arabic-kufi">
 <b-navbar toggleable="lg" type="dark" style="background-color: #343a40" >
    <b-navbar-toggle target="nav-collapse">
    </b-navbar-toggle>
     
    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="$router.history.current.path != '/Login'">
  <!--       <b-nav-item-dropdown text="اللغه">
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown right >
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
           <b-icon-gear style="margin-bottom:5px;"/>  الإعدادات  
          </template>
          <b-dropdown-item href="#" ><b-icon-person /> الملف الشحصى</b-dropdown-item>
          <b-dropdown-item href="#"><b-icon-door-closed />تسجيل الخروج</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item href="#" >
          <b-link to="/" style="text-decoration: none; color: white" @click="closePort()">
            <b><b-icon-house style="margin-bottom:5px;"/> الرئيسيه</b>
          </b-link>
        </b-nav-item>
        <!-- <b-nav-item href="#" >
          <b-link to="/import/open_request" style="text-decoration: none; color:white;">
            <b>اذن اضافه</b>
          </b-link>
        </b-nav-item> -->
      </b-navbar-nav>
    </b-collapse>
      <b-navbar-brand href="#" style="font-family: tahoma; padding-left: 10px; padding-right: 10px; border-radius: 5px; padding-bottom: 0px; color: black !important">
     <!--  <img src="/v.svg" width="25">
      <span style="color: black; font-size: 25px;">|</span> -->
       <b v-if="$router.history.current.path != '/'" style="font-family: 'Seven Segment' !important; font-size: 35px;"><span style="color: #dc3545 !important">-[ </span><b class="text-warning">BAR</b><b style="color: white;">CODA</b><span style="color: #dc3545 !important"> ]-</span></b>
        <span v-else style="color: white"> ALU AFRIC<img img width="50" style="padding: 10px;" src="/v.png"></span>
  </b-navbar-brand>
   <b-navbar-brand href="#" style="font-family: tahoma; padding-left: 10px; padding-right: 10px; border-radius: 5px; padding-bottom: 0px; color: white !important">
     <!--  <img src="/v.svg" width="25">
      <span style="color: black; font-size: 25px;">|</span> -->
      <b-icon-x-circle @click="closeApp" />
  </b-navbar-brand>

  </b-navbar>
    </div>
    <router-view style="flex: 1 0 auto; min-height: 82.2vh;" class="droid-arabic-kufi"/>
    <footer style="background-color: #343a40; bottom: 0;">
          <b-container class="text-center" style="padding: 20px;">
            <b-row  style="font-size: 20px; color: white;">
              <b-col>
                 <b>
              جميع حقوق الملكيه الفكريه محفوظه - <b style="font-family: tahoma">2020 BARCODA </b> © 
           </b>
              </b-col>
            </b-row>
          </b-container>
        </footer>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron';
export default {

  name: 'createExport',

  data() {
    return {};
  },
  methods:{
    closeApp(){
      ipcRenderer.send("close-app");
    },
    closePort(){
      ipcRenderer.send("closing");
    }
  },
  created(){
    console.log(process.env.VUE_APP_URL)
  }
};
</script>
<style>
#app {
  font-family: 'Droid Arabic Kufi', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.droid-arabic-kufi{font-family: 'Droid Arabic Kufi', serif;}
th, td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 0;
  font-size: 20px;
}
::-webkit-scrollbar{
  width: 10px;
}
::-webkit-scrollbar-track{
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb{
  background: #888;
}
::-webkit-scrollbar-thumb:hover{
  background: #555;
}
input[data-v-14c5279a] {
    font-family: 'Droid Arabic Kufi', serif !important;
}
</style>
