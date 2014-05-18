requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    app: '../app'
  },

  shim: {
    // shims for original 2048 classes
    'app/game_manager': {
      deps: [ 'app/grid', 'app/tile' ],
      exports: 'GameManager'
    },
    'app/html_actuator': { exports: 'HTMLActuator' },
    'app/keyboard_input_manager': { exports: 'KeyboardInputManager' },
    'app/local_storage_manager': { exports: 'LocalStorageManager' },
    'app/grid': { exports: 'Grid' },
    'app/tile': { exports: 'Tile' }
  }

});

// Start the main app logic.
requirejs([ 'app/game_manager', 'app/keyboard_input_manager', 'app/html_actuator', 'app/local_storage_manager' ],
function (   GameManager,        KeyboardInputManager,         HTMLActuator,        LocalStorageManager        ) {

  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});
