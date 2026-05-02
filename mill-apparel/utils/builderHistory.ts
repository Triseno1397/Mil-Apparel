import { BuilderState } from '@/types/builder';

export interface HistoryState {
    past: BuilderState[];
    present: BuilderState;
    future: BuilderState[];
}

export function createHistory(initialState: BuilderState): HistoryState {
    return {
        past: [],
        present: initialState,
        future: [],
    };
}

export function canUndo(history: HistoryState): boolean {
    return history.past.length > 0;
}

export function canRedo(history: HistoryState): boolean {
    return history.future.length > 0;
}

export function undo(history: HistoryState): HistoryState {
    if (!canUndo(history)) return history;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);

    return {
        past: newPast,
        present: previous,
        future: [history.present, ...history.future],
    };
}

export function redo(history: HistoryState): HistoryState {
    if (!canRedo(history)) return history;

    const next = history.future[0];
    const newFuture = history.future.slice(1);

    return {
        past: [...history.past, history.present],
        present: next,
        future: newFuture,
    };
}

export function pushState(history: HistoryState, newState: BuilderState): HistoryState {
    return {
        past: [...history.past, history.present],
        present: newState,
        future: [], // Clear future when making new changes
    };
}
