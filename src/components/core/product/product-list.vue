<template>
	<div class="product boundary">
		<template v-for="product in products">
			<!-- <product-item :product="product"></product-item> -->
			<div>{{product.name}}</div>
		</template>
	</div>
</template>

<script>
	export default{
		name:"product-list",
		created(){
			if(this.products.length == 0){
				this.$store.dispatch('allProducts');
			}
		},
		computed:{
			products(){
				return this.$store.getters.allProducts;
			}
		}
	}
</script>