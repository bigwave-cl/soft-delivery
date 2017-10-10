<template>
	<div class="ask-grade-card">
		<div class="title">{{grade.title}}</div>
		<ul class="grade-item">
			<template v-for="(item,$i) in grade.items">
				<li class="grade-li" :class="{active:item.choose}" :key="$i">
					<ask-button @ask-click="changeState($i)">
						<span class="button-text">
							{{item.name}}
						</span>
					</ask-button>
				</li>
			</template>
		</ul>
	</div>
</template>
<style src="./grade-card.scss" lang="scss"></style>
<script>
	export default{
		name:'gradeCard',
		inject:['rootChildren'],
		props:{
			grade:{
				type: Object,
				default:{}
			}
		},
		methods:{
			changeState(index){
				this.rootChildren.changeState(this.grade,index);
			}
		}
	}
</script>