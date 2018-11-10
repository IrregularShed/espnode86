var NodeLibrary = [];

NodeLibrary.push({
    nodetype: 'signal/mixer3',
    nodeclass: "ModuleMixer3",
    rpdnode : {
        title: "3 Ch Mixer",    
        inlets: { 
            'ch1': { type: 'espnode/string', default: ""} ,
            'ch2': { type: 'espnode/string', default: ""} ,
            'ch3': { type: 'espnode/string', default: ""} 
        },
        outlets: { 
            'Out': { type: 'espnode/string'} 
        }
    }
});

NodeLibrary.push({
    nodetype: 'signal/mixer2',
    nodeclass: "ModuleMixer2",
    rpdnode : {
        title: "2 Ch Mixer",    
        inlets: { 
            'ch1': { type: 'espnode/string', default: ""} ,
            'ch2': { type: 'espnode/string', default: ""} ,
        },
        outlets: { 
            'Out': { type: 'espnode/string'} 
        }
    }
});


NodeLibrary.push({
    nodetype: 'wave/oscillator',
    nodeclass: "ModuleWavetableOsc",
    rpdnode : {
        title: "Oscillator",    
        inlets: { 
            'frequency_input': { type: 'espnode/string' } ,
            'wavetable_input': { type: 'espnode/string' } ,
        },
        outlets: { 
            'Out': { type: 'espnode/string' } 
        }
    }
});

NodeLibrary.push({
    nodetype: 'wave/lfo',
    nodeclass: "ModuleLFO",
    rpdnode : {
        title: "LF Oscillator",    
        inlets: { 
            'frequency_input': { type: 'espnode/string' } ,
            'wavetable_input': { type: 'espnode/string' } ,
        },
        outlets: { 
            'Out': { type: 'espnode/string' } 
        }
    }
});

NodeLibrary.push({
    nodetype: 'filter/lowpass',
    nodeclass: "ModuleLowpassFilter",
    rpdnode : {
        title: "Low Pass Filter",    
        inlets: { 
            'audio_input': { type: 'espnode/string' } ,
            'cutoff_input': { type: 'espnode/string' } ,
            'resonance_input': { type: 'espnode/string' } ,
        },
        outlets: { 
            'Out': { type: 'espnode/string' } 
        }
    }
});

NodeLibrary.push({
    nodetype: 'filter/bitcrusher',
    nodeclass: "ModuleBitReducer",    
    rpdnode : {
        title: "Bit Crusher",    
        inlets: { 
            'audio_input': { type: 'espnode/string' } ,
            'bit_input': { type: 'espnode/string' } 
        },
        outlets: { 
            'Out': { type: 'espnode/string' } 
        }
    }
});

NodeLibrary.push({
    nodetype: 'input/multiplexer',
    nodeclass: "Param",
    rpdnode : {
        title: "Multiplexer",    
        inlets: { 
        },
        outlets: { 
            'Pot1': { type: 'espnode/string' },
            'Pot2': { type: 'espnode/string' },
            'Pot3': { type: 'espnode/string' }, 
            'Pot4': { type: 'espnode/string' }, 
            'Pot5': { type: 'espnode/string' }, 
            'Pot6': { type: 'espnode/string' }, 
            'Pot7': { type: 'espnode/string' }, 
            'Pot8': { type: 'espnode/string' } 
        }
    }
});

NodeLibrary.push({
    nodetype: 'filter/delay',
    nodeclass: "ModuleDelay",
    rpdnode : {
        title: "Audio Delay",
        inlets: { 
            'audio_input': { type: 'espnode/string' }, 
            'mix_input': { type: 'espnode/string' }, 
            'feedback_input': { type: 'espnode/string' }, 
            'length_input': { type: 'espnode/string' }, 
        },
        outlets: { 'out': { type: 'espnode/string' } }
    }
});

NodeLibrary.push({
    nodetype: 'signal/vca',
    nodeclass: "ModuleVCA",
    rpdnode : {
        title: "VCA (Voltage Ctrl Amplifier)",
        inlets: { 
            'audio_input': { type: 'espnode/string' } ,
            'cv_input': { type: 'espnode/string' } 

        },
        outlets: { 
            'out': { type: 'espnode/string' } 
        }
    }
});

NodeLibrary.push({
    nodetype: 'filter/reverb',
    nodeclass: "ModuleReverb",
    rpdnode : {
        title: "Reverb",
        inlets: { 
            'audio_input': { type: 'espnode/string' } ,
            'mix_input': { type: 'espnode/string' },
            'feedback_input': { type: 'espnode/string' } 
        },
        outlets: { 
            'out': { type: 'espnode/string' } 
        }
    }
});


NodeLibrary.push({
    nodetype: 'sampler/sampleplayer',
    nodeclass: "ModuleSamplePlayer",
    rpdnode : {
        title: "Sample Player",
        inlets: { 
            'trigger_input': { type: 'espnode/string' },
            'sample_select': { type: 'espnode/string' }
        },
        outlets: { 
            'out': { type: 'espnode/string' } 
        }
    }
});



NodeLibrary.push({
    nodetype: 'wave/tinysynth',
    nodegenerateheader: function(node)
    {
        return (node.nodeclass + " *" + node.nodevariable + " = new " + node.nodeclass + "(" +  '"'  + decodeURIComponent(node.nodeinletvalue.ample[1]) + '"' + ")" + ";\n");
    },    
    nodegeneratesetup: function(key, node)
    {
        return "";
    },    
    nodeclass: "ModuleTinySynth",
    rpdnode: {
        title: 'Tiny Synth Player',
        inlets:  { 
            'trigger_input': { type: 'espnode/string', default: 0, hidden: false },
            'ample': { type: 'espnode/string', default: 0, hidden: true },
        },
        outlets: { 
            'out': { type: 'espnode/string', default: 0, hidden: false }
        },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});


NodeLibrary.push({
    nodetype: 'output/dac',
    nodeclass: "DAC",
    rpdnode : {
        title: "Audio DAC",
        inlets: { 
            'audio_input': { type: 'espnode/string' } 
        },
        outlets: { 
            // 'out': { type: 'espnode/string' } 
        }
    }
});


NodeLibrary.push({
    nodetype: 'input/constant',
    nodeclass: "ModuleConstant",
    rpdnode: {
        title: 'Constant|0-1023',
        inlets:  { 'user-value': { type: 'espnode/string', default: 0, hidden: true } },
        outlets: { 'number':     { type: 'espnode/string' } },
        process: function(inlets) {
            return { 'number': inlets['user-value'] };
        }
    }
});


NodeLibrary.push({
    nodetype: 'timing/clock',
    nodeclass: "ModuleClock",
    nodegenerateheader: function(node)
    {
        return (node.nodeclass + " *" + node.nodevariable + " = new " + node.nodeclass + "(" + node.nodeinletvalue.bpm[1]  + ","+ node.nodeinletvalue.division[1]  + ")" + ";\n");
    },
    nodegeneratesetup: function(key, node)
    {
        return "";
    },
    rpdnode: {
        title: 'Clock Gen',
        inlets:  { 
            'bpm': { type: 'espnode/string', default: 0, hidden: true },
            'division': { type: 'espnode/string', default: 0, hidden: true },            
        },
        outlets: { 'out':     { type: 'espnode/string' } },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});



NodeLibrary.push({
    nodetype: 'timing/counter',
    nodeclass: "ModuleCounter",
    nodegenerateheader: function(node)
    {
        return (node.nodeclass + " *" + node.nodevariable + " = new " + node.nodeclass + "(" + node.nodeinletvalue.target[1]  + ")" + ";\n");
    },
    nodegeneratesetup: function(key, node)
    {
        return "";
    },
    rpdnode: {
        title: 'Counter Gen',
        inlets:  { 
            'clock_input': { type: 'espnode/string' } ,
            'target': { type: 'espnode/string', default: 0, hidden: true },
        },
        outlets: { 'out':     { type: 'espnode/string' } },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});


NodeLibrary.push({
    nodetype: 'espnode/comment',
    nodeclass: "COMMENT",
    nodegenerateheader: function(node)
    {
        return "";
    },
    nodegeneratesetup: function(key, node)
    {
        return "";
    },
    rpdnode: {
        title: 'Comment',
        inlets:  { 
            'comment': { type: 'espnode/string', default: 0, hidden: true },
        },
        outlets: { 
        },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});


NodeLibrary.push({
    nodetype: 'sampler/samplepackplay',
    nodeclass: "ModuleSamplePack",
    nodegenerateheader: function(node)
    {
        var node_class = node.nodeclass + node.nodeinletvalue.sample[1];
        return (node_class + " *" + lowCaseFirst(node.nodevariable) + " = new " + node_class + "();\n");
        // return "";

    },
    nodegeneratesetup: function(key,node)
    {
        return "";
    },
    nodegenerateconn: function(conn, node)
    {
        if (conn.outlet_class === "Param")
        {
            return   lowCaseFirst(conn.inlet_class_alias) +  "->" + conn.inlet_alias.toLowerCase() + ' = &amp;param[' + (parseInt(conn.outlet_alias.toLowerCase().replace(/\D/g,''))-1) +"];\n";
        }else if (conn.outlet_class === "ModuleConstant") {
            return   lowCaseFirst(conn.inlet_class_alias) +  "->" + conn.inlet_alias.toLowerCase() + ' = new ModuleConstant(0)';
        }else{
            return ( lowCaseFirst(conn.inlet_class_alias) + "->" + conn.inlet_alias.toLowerCase() + "=" + conn.outlet_class_alias  + ";\n");
        }

        
    },
    rpdnode: {
        title: 'Sample Pack Player',
        inlets:  { 
            'sample': { type: 'espnode/string', hidden: true },
            'trigger_input': { type: 'espnode/string' },
            'sample_select': { type: 'espnode/string'},

        },
        outlets: { 
            'out': { type: 'espnode/string'},

        },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});


NodeLibrary.push({
    nodetype: 'sampler/samplepack',
    nodeclass: "WAVETABLE",
    nodegenerateheader: function(node)
    {
        return "";
    },
    nodegeneratesetup: function(key, node)
    {
        return "";
    },
    rpdnode: {
        title: 'Sample Pack Editor',
        inlets:  { 
            'comment': { type: 'espnode/string', default: 0, hidden: true },
            'sample_name': { type: 'espnode/string', default: 0, hidden: true }
        },
        outlets: { 
        },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});

NodeLibrary.push({
    nodetype: 'input/map',
    nodeclass: "ModuleMap",
    nodegenerateheader: function(node)
    {
        return (node.nodeclass + " *" + node.nodevariable + " = new " + node.nodeclass + "(" + node.nodeinletvalue.low[1] + "," + node.nodeinletvalue.high[1] + ")" + ";\n");
    },
    nodegeneratesetup: function(key, node)
    {
        return "";
    },
    rpdnode: {
        title: 'Map Value',
        inlets:  { 
            'input': { type: 'espnode/string' } ,
            'low': { type: 'espnode/string', default: 0, hidden: true },
            'high': { type: 'espnode/string', default: 0, hidden: true },
        },
        outlets: { 'out':     { type: 'espnode/string' } },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});


NodeLibrary.push({
    nodetype: 'timing/clockdivider',
    nodeclass: "ModuleClockDivider",
    rpdnode: {
        title: 'Clock Divider',
        inlets:  { 
            'clock_input': { type: 'espnode/string' } ,
            'division_input': { type: 'espnode/string' }
        },
        outlets: { 'out':     { type: 'espnode/string' } },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});



NodeLibrary.push({
    nodetype: 'timing/seqeuclidean',
    nodeclass: "ModuleEuclideanSeq",
    rpdnode: {
        title: 'Euclidean Sequencer',
        inlets:  { 
            'clock_input': { type: 'espnode/string' } ,
            'step_input': { type: 'espnode/string' },
            'beat_input': { type: 'espnode/string' },            
            'offset_input': { type: 'espnode/string' }            
        },
        outlets: { 'out':     { type: 'espnode/string' } },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});

NodeLibrary.push({
    nodetype: 'timing/clockrandom',
    nodeclass: "ModuleClockedRandom",
    rpdnode: {
        title: 'Random Clock',
        inlets:  { 
            'clock_input': { type: 'espnode/string' } ,
        },
        outlets: { 'out':     { type: 'espnode/string' } },
        process: function(inlets) {
            // return { 'number': inlets['user-value'] };
        }
    }
});


// NodeLibrary.push({
//     nodetype: 'espnode/envelope',
//     nodeclass: "ModuleENV",
//     rpdnode: {
//         title: 'Envelope',
//         inlets:  { 
//             'frequency_input': { type: 'espnode/string' } ,
//             'slope_input': { type: 'espnode/string' } ,
//             'trigger_input': { type: 'espnode/string' } ,
//         },
//         outlets: { 'out':     { type: 'espnode/string' } },
//         process: function(inlets) {
//             // return { 'number': inlets['user-value'] };
//         }
//     }
// });

// NodeLibrary.push({
//     nodetype: 'espnode/arpeggio',
//     nodeclass: "ModuleArpeggio",
//     rpdnode: {
//         title: 'Arpeggio',
//         inlets:  { 
//             'root_note_input': { type: 'espnode/string' } ,
//             'pattern_input': { type: 'espnode/string' } ,
//             'clock_input': { type: 'espnode/string' } 
//         },
//         outlets: { 'out':     { type: 'espnode/string' } },
//         process: function(inlets) {
//             // return { 'number': inlets['user-value'] };
//         }
//     }
// });

var d3 = d3 || d3_tiny;
var NodeList = RpdUtils.NodeList;
var getNodeTypesByToolkit = RpdUtils.getNodeTypesByToolkit;

Rpd.nodedescription('espnode/nodelist', 'Add any node to active patch by type');
// Rpd.nodetype('espnode/nodelist', { title: 'Node Pallete' });

NodeLibrary.push({
    nodetype: 'espnode/nodelist',
    nodeclass: "NodeList",
    rpdnode: {
        title: 'Espnode Palette'
    }
});

Rpd.noderenderer('espnode/nodelist', 'html', {
    first: function(bodyElm) {

        var patch = this.patch;

        var nodeTypes = Rpd.allNodeTypes,
            nodeDescriptions = Rpd.allNodeDescriptions,
            toolkitIcons = Rpd.allToolkitIcons,
            nodeTypeIcons = Rpd.allNodeTypeIcons;


        // nodeTypes = ( _.filter(nodeTypes,function(key,obj){
        //     if (obj.includes("espnode")) 
        //         return true
        //     else
        //         return false
        // }));

        var nodeEsp = {}

        for (var key in nodeTypes) {
            if (!key.includes("core") && ! key.includes("nodelist")) 
                nodeEsp[key] = nodeTypes[key]
        }

        var nodeTypesByToolkit = getNodeTypesByToolkit(nodeEsp);

        var nodeList = new NodeList({
            getPatch: function() { return patch; },
            buildList: function() {
                var listElements = [];

                // build the list html structure
                d3.select(bodyElm)
                  .append('dl')
                  .call(function(dl) {
                      Object.keys(nodeTypesByToolkit).forEach(function(toolkit) {


                          dl.append('dd')
                            .append('ul')
                            .call(function(ul) {
                                nodeTypesByToolkit[toolkit].types.forEach(function(nodeTypeDef) {
                                    var nodeType = nodeTypeDef.fullName;
                                    ul.append('li')
                                      .call(function(li) {

                                          var elmData = { def: nodeTypeDef,
                                                          element: li };

                                          li.data(elmData);

                                          li.append('span').attr('class', 'rpd-nodelist-icon').text(nodeTypeIcons[nodeType] || String.fromCharCode(160));
                                          li.append('span').attr('class', 'rpd-nodelist-fulltypename')
                                            .call(function(span) {
                                                span.append('span').attr('class', 'rpd-nodelist-toolkit').text(nodeTypeDef.toolkit);
                                                span.append('span').attr('class', 'rpd-nodelist-separator').text('/');
                                                span.append('span').attr('class', 'rpd-nodelist-typename').text(nodeTypeDef.name);
                                            })
                                          if (nodeDescriptions[nodeType]) {
                                              li.append('span').attr('class', 'rpd-nodelist-description')
                                                               .attr('title', nodeDescriptions[nodeType])
                                                               .text(nodeDescriptions[nodeType]);
                                          }

                                          listElements.push(elmData);

                                      })
                                });
                            });

                      });
                  });

                return listElements;
            },
            createSearchInput: function() {
                return d3.select(bodyElm).append('input').attr('type', 'text');
            },
            createClearSearchButton: function() {
                return d3.select(bodyElm).append('a').attr('href', '#').text('x');
            },
            clearSearchInput: function(searchInput) { searchInput.node().value = ''; },
            recalculateSize: function() {},
            markSelected: function(elmData) { elmData.element.classed('rpd-nodelist-selected', true); },
            markDeselected: function(elmData) { elmData.element.classed('rpd-nodelist-selected', false); },
            markAdding: function(elmData) { elmData.element.classed('rpd-nodelist-add-effect', true); },
            markAdded: function(elmData) { elmData.element.classed('rpd-nodelist-add-effect', false); },
            setVisible: function(elmData) { elmData.element.style('display', 'list-item'); },
            setInvisible: function(elmData) { elmData.element.style('display', 'none'); }
        });

        nodeList.addOnClick();
        nodeList.addSearch();
        nodeList.addCtrlSpaceAndArrows();

    }
});



Rpd.noderenderer('input/constant', 'html', function(){
    var valInput;
    
    return  {
    first: function(bodyElm) {
        valInput = document.createElement('input');
        valInput.style.display = 'block';
        valInput.type = 'number';
        valInput.min = 0;
        valInput.max = 1000;
        bodyElm.appendChild(valInput);
        return { 'user-value':
                    { default: function() { valInput.value = 0; return 0; },
                      valueOut: Kefir.fromEvents(valInput, 'change')
                                     .map(function() { return valInput.value; })
                    }
               };
    },
    always: function(bodyElm, inlets, outlets) {
        // console.log(inlets)
        valInput.value = inlets["user-value"];
    },    
}});


Rpd.noderenderer('espnode/comment', 'html', function(){
    var valInput;
    
    return  {
    first: function(bodyElm) {

        valInput = document.createElement('textarea');
        valInput.style.width = '150px';
        valInput.style.height = '100px';
        valInput.style.color = "#000";
        valInput.style.background = "#CCC";
        valInput.style.fontSize = "1.25em";
        valInput.style.padding = "1em";
        valInput.style.fontFamily = "'PT Mono', 'Andale Mono', 'Fira mono', 'Menlo', sans-serif;";

        // valInput.type = 'number';
        // valInput.min = 0;
        // valInput.max = 1000;
        bodyElm.appendChild(valInput);

          
        return { 'comment':
                    { default: function() { valInput.value = 0; return "type comment here.."; },
                      valueOut: Kefir.fromEvents(valInput, 'change')
                                     .map(function() { return (valInput.value); })
                    }
               };
    },
    always: function(bodyElm, inlets, outlets) {
        // console.log(inlets)
        valInput.value = (inlets["comment"]);
    },   
}});

Rpd.noderenderer('sampler/samplepackplay', 'html', function(){
    var valInput;
    
    return  {
    first: function(bodyElm) {

        valInput = document.createElement('input');
        valInput.style.width = '70px';
        // valInput.style.height = '100px';
        valInput.style.color = "#000";
        valInput.style.background = "#CCC";
        // valInput.style.fontSize = "1.25em";
        // valInput.style.padding = "1em";
        valInput.style.fontFamily = "'PT Mono', 'Andale Mono', 'Fira mono', 'Menlo', sans-serif;";

        // valInput.type = 'number';
        // valInput.min = 0;
        // valInput.max = 1000;
        bodyElm.appendChild(valInput);

          
        return { 'sample':
                    { default: function() {  return "Sample1"; },
                      valueOut: Kefir.fromEvents(valInput, 'change')
                                     .map(function() { return (valInput.value); })
                    }
               };
    },
    always: function(bodyElm, inlets, outlets) {
        // console.log(inlets)
        valInput.value = (inlets["sample"]);
    },   
}});


Rpd.noderenderer('wave/tinysynth', 'html', function(){
    var valInput;
    
    return  {
    first: function(bodyElm) {

        valInput = document.createElement('textarea');
        valInput.style.width = '350px';
        valInput.style.height = '100px';
        valInput.style.color = "#000";
        valInput.style.background = "#CCC";
        valInput.style.fontSize = "1.25em";
        valInput.style.padding = "0.5em";
        valInput.style.fontFamily = "'PT Mono', 'Andale Mono', 'Fira mono', 'Menlo', sans-serif;";

        // valInput.type = 'number';
        // valInput.min = 0;
        // valInput.max = 1000;
        bodyElm.appendChild(valInput);

          
        return { 'ample':
                    { default: function() { valInput.value = 0; return "C(-1:C)Fe 2,dE | 4,F(-1:D) 2,eF 4,A(-1:G)g | 2,f(-1:F)eF(-1:E)G 4,f(-1:D)e(-1:C) | 2,d(-2:G)Edc 4,b(-2:G)G | c(-1:C)Fe 2,dE | 4,F(-1:D) 2,eF 4,A(-1:G)g | 2,A(-1:F)gA(-1:E)Cb(-1:G)gB(-1:B)D | 4,c(-1:C)g 8,C ^(^^)"; },
                      valueOut: Kefir.fromEvents(valInput, 'change')
                                     .map(function() { return encodeURIComponent(valInput.value); })
                    }
               };
    },
    always: function(bodyElm, inlets, outlets) {
        // console.log(inlets)
        valInput.value = decodeURIComponent(inlets["ample"]);
    },   
}});



Rpd.noderenderer('timing/clock', 'html', function(){
    var valInput;
    return  {
    first: function(bodyElm) {

        var txt = document.createElement('span');
        txt.innerHTML = "Clk ";
        bodyElm.appendChild(txt);
                
        valInput = document.createElement('input');
        // valInput.style.display = 'block';
        valInput.style.width = "50px";
        valInput.type = 'number';
        valInput.min = 0;
        valInput.max = 1000;
        bodyElm.appendChild(valInput);


        var txt = document.createElement('span');
        txt.innerHTML = "Div ";
        bodyElm.appendChild(txt);

        valClock = document.createElement('input');
        // valClock.style.display = 'block';
        valClock.style.width = "50px";
        valClock.type = 'number';
        valClock.min = 0;
        valClock.max = 1000;
        bodyElm.appendChild(valClock);

        return {    
                    'bpm':
                    { 
                        default: function() { valInput.value = 0; return 0; }, valueOut: Kefir.fromEvents(valInput, 'change').map(function() { return valInput.value; })
                    },
                    'division': {
                        default: function() { valClock.value = 0; return 0; }, valueOut: Kefir.fromEvents(valClock, 'change').map(function() { return valClock.value; })
                    }
               };
    },
    always: function(bodyElm, inlets, outlets) {
        valInput.value = inlets["bpm"];
        valClock.value = inlets["division"];
    },    
}});



Rpd.noderenderer('timing/counter', 'html', function(){
    var valInput;
    return  {
    first: function(bodyElm) {

        var txt = document.createElement('span');
        txt.innerHTML = "Target ";
        bodyElm.appendChild(txt);
                
        valInput = document.createElement('input');
        // valInput.style.display = 'block';
        valInput.style.width = "50px";
        valInput.type = 'number';
        valInput.min = 0;
        valInput.max = 1000;
        bodyElm.appendChild(valInput);


        return {    
                    'target':
                    { 
                        default: function() { valInput.value = 0; return 0; }, valueOut: Kefir.fromEvents(valInput, 'change').map(function() { return valInput.value; })
                    }
               };
    },
    always: function(bodyElm, inlets, outlets) {
        valInput.value = inlets["target"];
    },    
}});


Rpd.noderenderer('input/map', 'html', function(){
    var valInput;
    return  {
    first: function(bodyElm) {

        var txt = document.createElement('span');
        txt.innerHTML = "Low ";
        bodyElm.appendChild(txt);
                
        valInput = document.createElement('input');
        valInput.style.display = 'block';
        valInput.style.width = "50px";
        valInput.type = 'number';
        valInput.min = 0;
        valInput.max = 1000;
        bodyElm.appendChild(valInput);


        var txt = document.createElement('span');
        txt.innerHTML = "High ";
        bodyElm.appendChild(txt);

        valClock = document.createElement('input');
        valClock.style.display = 'block';
        valClock.style.width = "50px";
        valClock.type = 'number';
        valClock.min = 0;
        valClock.max = 1000;
        bodyElm.appendChild(valClock);

        return {    
                    'low':
                    { 
                        default: function() { valInput.value = 0; return 0; }, valueOut: Kefir.fromEvents(valInput, 'change').map(function() { return valInput.value; })
                    },
                    'high': {
                        default: function() { valClock.value = 0; return 0; }, valueOut: Kefir.fromEvents(valClock, 'change').map(function() { return valClock.value; })
                    }
               };
    },
    always: function(bodyElm, inlets, outlets) {
        valInput.value = inlets["low"];
        valClock.value = inlets["high"];
    },    
}});


Rpd.channelrenderer('input/constant', 'html', {
    /* show: function(target, value) { }, */
    edit: function(target, inlet, valueIn) {
        var valInput = document.createElement('input');
        valInput.type = 'number';
        valueIn.onValue(function(val) {
            valInput.value = val;
        });
        target.appendChild(valInput);
        return Kefir.fromEvents(valInput, 'change')
                    .map(function() { return valInput.value; });
    }
});


// Rpd.channeltype('espnode/string', {
//     allow: [ 'util/number' ]
// });

Rpd.channeltype('espnode/string', {
    default: 0,
    readonly: false,
    accept: function(val) {
        // if (val === Infinity) return true;
        // var parsed = parseFloat(val);
        // return !isNaN(parsed) && isFinite(parsed);
        return true;
    },
    adapt: function(val) { 
        // if (val !== "") 
            return (val); 
        // else
            // return "default"
    }
});

Rpd.channelrenderer('espnode/string', 'html', {
    /* show: function(target, value) { }, */

});


