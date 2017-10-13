import {
	ajax,
	askDialogToast,
	sessionStorage,
	localStorage
} from '@/utils';

import router from '@/router';
import * as config from '@/config.js';

const baseURL = config.BASE_URL;
export class User{
	get user(){ return JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user')) || 'none'; }
	set user(value){
		this.del('user');
		sessionStorage.setItem('user',value);
	}

	get auth(){ return sessionStorage.getItem('auth') || 'none'};
	set auth(value){ 
		this.del('auth');
		sessionStorage.setItem('auth',value);
	}
	saveUser(value){
		this.del('user');
		localStorage.setItem('user',value);
	}
	login(opt){
		let option = {
			username: opt.user,
			password: opt.pass,
			method: 'web.login'
		}
		return this._ajax('post',option,opt.remember);
	}

	loginOut(){
		this.delLogin();
		router.push({path: '/login'});
	}

	del(payload){
		let pl = localStorage.getItem(payload);
		if(pl) localStorage.removeItem(payload);
		let ps = sessionStorage.getItem(payload);
		if(ps) sessionStorage.removeItem(payload);
	}
	delLogin(){
		let ps = sessionStorage.getItem('user');
		if(ps) sessionStorage.removeItem('user');
		this.del('auth');
	}

	_ajax(method,options,remember){
		options = options || {};
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				if(r.data.code != 1000) {
					askDialogToast({msg:r.data.message? r.data.message:'接口请求失败',time:2000,class:'danger'});
					return;
				}
				this.auth = r.data.data.access_token;
				this.user = `{"user":"${options.username}","pass":"${options.password}"}`;
				if(remember){
					this.saveUser(`{"user":"${options.username}","pass":"${options.password}"}`);
				}
			}
		});
	}
}

export class sideBar{
	getMenus(){
		const user = new User();
		return this._ajax('post',{"access_token":user.auth,"method":"web.getDepartment"});
	}
	_ajax(method,options){
		options = options || {};
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				if(r.data.code != 1000) {
					askDialogToast({msg:r.data.message? r.data.message:'接口请求失败',time:2000,class:'danger'});
					return;
				}
			}
		});
	}
}

export class Box{
	constructor(){
		this.page = 1;
		this.queryPage = 1;
	}
	getBox(did){
		const user = new User();
		let option = {
			"access_token":user.auth,
			"method":"web.userlist",
			"did": did,
			"page": this.page
		}

		this.page++;
		return this._ajax('post',option)
	}
	queryBox(nickname){
		const user = new User();
		let option = {
			"access_token":user.auth,
			"method":"web.userlist",
			"nickname": nickname,
			"page": this.queryPage
		}

		this.queryPage++;
		return this._ajax('post',option)
	}
	_ajax(method,options){
		options = options || {};
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				if(r.data.code != 1000) {
					askDialogToast({msg:r.data.message? r.data.message:'接口请求失败',time:2000,class:'danger'});
					return;
				}
			}
		});
	}
}

export class SetData{
	constructor(){
		this.goodHistoryPage = 1;
		this.recordPage = 1;
		this.lockTimePage = 1;
		this.lockAreaPage = 1;

		this.user = new User();
	}
	getBlockList(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"goods.list",
			"imei": imei
		}
		return this._ajax('post',options);
	}
	getGoodHistory(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"goods.his",
			"page" : this.goodHistoryPage,
			"imei": imei
		}
		this.goodHistoryPage++;
		return this._ajax('post',options);
	}
	getRecord(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"get.devicelog",
			"page" : this.recordPage,
			"imei": imei
		}
		this.recordPage++;
		return this._ajax('post',options);
	}
	getDevice(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"get.device",
			"imei": imei
		}
		return new Promise((resolve,reject)=>{
			this._ajax('post',options).then(r=>{
				let req = r;
				if(!req.data.data) reject('error');
				let newData = {};
				Object.keys(req.data.data).forEach((item) => {
					if(item.indexOf('set') != -1){
						newData[item] = req.data.data[item];
					}
				});
				req.data.data = newData;
				resolve(req);
			})
		});
	}
	setDevice(opt){
		let options = {
			"access_token":this.user.auth,
			"method":"set.device"
		}
		options = Object.assign(options,opt);
		return this._ajax('post',options);
	}

	getRemote(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"get.device",
			"imei": imei
		}
		return  new Promise((resolve,reject)=>{
			this._ajax('post',options).then(r=>{
				let req = r;
				if(!req.data.data) reject('error');
				let newData = {};
				Object.keys(req.data.data).forEach((item) => {
					if(item.indexOf('authorize') != -1){
						newData[item] = req.data.data[item];
					}
				});
				req.data.data = newData;
				resolve(req);
			})
		});
	}
	setRemote(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"device.authorize",
			"imei": imei
		}
		return this._ajax('post',options);
	}
	getManual(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"get.device",
			"imei": imei
		}
		return  new Promise((resolve,reject)=>{
			this._ajax('post',options).then(r=>{
				let req = r;
				if(!req.data.data) reject('error');
				let newData = {};
				Object.keys(req.data.data).forEach((item) => {
					if(item.indexOf('lock_man') != -1){
						newData[item] = req.data.data[item];
					}
				});
				req.data.data = newData;
				resolve(req);
			})
		});
	}
	setManual(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"device.lock",
			"imei": imei
		}
		return this._ajax('post',options);
	}

	getLockTime(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"device.timelimitlist",
			"page" : this.lockTimePage,
			"imei": imei
		}
		this.lockTimePage++;
		return this._ajax('post',options);
	}
	addLockTime(opt){
		let options = {
			"access_token":this.user.auth,
			"method":"device.timelimit"
		}
		options = Object.assign(options,opt);

		return this._ajax('post',options);
	}
	delLockTime(id){
		let options = {
			"access_token":this.user.auth,
			"method":"timelimit.del",
			"id":id
		}
		return this._ajax('post',options);
	}
	getLockArea(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"device.arealimitlist",
			"page" : this.lockAreaPage,
			"imei": imei
		}
		this.lockAreaPage++;
		return this._ajax('post',options);
	}
	
	addLockArea(opt){
		let options = {
			"access_token":this.user.auth,
			"method":"device.arealimit"
		}
		options = Object.assign(options,opt);

		return this._ajax('post',options);
	}
	delLockArea(id){
		let options = {
			"access_token":this.user.auth,
			"method":"arealimit.del",
			"id":id
		}
		return this._ajax('post',options);
	}
	getRealLocation(imei){
		let options = {
			"access_token":this.user.auth,
			"method":"device.now",
			"imei":imei
		}
		return this._ajax('post',options);
	}
	getAllLocation(opt){
		let options = {
			"access_token":this.user.auth,
			"method":"device.info"
		}
		options = Object.assign(options,opt);
		return this._ajax('post',options);
	}
	_ajax(method,options){
		options = options || {};
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				if(r.data.code != 1000) {
					askDialogToast({msg:r.data.message? r.data.message:'接口请求失败',time:2000,class:'danger'});
					return;
				}
			}
		});
	}
}