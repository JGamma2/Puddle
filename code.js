const menu = {

  

  renderMenuOptions: function(menuType) {
    let menuBox = document.getElementById("menu");
    //Clears menu div of existing options.
    while (menuBox.lastChild) {
      menuBox.removeChild(menuBox.lastChild);
    };
    
    for (let option in menuType) {
      option = menuType[option];
      //Infoboxes.
      if (!option.ignore) {
        const newOption = document.createElement("div");
        if (option.title === null) {
          newOption.style.backgroundColor = "brown";
          newOption.style.height = "15vh";
          newOption.style.width = "45vh";
          newOption.style.margin = "auto";
          newOption.style.justifyContent = "center";
          let iText = document.createElement("p")
          iText.innerText = option.text;
          iText.style.textAlign = "center";
          newOption.appendChild(iText);          
          menuBox.appendChild(newOption);

        };
        //Upgrades and action boxes.
        if (option.title !== null) {
          newOption.style.backgroundColor = "orange";
          newOption.style.height = "20vh";
          newOption.style.width = "40vh";
          newOption.style.margin = "auto";
          newOption.style.justifyContent = "center";
          let iText = document.createElement("p")
          iText.innerText = option.text;
          let iTitle = document.createElement('p')
          iTitle.innerText = option.title;
          iTitle.style.textAlign = "center";
          newOption.appendChild(iTitle);
          newOption.appendChild(iText);
          menuBox.appendChild(newOption);
          
        };
      };
    };
  },

  wuddleMenu: 
  [
    {text: "Wuddle is a platypus. She has fallen down a very large cave and must now escape.", ignore: false, title: null},
    {text: "This upgrade...", ignore: true, title: "Title AHHHHHH"},
    {text: "That action...", ignore: true, title: "Title AHHHHHH number 2"},

  ],

  mineMenu: 
  [
    {text: "I don\'t like racism.", ignore: false, title: null},
    {text: "hola", ignore: false, title: "12"},

  ],
  
  benchMenu:
  [
    {text: "YEAEAAEAE", ignore: false, title: null},
    {text: "WOOO.", ignore: false, title: "Uhhhhh"},

  ],
  
};

