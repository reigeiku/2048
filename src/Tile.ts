class Tile {
    #box: HTMLElement;
    #theme: string[];
    #value: number;
    #coords: Coordinates;

    constructor(
        box: HTMLElement,
        theme: string[],
        coords: Coordinates,
        value: number
    ) {
        this.#box = box;
        this.#theme = theme;
        this.#box.style.left = coords.x + "px";
        this.#box.style.top = coords.y + "px";
        this.#box.innerText = value.toString();
        this.#coords = coords;
        this.#value = value;
    }

    get box(): HTMLElement {
        return this.#box;
    }

    get coords(): Coordinates {
        return this.#coords;
    }

    set coords(newCoords: Coordinates) {
        this.#box.style.left = newCoords.x + "px";
        this.#box.style.top = newCoords.y + "px";
        this.#coords = newCoords;
    }

    get value(): number {
        return this.#value;
    }

    set value(newValue: number) {
        this.#box.innerText = newValue.toString();
        this.#value = newValue;
    }

    #changeTheme(): void {}
}
