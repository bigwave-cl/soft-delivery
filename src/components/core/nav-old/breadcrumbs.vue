<template>
	<div class="breadcrumbs">
		<ul class="bc-items">
			<template v-for="(item,$i) in items">
				<li class="bc-item" :key="$i">
					<template v-if="items.length - 1 == $i">
						<span v-text="item.name"></span>
					</template>
					<template v-else>
						<router-link :to="item.link" v-text="item.name"></router-link>
					</template>
				</li>
			</template>
		</ul>
	</div>
</template>
<style src="./breadcrumbs.scss" lang="scss"></style>
<script>
	export default{
		name:'breadcrumbs',
		props:{
			items:{
				type:Array,
				default:[]
			}
		}
	}
</script>