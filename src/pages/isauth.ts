import { signal, effect } from "@preact/signals";
import { Preferences } from "@capacitor/preferences";

// Create a signal to store the value
export  const isauth = signal(null)
// Create an effect to fetch and set the value
effect(async () => {
  const username = await Preferences.get({ key: "username" });
  console.log(username); // Optional: You can log it if you like.
isauth.value = username.value
});
export  const token = signal(null)
// Create an effect to fetch and set the value
effect(async () => {
  const tokenn = await Preferences.get({ key: "token" });
token.value = tokenn.value
});
// Now, you can export the value from your function
 