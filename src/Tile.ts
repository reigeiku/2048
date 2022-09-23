class Tile {
    #box: HTMLElement;
    #theme: ThemeColour;
    #value: number;
    #coords: Coordinates;

    constructor(
        box: HTMLElement,
        theme: ThemeColour,
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
        this.#changeColour();
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
        this.#changeColour();
    }

    #changeColour(): void {
        const keys: string[] = Object.keys(this.#theme);
        const values: string[] = Object.values(this.#theme);
        const value: string = this.#value.toString();
        let color: string = "";

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === value) color = values[i];
        }

        this.#box.style.backgroundColor = color;
    }
}
