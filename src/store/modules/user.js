let obj = {
    namespaced: true,//命名空间
    state() {
        return {
            token:localStorage.getItem('pc-token')
        }
    },
    // 同步方法token
    mutations:{
        set(state,val){
            state.token = val
            localStorage.setItem('pc-token',val)
        }
    }

}

export default obj