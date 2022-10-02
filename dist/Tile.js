"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tile_instances, _Tile_box, _Tile_theme, _Tile_value, _Tile_coords, _Tile_placement, _Tile_changeColour;
class Tile {
    constructor(box, theme, placement, coords, value) {
        _Tile_instances.add(this);
        _Tile_box.set(this, void 0);
        _Tile_theme.set(this, void 0);
        _Tile_value.set(this, 0);
        _Tile_coords.set(this, { y: 0, x: 0 });
        _Tile_placement.set(this, { y: 0, x: 0 });
        __classPrivateFieldSet(this, _Tile_box, box, "f");
        __classPrivateFieldSet(this, _Tile_theme, theme, "f");
        this.placement = placement;
        this.coords = coords;
        this.value = value;
        __classPrivateFieldGet(this, _Tile_instances, "m", _Tile_changeColour).call(this);
    }
    get box() {
        return __classPrivateFieldGet(this, _Tile_box, "f");
    }
    get placement() {
        return __classPrivateFieldGet(this, _Tile_placement, "f");
    }
    set placement(newPlacement) {
        __classPrivateFieldGet(this, _Tile_box, "f").style.gridRow = newPlacement.y.toString();
        __classPrivateFieldGet(this, _Tile_box, "f").style.gridColumn = newPlacement.x.toString();
        __classPrivateFieldSet(this, _Tile_placement, newPlacement, "f");
    }
    get coords() {
        return __classPrivateFieldGet(this, _Tile_coords, "f");
    }
    set coords(newCoords) {
        __classPrivateFieldGet(this, _Tile_box, "f").style.left = newCoords.x + "px";
        __classPrivateFieldGet(this, _Tile_box, "f").style.top = newCoords.y + "px";
        __classPrivateFieldSet(this, _Tile_coords, newCoords, "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _Tile_value, "f");
    }
    set value(newValue) {
        __classPrivateFieldGet(this, _Tile_box, "f").innerText = newValue.toString();
        __classPrivateFieldSet(this, _Tile_value, newValue, "f");
        __classPrivateFieldGet(this, _Tile_instances, "m", _Tile_changeColour).call(this);
    }
}
_Tile_box = new WeakMap(), _Tile_theme = new WeakMap(), _Tile_value = new WeakMap(), _Tile_coords = new WeakMap(), _Tile_placement = new WeakMap(), _Tile_instances = new WeakSet(), _Tile_changeColour = function _Tile_changeColour() {
    const keys = Object.keys(__classPrivateFieldGet(this, _Tile_theme, "f"));
    const values = Object.values(__classPrivateFieldGet(this, _Tile_theme, "f"));
    const key = __classPrivateFieldGet(this, _Tile_value, "f").toString();
    let color = "";
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === key)
            color = values[i];
    }
    __classPrivateFieldGet(this, _Tile_box, "f").style.backgroundColor = color;
};
