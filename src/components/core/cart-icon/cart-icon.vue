<template>
	<router-link to="/cart">
		Cart({{cartNum}})
	</router-link>
</template>
<script>
	export default{
		computed:{
			cartNum(){
				return this.$store.state.cart.length;
			}
		}
	}
</script>