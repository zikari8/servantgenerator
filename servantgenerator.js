$(document).ready(init);
var canvasContainer;

function init() {
  canvasContainer = new canvasObject();
  $('#imagecropmodal').popup({
    blur: false
  });
  registerEventHandlers();
  //disable dragging of class icons
  $('#class img').on('dragstart', function(e){
    e.preventDefault();
  });
}

function canvasObject() {
  this.canvas = new fabric.StaticCanvas('canvas', {
    width: 800,
    height: 600,
    backgroundColor: '#aa6c43'
  });
  this.backgroundImage = null;
  this.masterName = null;
  this.servantName = null;
  this.servantSex = null;
  this.servantHeightWeight = null;
  this.servantAlignment = null;
  this.servantStrength = null;
  this.servantEndurance = null;
  this.servantAgility = null;
  this.servantMagic = null;
  this.servantLuck = null;
  this.servantNP = null;
  this.servantAbility = null;
  this.servantAbility0 = null;
  this.servantAbility1 = null;
  this.servantAbility2 = null;
  this.imageSidebar = null;
  this.servantPicture = null;
}

var servant = {
  //keys for accessing servantData
  servantClass:'servantClass',
  masterName:'masterName',
  name: 'name',
  sex: 'sex',
  heightWeight: 'heightWeight',
  alignment: 'alignment',
  picture: 'picture',
  strength: 'strength',
  endurance: 'endurance',
  agility: 'agility',
  magic: 'magic',
  luck: 'luck',
  np: 'np',
  ability: 'ability',
  ability0: 'ability0',
  ability1: 'ability1',
  ability2: 'ability2',
  sidebar: 'sidebar',
  servantData : {},
  getServantData : function(key) {
    return this.servantData[key];
  },
  setServantData : function(key, value) {
    this.servantData[key] = value;
    draw(key);
  }
}

var informationTextStyle = {
  fontSize: 14,
  fontFamily: 'Oswald',
  fill: 'white',
  textAlign: 'center',
  left: 390,
  width: 220,
  originX: 'center',
  originY: 'center'
}

var informationParagraphStyle = {
  fontSize: 13,
  fontFamily: 'Georgia',
  //fontWeight: 'Bold',
  fill: 'white',
  textAlign: 'left',
  width: 590,
  originX: 'left',
  originY: 'top',
}

function registerEventHandlers() {
  $('#class input').click(changeServantClass);
  $('#name').keyup(changeMasterName);
  $('#servant').keyup(changeServantName);
  $('#sex input').click(changeServantSex);
  $('#heightweight').keyup(changeServantHeightWeight);
  $('#alignment').change(changeServantAlignment);
  $('#strength').change(changeServantStrength);
  $('#endurance').change(changeServantEndurance);
  $('#agility').change(changeServantAgility);
  $('#magic').change(changeServantMagic);
  $('#luck').change(changeServantLuck);
  $('#np').change(changeServantNP);
  $('#ability input').change(changeServantAbility);
  $('#description0').change(changeServantAbility0);
  $('#description1').change(changeServantAbility1);
  $('#description2').change(changeServantAbility2);
  $('#sidebar').change(changeimageSidebar);
  $('#servantpicture').change(showCropModal);
  $('#crop').click(cropImage);
}

function showCropModal(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function(e) {
    $('#cropper').attr('src', reader.result);
    $('#imagecropmodal').popup('show');
    $('#cropper').cropper({
      aspectRatio: 1,
      viewMode: 1,
      responsive: true,
      background: false
    });
    $('#servantpicture').val(null);
  }
}

function cropImage() {
  changeServantPicture($('#cropper')
  .cropper(
    "getCroppedCanvas", {
      width: 216,
      height: 216
    }).toDataURL());
  $('#imagecropmodal').popup('hide');
  $('#cropper').cropper('destroy');
}

function changeServantPicture(img) {
  servant.setServantData(servant.picture, img);
}

function changeServantClass() {
  servant.setServantData(servant.servantClass, $(this).val());
}

function changeMasterName() {
  servant.setServantData(servant.masterName, $(this).val());
}

function changeServantName() {
  servant.setServantData(servant.name, $(this).val());
}

function changeServantSex() {
  servant.setServantData(servant.sex, $(this).val());
}

function changeServantHeightWeight() {
  servant.setServantData(servant.heightWeight, $(this).val());
}

function changeServantAlignment() {
  servant.setServantData(servant.alignment, $(this).val());
}

function changeServantStrength() {
  servant.setServantData(servant.strength, $(this).val());
}

function changeServantEndurance() {
  servant.setServantData(servant.endurance, $(this).val());
}

function changeServantAgility() {
  servant.setServantData(servant.agility, $(this).val());
}

function changeServantMagic() {
  servant.setServantData(servant.magic, $(this).val());
}

function changeServantLuck() {
  servant.setServantData(servant.luck, $(this).val());
}

function changeServantNP() {
  servant.setServantData(servant.np, $(this).val());
}

function changeServantAbility() {
  servant.setServantData(servant.ability, $(this).val());
}

function changeServantAbility0() {
  servant.setServantData(servant.ability0, $(this).val());
}

function changeServantAbility1() {
  servant.setServantData(servant.ability1, $(this).val());
}

function changeServantAbility2() {
  servant.setServantData(servant.ability2, $(this).val());
}

function changeimageSidebar() {
  servant.setServantData(servant.sidebar, $(this).val());
}

function draw(type) {
  switch (type) {
    case servant.servantClass: //background image
      var background = 'images/backgrounds/' + servant.getServantData(servant.servantClass) + '.png';
      if (canvasContainer.backgroundImage == null) {
        fabric.Image.fromURL(background, function(img){
          canvasContainer.backgroundImage = img;
          canvasContainer.canvas.sendToBack(img);
        });
      }
      else {
        canvasContainer.backgroundImage.setSrc(background, renderCanvas);
      }
      break;
    case servant.masterName:
      var master = servant.getServantData(servant.masterName);
      setTextObject('masterName', master, 128);
      break;
    case servant.name:
      var name = servant.getServantData(servant.name);
      setTextObject('servantName', name, 164);
      break;
    case servant.sex:
      var sex = capitalize(servant.getServantData(servant.sex));
      setTextObject('servantSex', sex, 200);
      break;
    case servant.heightWeight:
      setTextObject('servantHeightWeight', servant.getServantData(servant.heightWeight), 236);
      break;
    case servant.ability: //ability box
      var classskill = 'images/abilities/' + servant.getServantData(servant.ability) + '.png';
      if (canvasContainer.servantAbility == null) {
        fabric.Image.fromURL(classskill, function(img){
          canvasContainer.servantAbility = img;
          canvasContainer.canvas.add(img);
        });
      }
      else {
        canvasContainer.servantAbility.setSrc(classskill, renderCanvas);
      }
      canvasContainer['description0'].setText('');
      canvasContainer['description1'].setText('');
      canvasContainer['description2'].setText('');
      renderCanvas();
      break;
    case servant.ability0:
      var ability0 = servant.getServantData(servant.ability0);
      setParagraphObject('description0', ability0, 450, 185);
      break;
    case servant.ability1:
      var ability1 = servant.getServantData(servant.ability1);
      setParagraphObject('description1', ability1, 415, 185);
      break;
    case servant.ability2:
      var ability2 = servant.getServantData(servant.ability2);
      setParagraphObject('description2', ability2, 486, 185);
      break;
    case servant.alignment:
      setTextObject('servantAlignment', servant.getServantData(servant.alignment), 272);
      break;
    case servant.strength: //stat image
      var servantStrength = 'images/statsranks/' + servant.getServantData(servant.strength) + '.png';
      if (canvasContainer.servantStrength == null) {
        fabric.Image.fromURL(servantStrength, function(img){
          canvasContainer.servantStrength = img;
          img.left = 232;
          img.top = 305;
          canvasContainer.canvas.add(img);
        });
      }
      else {
        canvasContainer.servantStrength.setSrc(servantStrength, renderCanvas);
      }
      break;
    case servant.endurance: //stat image
      var servantEndurance = 'images/statsranks/' + servant.getServantData(servant.endurance) + '.png';
      if (canvasContainer.servantEndurance == null) {
        fabric.Image.fromURL(servantEndurance, function(img){
          canvasContainer.servantEndurance = img;
          img.left = 232;
          img.top = 328;
          canvasContainer.canvas.add(img);
        });
      }
      else {
        canvasContainer.servantEndurance.setSrc(servantEndurance, renderCanvas);
      }
      break;
    case servant.agility: //stat image
      var servantAgility = 'images/statsranks/' + servant.getServantData(servant.agility) + '.png';
      if (canvasContainer.servantAgility == null) {
        fabric.Image.fromURL(servantAgility, function(img){
          canvasContainer.servantAgility = img;
          img.left = 232;
          img.top = 351;
          canvasContainer.canvas.add(img);
        });
      }
      else {
        canvasContainer.servantAgility.setSrc(servantAgility, renderCanvas);
      }
      break;
    case servant.magic: //stat image
      var servantMagic = 'images/statsranks/' + servant.getServantData(servant.magic) + '.png';
      if (canvasContainer.servantMagic == null) {
        fabric.Image.fromURL(servantMagic, function(img){
          canvasContainer.servantMagic = img;
          img.left = 527;
          img.top = 305;
          canvasContainer.canvas.add(img);
        });
      }
      else {
        canvasContainer.servantMagic.setSrc(servantMagic, renderCanvas);
      }
      break;
    case servant.luck: //stat image
      var servantLuck = 'images/statsranks/' + servant.getServantData(servant.luck) + '.png';
      if (canvasContainer.servantLuck == null) {
        fabric.Image.fromURL(servantLuck, function(img){
          canvasContainer.servantLuck = img;
          img.left = 527;
          img.top = 328;
          canvasContainer.canvas.add(img);
        });
      }
      else {
        canvasContainer.servantLuck.setSrc(servantLuck, renderCanvas);
      }
      break;
    case servant.np: //stat image
      var servantNP = 'images/statsranks/' + servant.getServantData(servant.np) + '.png';
      if (canvasContainer.servantNP == null) {
        fabric.Image.fromURL(servantNP, function(img){
          canvasContainer.servantNP = img;
          img.left = 527;
          img.top = 351;
          canvasContainer.canvas.add(img);
        });
      }
      else {
        canvasContainer.servantNP.setSrc(servantNP, renderCanvas);
      }
      break;
    case servant.sidebar: //sidebar image
      var imageSidebar = 'images/sidebar/' + servant.getServantData(servant.sidebar) + '.png';
      if (canvasContainer.imageSidebar == null) {
        fabric.Image.fromURL(imageSidebar, function(img){
          canvasContainer.imageSidebar = img;
          canvasContainer.canvas.add(img);
        });
      }
      else {
        canvasContainer.imageSidebar.setSrc(imageSidebar, renderCanvas);
      }
      break;
    case servant.picture:
      var servantPicture = servant.getServantData(servant.picture);
      if(canvasContainer.servantPicture == null) {
        fabric.Image.fromURL(servantPicture, function (img){
          canvasContainer.servantPicture = img;
          img.left = 555;
          img.top = 52;
          canvasContainer.canvas.add(img);
        });
      }
      else {
        canvasContainer.servantPicture.setSrc(servantPicture, renderCanvas);
      }
      break;
  }
}

function setTextObject(key, value, top) {
  if (canvasContainer[key] == null) {
    var text = new fabric.Text(value, informationTextStyle);
    text.top = top;
    canvasContainer[key] = text;
    canvasContainer.canvas.add(text);
  }
  else {
    canvasContainer[key].setText(value);
    renderCanvas();
  }
}

function setParagraphObject(key, value, top, left) {
  if (canvasContainer[key] == null) {
    var text = new fabric.Text(value, informationParagraphStyle);
    text.top = top;
    text.left = left;
    canvasContainer[key] = text;
    canvasContainer.canvas.add(text);
  }
  else {
    canvasContainer[key].setText(value);
    renderCanvas();
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderCanvas() {
  canvasContainer.canvas.renderAll();
}
