/**
 * relation editor
 * creator : Revine Kim
 * date : 2018. 7. 10
 */

////////////////////////////////////
// sample data
////////////////////////////////////

const DUMMY = [
  {
    soruceId: "eeaea85c.49ab48",
    targetId: "2d70aaab.af94a6",
    relation: {
      sourceToTarget: "children",
      targetToSource: "parent"
    },
    relationKey: ""
  },
  {
    soruceId: "eeaea85c.49ab48",
    targetId: "17f2ef37.b9ead1",
    relation: {
      sourceToTarget: "children",
      targetToSource: "parent"
    },
    relationKey: ""
  },
  {
    soruceId: "eeaea85c.49ab48",
    targetId: "2d70aaab.af94a6",
    relation: {
      sourceToTarget: "children",
      targetToSource: "parent"
    },
    relationKey: ""
  },
  {
    soruceId: "eeaea85c.49ab48",
    targetId: "17f2ef37.b9ead1",
    relation: {
      sourceToTarget: "children",
      targetToSource: "parent"
    },
    relationKey: ""
  },
  {
    soruceId: "eeaea85c.49ab48",
    targetId: "2d70aaab.af94a6",
    relation: {
      sourceToTarget: "children",
      targetToSource: "parent"
    },
    relationKey: ""
  }
]


////////////////////////////////////
// styling code
////////////////////////////////////

var templeteStr = ('<div class="objectType_container">\
<div class="objectType_imgContainer">\
  <img src="./object_final.png"/>\
</div>\
<div class="objectType_nameContainer">\
  <text class="objectType_name">{objectName}</text>\
</div>\
</div>');

function createObjectTypeBox($palette, relationInfo, sourceId){
  ////////////////////////////////////
  // initialize
  ////////////////////////////////////

  var pWidth = $palette.width();
  var pHeight = $palette.height();
  var center = {
    x : pWidth/2,
    y : pHeight/2
  }
  var radius = pHeight/4;
  $palette.empty();

  ////////////////////////////////////
  // create origin object
  ////////////////////////////////////

  var $originObject = $(templeteStr.slice().replace('{objectName}', sourceId));
  $palette.append($originObject);

  var tWidth = $originObject.width();
  var tHeight = $originObject.height();
  $originObject.css('left', center.x - tWidth/2);
  $originObject.css('top', center.y - tHeight/2);


  ////////////////////////////////////
  // create boundary circle
  ////////////////////////////////////  
  var $boundary = $('<div class="boundaryCircle"></div>');
  $boundary.width(radius*2);
  $boundary.height(radius*2);

  $boundary.css('top', center.y - radius)
  $boundary.css('left', center.x - radius)
  $boundary.css('border-radius', radius)

  $palette.append($boundary);


  var relationCount = Object.keys(relationInfo).length;
  console.log('count: ', relationCount)

  for(var i in relationInfo){
    var deg = 360/relationCount * i;
    if(deg == 360) deg = 0;

    ////////////////////////////////////
    // create relation path
    ////////////////////////////////////
    var $pathContainer = $('<div class="relation_path_container"/>').width(radius*2);
    var $path = $('<div class="relation_path"/>').width(radius);

    $pathContainer.css('transform', 'rotate(' + deg + 'deg)');
    $pathContainer.css('top', center.y);
    $pathContainer.css('left', center.x - radius);

    $pathContainer.append($path);
    $palette.append($pathContainer);

    var pathOffset = $pathContainer.offset();
    console.log(pathOffset);

    ////////////////////////////////////
    // create relation object
    ////////////////////////////////////

    var $objectType = $(templeteStr.slice().replace('{objectName}', relationInfo[i].targetId));
    $palette.append($objectType);

    var tWidth = $objectType.width();
    var tHeight = $objectType.height();

    var x = pathOffset.left - tWidth/2;
    var y = pathOffset.top - tHeight/2;
    switch(parseInt(deg/90)){
      case 0:
        break;
      case 1:
        x = 2*center.x - x - tWidth;
        break;
      case 2:
        x = 2*center.x - x - tWidth;
        y = 2*center.y - y - tHeight;
        break;
      case 3:
        y = 2*center.y - y - tHeight;
        break;
    }

    $objectType.css('top', y);
    $objectType.css('left', x)

    var $pointer = $('<div class="pointer"/>');
    $pointer.css('top', y);
    $pointer.css('left', x);
    $palette.append($pointer);
  }  
}

var $relationPalette = $('.relation_palette');
createObjectTypeBox($relationPalette, DUMMY, 'origin');


