class Tile {
    #box: HTMLElement;
    #theme: ThemeColour;
    #value: number = 0;
    #coords: Coordinates = { y: 0, x: 0 };
    #placement: Coordinates = { y: 0, x: 0 };

    constructor(
        box: HTMLElement,
        theme: ThemeColour,
        placement: Coordinates,
        coords: Coordinates,
        value: number
    ) {
        this.#box = box;
        this.#theme = theme;
        this.placement = placement;
        this.coords = coords;
        this.value = value;
        this.#changeColour();
    }

    get box(): HTMLElement {
        return this.#box;
    }

    get placement(): Coordinates {
        return this.#placement;
    }

    set placement(newPlacement: Coordinates) {
        this.#box.style.gridRow = newPlacement.y.toString();
        this.#box.style.gridColumn = newPlacement.x.toString();
        this.#placement = newPlacement;
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
        this.#changeColour();
    }

    #changeColour(): void {
        const keys: string[] = Object.keys(this.#theme);
        const values: string[] = Object.values(this.#theme);
        const key: string = this.#value.toString();
        let color: string = "";

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === key) color = values[i];
        }

        this.#box.style.backgroundColor = color;
    }
}
