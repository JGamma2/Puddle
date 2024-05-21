const inventory = {
  dirt: 0,
  bricks: 0,
  beams: 0,
};

const menu = {

  currentMenu: "Blank",

  clearBorder: function(ID) {
    document.getElementById(ID).style.borderWidth = "0px";
  },

  renderMenu: function(menuType) {

    let menuBox = document.getElementById("menu");
    //Clears menu div of existing options.
    if (menuType.menuID.menuID !== menu.currentMenu) {
    while (menuBox.lastChild) {
      menuBox.removeChild(menuBox.lastChild);
    };
    
    menu.currentMenu = menuType.menuID.menuID;

    for (let option in menuType) {
      menu.renderMenuOption(menuType, option);
    };
    };
  },

  renderMenuOption: function(menuType, option) {
    let menuBox = document.getElementById("menu");

      option = menuType[option];
      //Infoboxes.
      if (!option.ignore && !option.inventorySlot) {
        const newOption = document.createElement("div");
        if (option.title === null) {
          newOption.style.backgroundColor = "brown";
          newOption.style.height = "15%";
          newOption.style.width = "90%";
          newOption.style.margin = "auto";
          newOption.style.justifyContent = "center";
          let iText = document.createElement("p")
          iText.innerText = option.text;
          iText.style.textAlign = "center";
          newOption.appendChild(iText);
          if (option.optionID) {
            newOption.id = option.optionID;
          };         
          menuBox.appendChild(newOption);

        };
        //Upgrades and action boxes.
        if (option.title !== null) {
          newOption.style.backgroundColor = "orange";
          newOption.style.height = "20%";
          newOption.style.width = "95%";
          newOption.style.margin = "auto";
          newOption.style.justifyContent = "center";
          let iText = document.createElement("p");
          iText.innerText = option.text;
          let iTitle = document.createElement('p');
          iTitle.innerText = option.title;
          iTitle.style.textAlign = "center";
          newOption.appendChild(iTitle);
          newOption.appendChild(iText);
          if (option.clickAction) {
            newOption.addEventListener("click", option.clickAction);
          };
          if (option.optionID) {
            newOption.id = option.optionID;
          }; 
          menuBox.appendChild(newOption);
          
        };
      //Inventory Slots.
      } else if (!option.ignore && option.inventorySlot) {
        const newOption = document.createElement("div");
          newOption.style.backgroundColor = "yellow";
          newOption.style.height = "5%";
          newOption.style.width = "50%";
          newOption.style.margin = "auto";
          newOption.style.justifyContent = "center";
          let iText = document.createElement("p")
          iText.innerText = `${option.slotName}: ${option.amount()}`;
          iText.style.textAlign = "center";
          newOption.appendChild(iText);
          if (option.optionID) {
          newOption.id = option.optionID;
          }; 
          menuBox.appendChild(newOption);
      };
  },

  wuddleMenu: {

    menuID: {menuID: "wuddleMenu", ignore: true},
  
    descriptionBox: {
    text: "Wuddle is a platypus. She has fallen down a very large cave and must now escape.",
    ignore: false,
    title: null,
    inventorySlot: false,
    },

    tsetUpgrade1: {
    text: "This upgrade...",
    title: "Title AHHHHHH",
    ignore: true,
    inventorySlot: false,
    },

    tsetUpgrade2: {
    text: "That action...",
    title: "Ttle AHHHHHH number 2",
    ignore: true,
    inventorySlot: false,
    },

  },

  mineMenu: {

    menuID: {menuID: "mineMenu", ignore: true},
  
    descriptionBox: {
    text: "The mine allows Puddle to mine materials for the castle.",
    title: null,
    ignore: false,
    inventorySlot: false,
    
  },

    mineActionBox: {
    text: "Collect dirt for the castle.",
    title: "Mine materials.",
    ignore: false,
    inventorySlot: false,
    clickAction: function() {
      wuddleTasks.mine();
    },
    },

  },
  
  benchMenu: {

    menuID: {menuID: "benchMenu", ignore: true},
  
    descriptionBox: {
    text: "The bench allows Puddle to forge bricks for the castle.", 
    title: null,
    ignore: false,
    inventorySlot: false,
    },

    brickActionBox: {
    text: "Create bricks for the castle.",
    title: "Make bricks.",
    ignore: false,
    inventorySlot: false,
    clickAction: function() {
      wuddleTasks.makeBricks();
    },
    },

  },

  constructionMenu: {

    menuID: {menuID: "constructionMenu", ignore: true},
  
    descriptionBox: {
    text: "Construct the tower from forged bricks.", 
    title: null,
    ignore: false,
    inventorySlot: false,
    },

    placeBricksActionBox: {
    text: "Place bricks for the castle.",
    title: "Place bricks.",
    ignore: false,
    inventorySlot: false,
    clickAction: function() {
      castle.renderNewBlock("basic");
    },
    },

  },

  inventoryMenu: {

    menuID: {menuID: "inventoryMenu", ignore: true},

    /*
    InventorySlot: function(oslotName, ooptionID, oinventorySlot, oignore, oamount) {
      this.slotName = oslotName;
      this.optionID = ooptionID;
      this.inventorySlot = oinventorySlot;
      this.ignore = oignore;
      this.amount = oamount;
      return this;

    },
    */
  
    descriptionBox: {
    text: "Hot inventory made by the hot developer.", 
    title: null,
    ignore: false,
    inventorySlot: false,
    },

    dirtBox: /*menu.inventoryMenu.InventorySlot("Dirt", "dirt", true, false, function() {return inventory.dirt}),*/

    {
    slotName: "Dirt",
    optionID: "dirt",
    inventorySlot: true,
    ignore: false,
    amount: function() {return inventory.dirt},
    },

    bricksBox: /*menu.inventoryMenu.InventorySlot("Bricks", "bricks", true, false, function() {return inventory.bricks}),*/
    
    {
    slotName: "Bricks",
    optionID: "bricks",
    inventorySlot: true,
    ignore: false,
    amount: function() {return inventory.bricks},
    },

    beamsBox: /*menu.inventoryMenu.InventorySlot("Beams", "beams", true, false, function() {return inventory.beams}),*/
    
    {
    slotName: "Beams",
    optionID: "beams",
    inventorySlot: true,
    ignore: false,
    amount: function() {return inventory.beams},
    },

  },
  
};

const wuddleTasks = {

  curretIntervalID: null,
  currentTask: null,

  mine: function() {
    if (this.currentIntervalID !== null && this.currentTask !== "mine") {
      clearInterval(this.curretIntervalID);
    };
    if (this.currentTask !== "mine") {
    this.currentTask = "mine";
    this.curretIntervalID = setInterval(this.mineCallback, 1000);
    };
    
  },
  mineCallback: function() {
    inventory.dirt = inventory.dirt + 1;
    if (menu.currentMenu == "inventoryMenu") {
    document.getElementById("dirt").removeChild(document.getElementById("dirt").lastChild)
    let iText = document.createElement("p")
    iText.innerText = `Dirt: ${inventory.dirt}`;
    iText.style.textAlign = "center";
    document.getElementById("dirt").appendChild(iText);
    };
  },

  makeBricks: function() {
    if (this.currentIntervalID !== null && this.currentTask !== "makeBricks") {
      clearInterval(this.curretIntervalID);
    };
    if (this.currentTask !== "makeBricks") {
      this.currentTask = "makeBricks";
      this.curretIntervalID = setInterval(this.makeBricksCallback, 3000);
      };
  },
  makeBricksCallback: function() {
    if (inventory.dirt >= 5) {
    inventory.bricks = inventory.bricks + 1;
    inventory.dirt = inventory.dirt - 5;
    if (menu.currentMenu == "inventoryMenu") {
    document.getElementById("bricks").removeChild(document.getElementById("bricks").lastChild)
    let iText = document.createElement("p");
    iText.innerText = `Bricks: ${inventory.bricks}`;
    iText.style.textAlign = "center";
    document.getElementById("bricks").appendChild(iText);
    document.getElementById("dirt").removeChild(document.getElementById("dirt").lastChild)
    let i2Text = document.createElement("p")
    i2Text.innerText = `Dirt: ${inventory.dirt}`;
    i2Text.style.textAlign = "center";
    document.getElementById("dirt").appendChild(i2Text);
    };
    } else if (inventory.dirt < 5) {
      document.getElementById("mine").style.borderColor = "red";
      document.getElementById("mine").style.borderStyle = "solid";
      document.getElementById("mine").style.borderWidth = "2px";
      setTimeout(menu.clearBorder, 1000, "mine");
    };
  },


};


const castle = {

  nextBlocksPosition: [0,0],

  canRenderNewBlock: function(blockType) {
    if (inventory.bricks >= 3) {
      return true;
    } else {
      return false;
    }
  },

  renderNewBlock: function(blockType) {
    if (castle.canRenderNewBlock(blockType)) {
    let newBlock = document.createElement("div");
    newBlock.style.borderStyle = "solid";
    newBlock.style.borderWidth = "1px";
    if (blockType = "basic") {
      newBlock.style.backgroundColor = "#51523f";
      newBlock.style.borderColor = "#515111";
    };
    newBlock.style.margin = "0";
    if (this.nextBlocksPosition[0] === 10) {
      this.nextBlocksPosition[0] = 0;
      this.nextBlocksPosition[1]++;
    }
    newBlock.style.gridColumn = `${this.nextBlocksPosition[0]+1}`;
    this.nextBlocksPosition[0]++;
    newBlock.style.gridRow = `-${this.nextBlocksPosition[1]+2}`;

    inventory.bricks = inventory.bricks - 3;

    document.getElementById("castle").appendChild(newBlock);



    } else {
      document.getElementById("bench").style.color = "red";
      document.getElementById("bench").style.borderStyle = "solid";
      document.getElementById("bench").style.borderWidth = "2px";
      setTimeout(menu.clearBorder, 1000, "bench");
    };
  },

};
