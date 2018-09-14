var roundListBar = {
	selectedIndex:0,
	lastIndex:0,
	screenCenter:0,
	inited:false,
	roundListItems:null,
	container:null,
	onScroll:function(){
		this.updateItemStyle();
		if(this.selectedIndex == this.lastIndex)
			return;
        for(var i = 0 ; i < this.roundListItems.length; i++) {
        	this.roundListItems[i].setAttribute("class", "roundList");
        }
        this.roundListItems[this.selectedIndex].setAttribute("class", "roundList activated");
        this.lastIndex = this.selectedIndex;
	},
	resetSelectedIndex:function(){
		for(var i = 0 ; i < this.roundListItems.length; i++){
			if(this.objectIsAtCenterX(this.roundListItems[i])) {
                this.selectedIndex = i;
                return;
            }
		}
	},
	updateItemStyle:function () {
		this.resetSelectedIndex();
    },
    init:function(){
		if(this.inited)
			return;
        this.screenCenter = document.documentElement.clientWidth / 2;
        this.roundListItems = document.getElementsByName("roundListItem");
        this.container = document.getElementById("roundlist");
        this.inited = true;
	},
	objectIsAtCenterX:function(item){
		var x = this.getAbsoluteX(item);
        if(x > this.screenCenter)
            return false;
        if(x + item.offsetWidth < this.screenCenter)
            return false;
        return true;
	},
    getAbsoluteX:function(element)
	{
		return element.offsetLeft - this.container.scrollLeft;
	}
}