<template>
  <div class="home text-center" style="background-color: #343a40; padding-top: 10px;">
    <img alt="Vue logo" src="../assets/bar.png" width="150">
 <h1 style="font-family: 'Seven Segment' !important; font-size: 55px; color: black"><span style="color: #dc3545 !important">-[ </span><b class="text-warning">BAR</b><b style="color: white;">CODA</b><span style="color: #dc3545 !important"> ]-</span></h1>
    <b-container style="padding-top:100px;">
  <b-row style="padding-top: 10px;" class="text-center">
        <b-col>
            <b-form>
              <b-form-group
                id="input-group-1"
                class="text-center"
              >
                <b-col class="text-center">
                  <b-form-input
                  id="input-1"
                  class="text-center"
                  v-model="form.username"
                  type="email"
                  :state="validationUsername"
                  placeholder="اسم المستخدم"
                ></b-form-input>
                 <b-form-invalid-feedback :state="validationPassword">
                        يرجى ادخال اسم المستخدم
                      </b-form-invalid-feedback>
                      <b-form-valid-feedback :state="validationPassword">
                           
                        </b-form-valid-feedback>
                </b-col>
              </b-form-group>
               <b-form-group
                id="input-group-2"
                class="text-center"
              >
                  <b-col class="text-center">
                    <b-form-input
                      id="input-2"
                      class="text-center"
                      v-model="form.password"
                      type="password"
                      :state="validationPassword"
                      placeholder="كلمه السر"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="validationPassword">
                        يرجى ادخال كلمه السر
                      </b-form-invalid-feedback>
                      <b-form-valid-feedback :state="validationPassword">
                           
                        </b-form-valid-feedback>
                 </b-col>
              </b-form-group>

              <b-col class="mx-auto" style="width: 200px;">
                <b-button @click="login" style="width: 200px;;" variant="danger">تسجيل دخول</b-button>
              </b-col>
            </b-form>
        </b-col>
      </b-row>
    </b-container>
   
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
     form: {
       username: '',
      password: ''
     }
    }
  },
  methods:{
    login(){
        if(this.form.username != '' || this.form.password != ''){
            if(this.form.username == 'tg01' && this.form.password == 'tg1234'){
                  this.$router.push('/import/open_request')
            } else if(this.form.username == 'bs01' && this.form.password == 'bs1234'){
                 this.$router.push('/export/')
            }else if(this.form.username == 'th01' && this.form.password == 'th1234'){
                this.$router.push('/barcode/export_barcode')
            }else{
              this.$bvToast.toast(`اسم المستخدم / كلمه السر خطا`, {
                    title: `حدث خطأ`,
                    variant: 'danger',
                    solid: true
                })
            }
        }else{
           this.$bvToast.toast(`يرجي ادخال اسم المستخدم و كلمه السر`, {
                    title: `حدث خطأ`,
                    variant: 'danger',
                    solid: true
                })
        }
    }
  },
  computed:{
    validationUsername() {
        return this.form.username.length > 0
      },
      validationPassword() {
        return this.form.password.length > 0
      }
  },
  created(){
  }
}
</script>
<style>
.droid-arabic-kufi{font-family: 'Droid Arabic Kufi', serif;}
</style>
