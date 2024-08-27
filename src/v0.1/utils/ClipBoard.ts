import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setString(content: string): void;
  getString(): Promise<string>;
}

export const Clipboard = TurboModuleRegistry.getEnforcing('Clipboard') as Spec;
