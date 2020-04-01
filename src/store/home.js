import { getHomeGoods } from "@/network/home";
export default {
    state: {
        name: 'vuexforhomepagemodule',
        recommendData: {
            activeItem: "sell",
            sell: { page: 0, list: [] },
            new: { page: 0, list: [] },
            pop: { page: 0, list: [] }
        },
        activeIndex:0
    },
    getters: {
        getActiveRecommend: state => state.recommendData[state.recommendData.activeItem].list

    },
    actions: {
        updateRecommendData(context, payload) {
            // console.log(typeof payload);
            if (typeof payload == 'string' && context.state.recommendData[payload].page != 0) {
                // console.log(123123);
                context.commit('updateRecommendData', payload);
                //此处意为单纯切换页面不做数据请求
            } else if (typeof payload == 'object') {
                //此处为传入为对象，根据对象的type和page发送请求并更新数据
                // console.log(222222);

                getHomeGoods(payload.type, payload.page + 1).then(data => {
                    context.commit('updateRecommendData', data)
                })
            } else {
                getHomeGoods(payload, 1).then(data => {
                    //这里丑了点 做了两个操作 一个是无数据的active切换 另一个是单纯的请求数据
                    // console.log('切换页面 并且无数据');
                    context.commit('updateRecommendData', data)
                    context.commit('updateRecommendData', payload)

                })
            }

            // console.log('type = '+ payload.type);
            // console.log('page =' + payload.page);


        },


        pulltoUpdate(context, payload) {
            //console.log('ready to commit');
            getHomeGoods(payload.type, payload.page + 1).then(data => {
                context.commit('updateRecommendData', data);
            })

        }

    },
    mutations: {
        updateRecommendData: (state, data) => {
            //console.log(typeof data);
            if (typeof data.data != 'undefined') {
                //console.log('收到了请求数据，准备更新vuex');

                state.recommendData[data.data.sort].page = data.data.page;
                state.recommendData[data.data.sort].list.push(...data.data.list);
            }
            if (typeof data == 'string') {
                //console.log(data + '这个数据仅用来更新activeitem');

                state.recommendData.activeItem = data;
            }
            
        },
        changeIndex: (state,data) =>{
            state.activeIndex = data
        }
    },
    modules: {

    }
}