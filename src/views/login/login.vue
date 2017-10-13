<template>
	<div class="ask-login">
		<div class="ask-login-overlay">
			<img src="~@/assets/login_bg.png" alt="登录背景图">
		</div>
		<div class="ask-login-content">
			<div class="ask-login-box">
				<div class="alb-icon">
					<img src="~@/assets/icon_login.png" alt="登录图标">
				</div>
				<div class="alb-form">
					<div class="ask-input-box">
						<input type="text" placeholder="请输入用户名" name="" id="username" v-model="model.user">
						<label for="username"><i class="iconfont icon-zhanghao"></i></label>
					</div>
					<div class="ask-input-box">
						<input type="password" placeholder="请输入密码" name="" id="password" v-model="model.pass">
						<label for="password"><i class="iconfont icon-mima"></i></label>
					</div>
					<div class="ask-text-box">
						<div class="checkbox">
							<input type="checkbox" id="remember" v-model="model.remember">
							<label for="remember">记住密码</label>
						</div>
					</div>
					<div class="ask-button-box">
						<ask-button :text="'登录'" @ask-click="login"></ask-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style src="./login.scss" lang="scss"></style>
<script>
import { askDialogToast,localStorage } from '@/utils'
import { User } from '@/services';
	export default{
		name:'login',
		data(){
			return{
				model:{
					user:'',
					pass:'',
					remember: false
				}
			}
		},
		mounted(){
			this.getUserMessage();
		},
		methods:{
			login(){
				if(this.model.user == '') {
					askDialogToast({
						msg:'请输入用户名',
						time:2000,
						position:'top-center',
						class:'danger'
					});
					return;
				}
				if(this.model.pass == '') {
					askDialogToast({
						msg:'请输入密码',
						time:2000,
						position:'top-center',
						class:'danger'
					});
					return;
				}
				if(this.model.remember){
					this.cacheUserMessage();
				}
				const user = new User();
				user.login(this.model).then(()=>{
					if(this.$route.query.redirect){
						this.$router.push({path:this.$route.query.redirect})
					}else{
						this.$router.push({ name: 'index' });
					}
				});
			},
			cacheUserMessage(){
				let user = localStorage.getItem('user');
				if(user) localStorage.removeItem('user');
				localStorage.setItem('user',`{"user":"${this.model.user}","pass":"${this.model.pass}"}`);
			},
			getUserMessage(){
				const user = new User();
				if(user.user != 'none'){
					this.model.user = user.user.user;
					this.model.pass = user.user.pass;
					this.model.remember = true;
				}
			}
		}
	}
</script>