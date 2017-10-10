<template>
	<transition name="drop-list-show">
		<ul class="ask-drop-list">
			<template v-for="(item,$i) in list">
				<li class="once" :key="$i">
					<template v-if="item.link">
						<router-link :to="item.link">
							<ask-button>
								<span :text="item.name" class="button-text">
									<i class="iconfont" :class="[item.icon?item.icon:'one']"></i>
									{{item.name}}
								</span>
							</ask-button>
						</router-link>
					</template>
					<template v-else>
						<ask-button>
							<span :text="item.name" class="button-text">
								<i class="iconfont" :class="[item.icon?item.icon:'one']"></i>
								{{item.name}}
							</span>
						</ask-button>
					</template>
				</li>
			</template>
		</ul>
	</transition>
</template>
<script>
export default {
	name: 'drop-list',
	props: {
		list: {
			type: Array,
			default: []
		}
	}
}

</script>
