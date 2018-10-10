import {ComponentFixture} from "@angular/core/testing";
/**
 * Created by matjazhi on 20.3.2017.
 */

export class EhrTestingUtils {

    static detectChanges(fixture: ComponentFixture<any>): void {
        //fix for updating OnPush component after first fixture.detectChanges()  //https://github.com/angular/angular/issues/12313
        fixture.changeDetectorRef['_view'].nodes[0].componentView.state |= (1 << 1);
        fixture.detectChanges();
    }

    constructor() {
    }

}