const menu = {

  generateMenuStats: function(inner, title = null) {
    menu.generateMenuStats.innerText = inner;
    menu.generateMenuStats.titleText = title;
  },

  mineMenu: 
  [menu.generateMenuStats("Corn", "Not really"),
   menu.generateMenuStats("no", "Yes")],
  
  wuddleMenu: 
  [menu.generateMenuStats("Fredericksberg", "childish"),
   menu.generateMenuStats("Men", "Women")],

  //benchMenu:
  
};

