import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SpinnerService {
    private _isLoading: WritableSignal<boolean> = signal(false);

    get isLoading(): WritableSignal<boolean> {
        return this._isLoading;
    }

    updateLoading(value: boolean) {
        this._isLoading.set(value);
    }
    
}