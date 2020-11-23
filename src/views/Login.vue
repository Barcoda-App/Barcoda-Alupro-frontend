<template>
	<div>
     <b-container style="padding-top:50px;">
     	<b-row class="text-center">
     		<b-col>
     			<img src="bar.png" width="200">
     		</b-col>
     	</b-row>
     	<b-row class="text-center">
     		<b-col>
     			<h3>B A R C O D A</h3>
     		</b-col>
     	</b-row>
     	<!-- <b-row>
     		<b-col sm="6" offset-sm="3" style="text-align: center; padding:5px;">
     			<b>Barcode system</b> is a network of hardware and software, consisting primarily of mobile computers, printers, handheld scanners, infrastructure, and supporting software. Barcode systems are used to automate data collection where hand recording is neither timely or cost effective
     		</b-col>
     	</b-row> -->
     	<b-row style="padding-top: 20px;">
     		<b-col>
     				<b-form>
      <b-form-group
        id="input-group-1"
      >
        <b-col sm="6" offset-sm="3">
        	<b-form-input
          id="input-1"
          v-model="form.username"
          type="email"
          required
          placeholder="Username"
        ></b-form-input>
        </b-col>
      </b-form-group>
       <b-form-group
        id="input-group-2"
      >
      <b-col sm="6" offset-sm="3">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
    </b-col>
      </b-form-group>

      <b-col class="mx-auto" style="width: 200px;">
      	<b-button type="submit" @click="$router.push('/about')" style="width: 200px;;" variant="info">Login</b-button>
      </b-col>
    </b-form>
     		</b-col>
     	</b-row>
     </b-container>
	</div>
</template>

<script>
export default {

  name: 'login',

  data() {
    return {
      form: {
      	username: '',
      	password: ''
      }
    };
  },
};
</script>

<style lang="css" scoped>
</style>
