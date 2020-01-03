module.exports = {
  load() {

  },

  unload() {

  },

  messages: {
    CreateViewJS(){
      Editor.Scene.callSceneScript('script', 'CreateViewJS', function () {})
    },
    
    CreateControllerJS(){
      Editor.Scene.callSceneScript('script', 'CreateControllerJS', function () {})
    },

    CreateDir(){
      Editor.Scene.callSceneScript('script', 'CreateDir', function () {})
    }
  },
};