submitToken.addEventListener("click", async () => {
  const callClient = new CallClient();
  const userTokenCredential = userToken.value;
    try {
      tokenCredential = new AzureCommunicationTokenCredential(userTokenCredential);
      callAgent = await callClient.createCallAgent(tokenCredential);
      deviceManager = await callClient.getDeviceManager();
      await deviceManager.askDevicePermission({ audio: true });
      callButton.disabled = false;
      submitToken.disabled = true;
      // Listen for an incoming call to accept.
      callAgent.on('incomingCall', async (args) => {
        try {
          incomingCall = args.incomingCall;
          acceptCallButton.disabled = false;
          callButton.disabled = true;
        } catch (error) {
          console.error(error);
        }
      });
    } catch(error) {
      window.alert("Please submit a valid token!");
    }
})

callButton.addEventListener("click", () => {
  // start a call
  const userToCall = calleeInput.value;
  call = callAgent.startCall(
      [{ id: userToCall }],
      {}
  );
  // toggle button states
  hangUpButton.disabled = false;
  callButton.disabled = true;
});

hangUpButton.addEventListener("click", () => {
  // end the current call
  // The `forEveryone` property ends the call for all call participants.
  call.hangUp({ forEveryone: true });

  // toggle button states
  hangUpButton.disabled = true;
  callButton.disabled = false;
  submitToken.disabled = false;
  acceptCallButton.disabled = true;
});

acceptCallButton.onclick = async () => {
  try {
    call = await incomingCall.accept();
    acceptCallButton.disabled = true;
    hangUpButton.disabled = false;
  } catch (error) {
    console.error(error);
  }
}