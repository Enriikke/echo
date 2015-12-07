
window.LoopTrap = 2000;
Blockly.JavaScript.INFINITE_LOOP_TRAP = "if(--window.LoopTrap == 0) throw 'Infinite loop.';\n";
// Blockly.JavaScript.addReservedWords("Echo");

Blockly.Blocks["echo_turn"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn")
        .appendField(new Blockly.FieldDropdown([["left", "left"], ["right", "right"]]), "turn");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
  }
};

Blockly.JavaScript["echo_turn"] = function(block) {
  var dropdown_turn = block.getFieldValue("turn");
  var code = "Dude.turn('" + dropdown_turn + "');"
  return code;
};


Blockly.Blocks['echo_walk'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("walk");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
  }
};

Blockly.JavaScript['echo_walk'] = function(block) {
  var code = "Dude.walk();";
  return code;
};


Blockly.Blocks['echo_jump'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("jump");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
  }
};

Blockly.JavaScript['echo_jump'] = function(block) {
  var code = "Dude.jump();";
  return code;
};
