$(function () {
    new Vue({
        el: '#page_myplayercard',
        data: {
            cardlist: {
                current: 'unopened',
                unopened: null,
                unused: null,
                used: null
            },
            opencard: {
                status: -1,//-1：非拆卡状态；0：选择拆卡方式；1：显示拆卡结果
                level: null,
                count: null,
                result: null
            }
        },
        methods: {
            //获取球员卡列表
            getCardList: function (cardStatus) {
                var _self = this;
                _self.cardlist.current = cardStatus;
                var cardType = 0;
                if (cardStatus === 'unused') {
                    cardType = 1;
                } else if (cardStatus === 'used') {
                    cardType = 2;
                }
                callapi("WorldCup/GetMyPlayerCard", { type: cardType }, "", function (data) {
                    if (cardType == 0) {
                        _self.cardlist.unopened = data.Data;
                    } else if (cardType == 1) {
                        _self.cardlist.unused = data.Data;
                    } else {
                        _self.cardlist.used = data.Data;
                    }
                });
            },
            //显示拆卡提示信息弹窗
            showOpenCard: function (level, count) {
                var _self = this;
                _self.opencard.level = level;
                _self.opencard.count = count;
                //如果是1张，则直接拆开
                if (count === 1) {
                    _self.openCard(level, count);
                } else {
                    //设置拆开提示信息弹窗可见
                    _self.opencard.status = 0;
                }
            },
            //关闭拆开结果
            closeOpenCardResult: function () {
                var _self = this;
                //隐藏拆开结果弹窗
                _self.opencard.status = -1;
                //刷新未拆开球员卡列表
                //_self.cardlist.current = 'unopended';
                _self.getCardList(_self.cardlist.current);
            },
            //抽卡
            jumpDrawCard: function () {
                var action = '{ "ActionType": "activity", "ActionValue": "turntable","Parameters":null }';
                NativeJump(action);
            },
            //拆开球员卡
            openCard: function (level, count) {
                var _self = this;
                callapi("WorldCup/OpenMyPlayerCard", { level: level, count: count }, "", function (data) {
                    //显示拆开结果
                    _self.opencard.result = data.Data;
                    _self.opencard.status = 1;
                    console.log(data.Data);
                    //this.getCardList(0);
                });
            },
        },
        compiled: function () {
            this.getCardList(this.cardlist.current);
        }
    })
});