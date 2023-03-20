import authorize from '../../authorize';
export default {
    actions: {
        gettingAuthUser({ commit, state, rootState }) {
            if (!rootState.auth) return;
            return new Promise((resolve, reject) => {
                authorize('api/user')
                    .then(res => {
                        res.data ? rootState.authUser = res.data : rootState.authUser = null;
                        resolve(res.data);
                    })
                    .catch(err => reject(rootState.authUser = null))
            })
        }
    }
}