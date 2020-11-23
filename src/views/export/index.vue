<template>
	<div>
		<b-container style="padding-top: 125px;">
			<b-row>
				<b-col class="text-center">
					<h1>
						<b>ميزان باسكول سيارة</b>
					</h1>
				</b-col>
			</b-row>
		</b-container>
<b-container style="padding-top:100px;">
      <b-row>
        <b-col class="droid-arabic-kufi text-center">
          <b-button-group >
            <b-button style="padding: 40px;" @click="$router.push('/export/create_request')"><span style="font-size: 30px;">فتح إذن دخول سيارة</span></b-button>
            <b-button style="padding: 40px;" @click="$router.push('/export/check_weight')"><span style="font-size: 30px;">فتح إذن خروج سيارة</span></b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>
	</div>
</template>

<script>

export default {

  name: 'indexExport',

  data() {
    return {
    };
  },
  methods:{

  },
  created(){
  }
};
</script>

<style lang="css" scoped>
</style>
