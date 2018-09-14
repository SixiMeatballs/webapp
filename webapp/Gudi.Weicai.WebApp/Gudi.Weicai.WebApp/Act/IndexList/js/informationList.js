$(function () {
    new Vue({
        el: '#page_list',
        data: {
            inforTag: null,  //咨询标签
            inforList: null, //咨询列表
            currentTagId: null, 
            count: 5, //页数
            moreList: false,
        },
        methods: {
            //获取咨询标签
            getInformationTag: function () {
                var _self = this;
                callapi('/Information/GetTag', '', '', function (data) {
                    _self.inforTag = data.Data;
                    if (_self.inforTag != null && _self.inforTag.length > 0) {
                        _self.currentTagId = data.Data[0].InformationTagId; 
                    }
                });
            },

            //获取咨询列表
            getInformationList: function (id, keyword, count) {
                var _self = this;
                this.moreList = false;
                if (id > 0) {
                    _self.currentTagId = id;
                }
                if (_self.currentTagId != null || id == 0) {
                    var d = { tagId: id, keyword: keyword, pageOrder: 0, pageCount: count, };
                    callapi('/Information/GetInformationList', d, '', function (data) {
                        _self.inforList = data.Data;
                    });
                } else {
                    _self.inforList = null;
                } 
            },

            //获取滚动条当前的位置
            getScrollTop: function () {
	            var scrollTop = 0;
	            if(document.documentElement && document.documentElement.scrollTop) {
		            scrollTop = document.documentElement.scrollTop;
	            } else if(document.body) {
		            scrollTop = document.body.scrollTop;
	            }
	            return scrollTop;
            },
			
            //获取当前可视范围的高度  
            getClientHeight: function () {
	            var clientHeight = 0;
	            if(document.body.clientHeight && document.documentElement.clientHeight) {
		            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
	            } else {
		            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	            }
	            return clientHeight;
            },
			
            //获取文档完整的高度 
            getScrollHeight: function () {
	            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            },

            //展示列表
            showList: function () {
                var _self = this;
                this.moreList = !this.moreList;
            },

            //搜索
            search: function () {
                var _self = this; 
                var seaVlue = document.querySelector('input').value;
                _self.getInformationList(0, seaVlue, this.count);
            }
            
        },
        compiled: function () {
            var _self = this; 
            _self.getInformationTag();
            _self.getInformationList(this.currentTagId, '', this.count);
            //滚动事件触发
            window.onscroll = function () {
                if (_self.getScrollTop() + _self.getClientHeight() == _self.getScrollHeight()) {
                    console.log('下拉刷新' + _self.count);
                    _self.count += 10;
                    _self.getInformationList(_self.currentTagId, '', _self.count);
                }
            }
        }
    })
});

			

			
