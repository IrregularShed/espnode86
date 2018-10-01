;(function(global) {
    "use strict";
  
  var Rpd = global.Rpd;
  if (typeof Rpd === "undefined" && typeof require !== "undefined") {
      Rpd = require('rpd');
  }
  
  var COMMAND_SEPARATOR = '\n';
  var ARGS_SEPARATOR = ' ';
  var ESPNODE_VERSION = 'v2.1.2';
  
  Rpd.export.plain = function(name) {
      var spec = exportSpec;
  
      var commands = [];
      var lines = [ Rpd.VERSION ];
  
      var moves = {};
  
      var knownEvents = Rpd.events.filter(function(update) { return spec[update.type]; });
  
      var pushCommand = function(update) {
          if (update.type === 'node/move') {
              moves[update.node.id] = spec['node/move'](update).join(ARGS_SEPARATOR);
          } else {
              lines.push(spec[update.type](update).join(ARGS_SEPARATOR));
          }
      };
  
      function storeMoves() {
          Object.keys(moves).forEach(function(nodeId) {
              lines.push(moves[nodeId]);
          });
      };
  
      knownEvents.onValue(pushCommand);
  
      return function() {
          knownEvents.offValue(pushCommand);
          storeMoves();
          return lines.join(COMMAND_SEPARATOR);
      };
  }
  
  Rpd.import.plain = function(lines) {



      var version = lines.split(COMMAND_SEPARATOR)[0];

      var old_espsynth_node = [
        ["espnode/mixer3", "signal/mixer3"],
        ["espnode/mixer2","signal/mixer2"],
        ["espnode/oscillator","wave/oscillator"],
        ["espnode/lfo","wave/lfo"],
        ["espnode/lowpass","filter/lowpass"],
        ["espnode/bitcrusher","filter/bitcrusher"],
        ["espnode/multiplexer","input/multiplexer"],
        ["espnode/delay","filter/delay"],
        ["espnode/vca","signal/vca"],
        ["espnode/reverb","filter/reverb"],
        ["espnode/sampleplayer","sampler/sampleplayer"],
        ["espnode/tinysynth","wave/tinysynth"],
        ["espnode/dac","output/dac"],
        ["espnode/constant","input/constant"],
        ["espnode/clock","timing/clock"],
        ["espnode/counter","timing/counter"],
        ["espnode/samplepackplay","sampler/samplepackplay"],
        ["espnode/samplepack","sampler/samplepack"],
        ["espnode/map","input/map"],
        ["espnode/clockdivider","timing/clockdivider"],
        ["espnode/seqeuclidean","timing/seqeuclidean"],
        ["espnode/clockrandom","timing/clockrandom"],
        ["espnode/constant","input/constant"],
        ["espnode/samplepackplay","sampler/samplepackplay"],
        ["espnode/tinysynth","wave/tinysynth"],
        ["espnode/clock","timing/clock"],
        ["espnode/counter","timing/counter"],
        ["espnode/map","input/map"],
        ["espnode/constant","input/constant"]
      ]


      if ((version !== ESPNODE_VERSION) && console && console.warn) {
          console.warn('Plain file version', version, 'and RPD Version', Rpd.VERSION, 'are not equal to each other, update node list');
          //make compatible with old version
          for (var arr in old_espsynth_node) {
            lines = lines.replaceAll(old_espsynth_node[arr][0], old_espsynth_node[arr][1])
          }
      }


      lines = lines.split(COMMAND_SEPARATOR);
  
      var spec = makeImportSpec();  
  
      var commands = lines.slice(1);
  
      commands.forEach(function(command) {
          command = command.split(ARGS_SEPARATOR);
          if (command.length) spec[command[0]](command.slice(1));
      });
  }
  
  // ================================= EXPORT =================================
  
  var exportSpec = {
      'network/add-patch': function(update) {
          var patch = update.patch;
          return [ 'network/add-patch', patch.id, encodeURIComponent(patch.name) ];
      },
      'patch/open': function(update) {
          return update.parent ? [ 'patch/open', update.patch.id, update.parent.id ]
                               : [ 'patch/open', update.patch.id ];
      },
      'patch/close': function(update) {
          return [ 'patch/close', update.patch.id ];
      },
      'patch/set-inputs': function(update) {
          var patch = update.patch;
          var srcInputs = update.inputs,
              inputs = [];
          srcInputs.forEach(function(srcInput) { inputs.push(srcInput.id); });
          return [ 'patch/set-inputs', update.patch.id ].concat(inputs);
      },
      'patch/set-outputs': function(update) {
          var patch = update.patch;
          var srcOutputs = update.outputs,
              outputs = [];
          srcOutputs.forEach(function(srcOutput) { outputs.push(srcOutput.id); });
          return [ 'patch/set-outputs', update.patch.id ].concat(outputs);
      },
      'patch/project': function(update) {
          return [ 'patch/project', update.patch.id, update.target.id, update.node.id ];
      },
      'patch/move-canvas': function(update) {
          return [ 'patch/move-canvas', update.patch.id, update.position[0], update.position[1] ];
      },
      'patch/resize-canvas': function(update) {
          return [ 'patch/resize-canvas', update.patch.id, update.size[0], update.size[1] ];
      },
      'patch/add-node': function(update) {
          var node = update.node;
          return [ 'patch/add-node', node.patch.id, node.id, node.type, encodeURIComponent(node.def.title) ];
      },
      'patch/remove-node': function(update) {
          return [ 'patch/remove-node', update.patch.id, update.node.id ];
      },
      'node/turn-on': function(update) {
          return [ 'node/turn-on', update.node.id ];
      },
      'node/turn-off': function(update) {
          return [ 'node/turn-off', update.node.id ];
      },
      'node/add-inlet': function(update) {
          var inlet = update.inlet;
          return [ 'node/add-inlet', update.node.id, inlet.id,
                   inlet.type, inlet.alias, encodeURIComponent(inlet.def.label) ];
      },
      'node/remove-inlet': function(update) {
          return [ 'node/remove-inlet', update.node.id, update.inlet.id ];
      },
      'node/add-outlet': function(update) {
          var outlet = update.outlet;
          return [ 'node/add-outlet', update.node.id, outlet.id,
                   outlet.type, outlet.alias, encodeURIComponent(outlet.def.label) ];
      },
      'node/remove-outlet': function(update) {
          return [ 'node/remove-outlet', update.node.id, update.outlet.id ];
      },
      'node/move': function(update) {
          return [ 'node/move', update.node.id ].concat(update.position);
      },
      'node/configure': function(update) {
          return [ 'node/configure', update.node.id ].concat(JSON.stringify(update.props));
      },
      'outlet/connect': function(update) {
          return [ 'outlet/connect', update.outlet.id, update.inlet.id, update.link.id ];
      },
      'outlet/disconnect': function(update) {
          return [ 'outlet/disconnect', update.outlet.id, update.link.id ];
      },
      'link/enable': function(update) {
          return [ 'link/enable', update.link.id ];
      },
      'link/disable': function(update) {
          return [ 'link/disable', update.link.id ];
      }
  };
  
  // ================================= IMPORT =================================
  
  function makeImportSpec() {
      var patches = {},
          nodes = {},
          inlets = {},
          outlets = {},
          links = {};
  
      return {
          'network/add-patch': function(command) {
              patches[command[0]] = Rpd.addClosedPatch(decodeURIComponent(command[1]));
          },
          'patch/open': function(command) {
              patches[command[0]].open(command.length > 1 ? patches[command[1]] : null);
          },
          'patch/close': function(command) {
              patches[command[0]].close();
          },
          'patch/set-inputs': function(command) {
              var inputs = command.slice(1),
                  inputsTrg = [];
              inputs.forEach(function(input) {
                  inputsTrg.push(inlets[input]);
              });
              patches[command[0]].inputs(inputsTrg);
          },
          'patch/set-outputs': function(command) {
              var outputs = command.slice(1),
                  outputsTrg = [];
              outputs.forEach(function(output) {
                  outputsTrg.push(outlets[output]);
              });
              patches[command[0]].outputs(outputsTrg);
          },
          'patch/project': function(command) {
              patches[command[0]].project(nodes[command[2]]);
          },
          'patch/move-canvas': function(command) {
              patches[command[0]].moveCanvas(parseFloat(command[1]), parseFloat(command[2]));
          },
          'patch/resize-canvas': function(command) {
              patches[command[0]].resizeCanvas(parseFloat(command[1]), parseFloat(command[2]));
          },
          'patch/add-node': function(command) {
              nodes[command[1]] = patches[command[0]].addNode(command[2], decodeURIComponent(command[3]));  
          },
          'patch/remove-node': function(command) {
              patches[command[0]].removeNode(nodes[command[1]]);
          },
          'node/turn-on': function(command) {
              nodes[command[0]].turnOn();
          },
          'node/turn-off': function(command) {
              nodes[command[0]].turnOff();
          },
          'node/add-inlet': function(command) {
            //   console.log(command);
              // console.log(nodes[command[0]].inlets[command[3]]);
              inlets[command[1]] = nodes[command[0]].inlets[command[3]];
          },
          'node/remove-inlet': function(command) {
              nodes[command[0]].removeInlet(inlets[command[1]]);
          },
          'node/add-outlet': function(command) {
              outlets[command[1]] = nodes[command[0]].outlets[command[3]];
              // outlets[command[1]] = nodes[command[0]].addOutlet(command[2], command[3], decodeURIComponent(command[4]));
          },
          'node/update-inlet': function(command) {
              inlets[command[1]].receive(decodeURIComponent(command[3]))             
          },
          'node/update-outlet': function(command) {

          },        
          'node/remove-outlet': function(command) {
              nodes[command[0]].removeOutlet(outlets[command[1]]);
          },
          'node/move': function(command) {
              nodes[command[0]].move(parseFloat(command[1]), parseFloat(command[2]));
          },
          'node/configure': function(command) {
              nodes[command[0]].configure(JSON.parse(command[1]));
          },
          'outlet/connect': function(command) {
              // console.log( outlets[command[0]].connect );
              // console.log(command[1])
              // console.log( inlets );
  
              links[command[2]] = outlets[command[0]].connect(inlets[command[1]]);
          },
          'outlet/disconnect': function(command) {
              outlets[command[0]].disconnect(links[command[1]]);
          },
          'link/enable': function(command) {
              links[command[0]].enable();
          },
          'link/disable': function(command) {
              links[command[0]].disable();
          }
      }
  }
  
  }(this));
  