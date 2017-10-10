<template>
	<div class="set-tab-title">
		<ul class="bar-list" >
			<template v-for="(item,$i) in list">
				<li class="bar-li" :class="{active: rootChildren.defaultActive == item.index && list.length!=1}" :key="$i"> 
					<ask-button :text="item.name" @ask-click="changeContent(item)"></ask-button>
				</li>
			</template>
		</ul>
		<!-- 交互list -->
		<ul class="mutual-list">
			<li>
				<slot name="abnormal"></slot>
			</li>
		</ul>
	</div>
</template>
<style src="./set-tab-title.scss" lang="scss"></style>
<script>
	export default{
		inject:['rootChildren'],
		props:{
			list:{
				type:Array,
				default: []
			}
		},
		methods:{
			changeContent(item){
				this.rootChildren.changeContent(item);
			}
		}
	}
</script>