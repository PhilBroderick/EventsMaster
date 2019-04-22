"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventOverlayRef = /** @class */ (function () {
    function EventOverlayRef(overlayRef) {
        this.overlayRef = overlayRef;
    }
    EventOverlayRef.prototype.close = function () {
        this.overlayRef.dispose();
    };
    return EventOverlayRef;
}());
exports.EventOverlayRef = EventOverlayRef;
//# sourceMappingURL=event-overlay-ref.js.map