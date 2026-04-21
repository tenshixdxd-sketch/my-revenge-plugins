(function (t, e, a) {
  "use strict";
  const registry = e.ReactNative.TurboModuleRegistry;
  const audioModule =
    registry.get("NativeAudioManagerModule") ??
    registry.get("RTNAudioManager") ??
    registry.get("NativeAudioModule") ??
    registry.get("AudioManager");
  if (!audioModule) {
    console.warn("[audiofix] Audio module not found");
    return t;
  }
  const unpatch = a.instead("setCommunicationModeOn", audioModule, () => {});
  t.onUnload = unpatch;
  return t;
})(
  {},
  (typeof revenge !== "undefined" ? revenge : vendetta).metro.common,
  (typeof revenge !== "undefined" ? revenge : vendetta).patcher
);
