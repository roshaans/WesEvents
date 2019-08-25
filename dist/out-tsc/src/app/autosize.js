import * as tslib_1 from "tslib";
import { ElementRef, HostListener, Directive } from '@angular/core';
var Autosize = /** @class */ (function () {
    function Autosize(element) {
        this.element = element;
    }
    Autosize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    Autosize.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 0);
    };
    Autosize.prototype.adjust = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';
    };
    tslib_1.__decorate([
        HostListener('input', ['$event.target']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [HTMLTextAreaElement]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Autosize.prototype, "onInput", null);
    Autosize = tslib_1.__decorate([
        Directive({
            selector: 'ion-textarea[autosize]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], Autosize);
    return Autosize;
}());
export { Autosize };
//# sourceMappingURL=autosize.js.map