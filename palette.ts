namespace microsoft {
    /**
     * Replaces colors 2, 7, 8, 4, 13 with Microsoft coporate colors
     */
    //% blockId=microsoftsetpaletteColor 
    //% block="set palette colors"
    export function setPaletteColors() {
        const pal = palette.getCurrentColors()
        pal.setColor(2, 0xF25022);
        pal.setColor(7, 0x7FBA00);
        pal.setColor(8, 0x00A4EF)
        pal.setColor(4, 0xFFB900)
        pal.setColor(13, 0x737373)
        palette.setColors(pal)
    }

    /**
     * Creates a sprite with the microsoft logo
     */
    //% blockId=microsoftlogosprite
    //% block="create logo sprite"
    export function createLogoSprite(): Sprite {
        const i = image.create(66, 10)
        i.fillRect(0, 0, 4, 4, 2)
        i.fillRect(5, 0, 4, 4, 7)
        i.fillRect(0, 5, 4, 4, 8)
        i.fillRect(5, 5, 4, 4, 4)
        i.print("Microsoft", 12, 2, 13, image.font5)
        const microsoftSprite = sprites.create(i);
        microsoftSprite.left = 10
        microsoftSprite.top = 10
        return microsoftSprite;
    }
}
