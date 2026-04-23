export default {
  onLoad: () => {
    const registry = window.ReactNative?.TurboModuleRegistry 
      || bunny.metro.common.ReactNative.TurboModuleRegistry;
    
    const audioModule =
      registry.get("NativeAudioManagerModule") ??
      registry.get("RTNAudioManager") ??
      registry.get("NativeAudioModule") ??
      registry.get("AudioManager");

    if (!audioModule) {
      console.warn("[audiofix] Audio module not found");
      return;
    }

    globalThis.__audiofix_unpatch = bunny.patcher.instead(
      "setCommunicationModeOn",
      audioModule,
      () => {}
    );
  },
  onUnload: () => {
    globalThis.__audiofix_unpatch?.();
  }
};
