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
          iText.innerText = `${option.optionID}: ${option.amount}`;
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

  inventoryMenu: {

    menuID: {menuID: "inventoryMenu", ignore: true},
  
    descriptionBox: {
    text: "Hot inventory made by the hot developer.", 
    title: null,
    ignore: false,
    inventorySlot: false,
    },

    dirtBox: {
    optionID: "Dirt",
    amount: inventory.dirt,
    inventorySlot: true,
    ignore: false,
    },

    bricksBox: {
    optionID: "Bricks",
    amount: inventory.bricks,
    inventorySlot: true,
    ignore: false,
    },

    beamsBox: {
    optionID: "Beams",
    amount: inventory.beams,
    inventorySlot: true,
    ignore: false,
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
    this.curretIntervalID = setInterval(this.mineCallback, 5000);
    };
    
  },
  mineCallback: function() {
    inventory.dirt = inventory.dirt + 1;
    if (menu.currentMenu == "inventoryMenu") {
    menu.inventoryMenu.dirtBox.amount = inventory.dirt;
    document.getElementById("Dirt").removeChild(document.getElementById("Dirt").lastChild)
    let iText = document.createElement("p")
    iText.innerText = `Dirt: ${menu.inventoryMenu.dirtBox.amount}`;
    iText.style.textAlign = "center";
    document.getElementById("Dirt").appendChild(iText);
    };
  },
  makeBricks: function() {
    if (this.currentIntervalID !== null && this.currentTask !== "makeBricks") {
      clearInterval(this.curretIntervalID);
    };
    if (this.currentTask !== "makeBricks") {
      this.currentTask = "makeBricks";
      this.curretIntervalID = setInterval(this.makeBricksCallback, 10000);
      };
  },
  makeBricksCallback: function() {
    if (inventory.dirt >= 5) {
    inventory.bricks = inventory.bricks + 1;
    inventory.dirt = inventory.dirt - 5;
    if (menu.currentMenu == "inventoryMenu") {
    menu.inventoryMenu.bricksBox.amount = inventory.bricks;
    document.getElementById("Bricks").removeChild(document.getElementById("Bricks").lastChild)
    let iText = document.createElement("p");
    iText.innerText = `Bricks: ${menu.inventoryMenu.bricksBox.amount}`;
    iText.style.textAlign = "center";
    document.getElementById("Bricks").appendChild(iText);
    menu.inventoryMenu.dirtBox.amount = inventory.dirt;
    document.getElementById("Dirt").removeChild(document.getElementById("Dirt").lastChild)
    let i2Text = document.createElement("p")
    i2Text.innerText = `Dirt: ${menu.inventoryMenu.dirtBox.amount}`;
    i2Text.style.textAlign = "center";
    document.getElementById("Dirt").appendChild(i2Text);
    };
    } else if (inventory.dirt < 5) {
      document.getElementById("mine").style.borderColor = "red";
      document.getElementById("mine").style.borderStyle = "solid";
      document.getElementById("mine").style.borderWidth = "2px";
      setTimeout(menu.clearBorder, 1000, "mine");
    };
  },

};
