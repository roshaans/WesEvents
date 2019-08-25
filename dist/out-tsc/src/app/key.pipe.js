import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value); //.map(key => value[key]);
    };
    KeysPipe = tslib_1.__decorate([
        Pipe({ name: 'keys', pure: false })
    ], KeysPipe);
    return KeysPipe;
}());
export { KeysPipe };
//# sourceMappingURL=key.pipe.js.map