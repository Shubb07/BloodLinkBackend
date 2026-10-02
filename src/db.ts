import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { type AppState, seedState } from './seed.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data.json');

function load(): AppState {
  if (existsSync(DB_PATH)) {
    try {
      return JSON.parse(readFileSync(DB_PATH, 'utf-8')) as AppState;
    } catch {
      // fall through to seed on parse failure
    }
  }
  return structuredClone(seedState);
}

let state: AppState = load();

function persist() {
  writeFileSync(DB_PATH, JSON.stringify(state, null, 2), 'utf-8');
}

export function getState(): AppState {
  return state;
}

export function updateState(mutator: (s: AppState) => void) {
  mutator(state);
  persist();
}

export function resetState() {
  state = structuredClone(seedState);
  persist();
}
