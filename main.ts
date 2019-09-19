namespace storyboard {
    function bootMicrosoftLogo(done: () => void) {
        const TARGET_POSITION_KEY = "target_position"
        const text = "Microsoft";
        const f = image.doubledFont(image.font8);
        const bg = 0x6;
        const tc = 0x1;
        const colorOffset = 2;
        const Logo = SpriteKind.create();
        const Overlay = SpriteKind.create();
        const Text = SpriteKind.create();

        scene.setBackgroundColor(bg);
        const logoColors = [
            0xF25022, // red
            0x7FBA00, // green
            0x00A4EF, // blue
            0xFFB900, // orange
            0x737373 // gray
        ];
        palette.setColors(color.createBuffer(logoColors), colorOffset);

        pause(300);

        const textSprite = sprites.create(
            image.create(text.length() * f.charWidth, f.charHeight),
            Text
        );
        textSprite.image.print(text, 0, 0, tc, f);
        textSprite.x += 10;
        textSprite.z = -1;
        textSprite.setFlag(SpriteFlag.Ghost, true);

        const overlaySprite = sprites.create(textSprite.image.clone(), Overlay);
        overlaySprite.image.replace(tc, bg);
        overlaySprite.x = textSprite.x;
        overlaySprite.z = -1;

        const makeLogoRectangle = (c: number) => {
            const i = image.create(8, 8);
            i.fill(c);
            return i;
        }

        const logoSprites: Sprite[] = [];
        for (let i = 0; i < 4; ++i) {
            const s = sprites.create(makeLogoRectangle(i + colorOffset), Logo);
            const yDiff = s.width >> 1;
            s.y += i < 2 ? -(yDiff + 1) : yDiff;
            s.x += (i % 2) * (s.height + 1) + (screen.width >> 1);
            s.data[TARGET_POSITION_KEY] = textSprite.left - 3 - (((i + 1) % 2) * 9);
            logoSprites.push(s);
        }

        // overlap to clear overlay
        sprites.onOverlap(Logo, Overlay, (s: Sprite, os: Sprite) => {
            os.image.fillRect(
                s.left - os.left,
                s.top - os.top,
                s.width + 20, // make sure everything behind this is handled
                s.height + 1, // draw mid
                0
            );
        });
        // overlap to clear text
        sprites.onOverlap(Logo, Text, (s: Sprite, os: Sprite) => {
            os.image.fillRect(
                0,
                0,
                s.right - os.left, // make sure everything behind this is handled
                os.height,
                0
            );
        });

        let allSpritesInPosition = false;
        game.onUpdate(() => {
            allSpritesInPosition = logoSprites
                .map(s => {
                    const targetPosition = s.data[TARGET_POSITION_KEY];
                    if (s.right < targetPosition) {
                        s.ax = 0;
                        s.vx = 0;
                        s.right = targetPosition;
                    }
                    return s.right <= targetPosition;
                })
                .every(b => b);
        });

        logoSprites[2].vx = -50;
        logoSprites[2].ax = -1500;
        pause(20);
        logoSprites[0].vx = -50;
        logoSprites[0].ax = -1500;
        pause(20);
        logoSprites[3].vx = -50;
        logoSprites[3].ax = -1500;
        pause(20);
        logoSprites[1].vx = -50;
        logoSprites[1].ax = -1500;
        pause(20);

        pauseUntil(() => allSpritesInPosition);

        overlaySprite.destroy();

        pause(1000);
        logoSprites.forEach(s => s.ax = 500);
        textSprite.ax = -500;
        textSprite.setFlag(SpriteFlag.Ghost, false);

        pauseUntil(() => logoSprites[3].left >= screen.width >> 1);

        logoSprites.forEach(s => {
            s.ax = 0
            s.vx = 0
        });

        pause(750);
        logoSprites.forEach(s => s.destroy());
        pause(250);
        done();
    }

    /**
     * Microsoft boot sequence
     */
    //% block="Microsoft" fixedInstance whenUsed
    export const microsoftBootSequence = new BootSequence(bootMicrosoftLogo, 0x737373);
}