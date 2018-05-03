function convertImagesToFills(context) {

  var document = context.document
  var page = document.currentPage()
  var selection = context.selection
  var selectionCount = selection.length

  if (selectionCount > 0) {
    for (var i = 0; i < selectionCount; i++) {
      var layer = selection.objectAtIndex(i)
      var artboard = layer.parentArtboard()
      var placeInto = (artboard) ? artboard : page

      if (layer.className() != "MSBitmapLayer") {
        document.showMessage('Please select only images! ' + layer.name() + ' is ' + layer.className());
      } else {

        // get layers frame
        var layerFrame = layer.frame()

        // create layer rect
        var layerRect = NSMakeRect(layerFrame.x(), layerFrame.y(), layerFrame.width(), layerFrame.height())


        // create layer with image as fill
        var imageLayer = MSShapeGroup.shapeWithRect(layerRect)
        imageLayer.setName("image")
        imageLayer.setConstrainProportions(true)
        imageLayer.style().addStylePartOfType(0)
        var imageLayerStyle = imageLayer.style().fills().firstObject()
        imageLayerStyle.setFillType(4)
        imageLayerStyle.setPatternFillType(1)
        imageLayerStyle.setImage(layer.image())

        // add group with layers to placeInto
        placeInto.addLayer(imageLayer)

        // remove original image layer
        layer.removeFromParent()

      }
    }
  } else {
    document.showMessage('Nothing is selected!')
  }


};
