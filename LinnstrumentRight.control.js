
loadAPI(1);

host.defineController("Roger Linn Design", "LinnStrumentRight", "1.0", "B7DD06CB-63BA-4902-879E-050B09D3000F");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["LinnStrument MIDI"], ["LinnStrument MIDI"]);

function init()
{
   host.getMidiInPort(0).setMidiCallback(onMidi);
   noteInput = host.getMidiInPort(0).createNoteInput("Right", "?8????", "?9????", "?A????", "?B????", "?C????","?D????","?E????","?F????");

   noteInput.setUseExpressiveMidi(true, 0, 24);

   var yesNo = ["Yes", "No"];
   shouldSendInit = host.getPreferences().getEnumSetting("Send initialization messages", "MPE", yesNo, "Yes");
   shouldSendInit.addValueObserver(function (should)
   {
      if (should == "Yes")
      {
         sendInitializationMessages();
      }
   });

   if (shouldSendInit == "Yes")
   {
      sendInitializationMessages();
   }
}

function sendInitializationMessages()
{
   sendChannelController(0, 127, 15);

   // Set up pitch bend sensitivity to 48 semitones (00/00)
   sendChannelController(0, 100, 0); // Registered Parameter Number (RPN) - LSB*
   sendChannelController(0, 101, 0); // Registered Parameter Number (RPN) - MSB*
   sendChannelController(0, 36, 0);
   sendChannelController(0, 6, 24);
}

function onMidi(status, data1, data2)
{
  //printMidi(status, data1, data2);
  //println(MIDIChannel(status));
}

function exit()
{
}
