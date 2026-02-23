import { CallClient } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';

let call;
let incomingCall;
let callAgent;
let deviceManager;
let tokenCredential;
const userToken = document.getElementById("token-input"); 
const calleeInput = document.getElementById("callee-id-input");
const submitToken = document.getElementById("token-submit");
const callButton = document.getElementById("call-button");
const hangUpButton = document.getElementById("hang-up-button");
const acceptCallButton = document.getElementById('accept-call-button');

submitToken.addEventListener('click', async () => {
    const callClient = new CallClient();
    tokenCredential = new AzureCommunicationTokenCredential(userToken.value.trim());
    callAgent = await callClient.createCallAgent(tokenCredential);

    deviceManager = await callClient.getDeviceManager();
    await deviceManager.askDevicePermission({ audio: true });

    callButton.disabled = false;
    submitToken.disabled = true;

    callAgent.on('incomingCall', async (args) => {
        incomingCall = args.incomingCall;
        acceptCallButton.disabled = false;
        callButton.disabled = true;
    });
});

callButton.addEventListener('click', async () => {
    call = callAgent.startCall(
        [{ communicationUserId: calleeInput.value.trim() }]
    );
    hangUpButton.disabled = false;
    callButton.disabled = true;
});

acceptCallButton.addEventListener('click', async () => {
    call = await incomingCall.accept();
    hangUpButton.disabled = false;
    acceptCallButton.disabled = true;
});

hangUpButton.addEventListener('click', async () => {
    await call.hangUp({ forEveryone: false });
    hangUpButton.disabled = true;
    callButton.disabled = false;
});