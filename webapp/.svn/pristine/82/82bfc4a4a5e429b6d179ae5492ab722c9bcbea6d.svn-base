var navigationSwitcher = {
    navigationItems:null,
    sectionItems:null,
    sectionEventsArr:null,
    init:function(navigations,sections,sectionEventsArr){
        this.navigationItems = navigations;
        this.sectionItems = sections;
        this.sectionEventsArr = sectionEventsArr;
        this.bindingEvents();
    },
    bindingEvents:function () {
        this.navigationItems.forEach(function(val,index){
            val.addEventListener('click',function(){
                navigationSwitcher.unselectAll();
                var sectionName = val.getAttribute("section-name");
                navigationSwitcher.navigationItems[index].classList.add("activated");
                navigationSwitcher.showSectionByName(sectionName);
                if(navigationSwitcher.sectionEventsArr == null)
                    return;
                if(navigationSwitcher.sectionEventsArr.length < length + 1)
                    return;
                if(navigationSwitcher.sectionEventsArr[index] == null)
                    return;
                navigationSwitcher.sectionEventsArr[index]();
            });
        });
    },
    showSectionByName:function(secName){
        this.sectionItems.forEach(function(val){
           if(val.getAttribute("name") == secName) {
               val.style.display="block";
               return;
           }
        });
    },
    unselectAll:function(){
        this.navigationItems.forEach(function(val) {
            val.classList.remove("activated");
        });
        this.sectionItems.forEach(function(val) {
            val.style.display="none";
        });
    }
}