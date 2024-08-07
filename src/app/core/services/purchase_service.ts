import { Injectable, WritableSignal, signal } from "@angular/core";
import { License } from "../interfaces/license";

@Injectable()
export class PurchaseService {
    selectedLicense: WritableSignal<License | undefined> = signal(undefined);
}