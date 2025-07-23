import {Container, IntroStyled} from "./intro.style.ts";
import {useEffect, useRef} from "react";
import {initGame} from "phaser/initGame.ts";
import * as Phaser from "phaser";


export const Intro = () => {
  const containerRef = useRef(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (containerRef.current && !gameRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      gameRef.current = initGame({
        parent: containerRef.current,
        fullScreen: true,
        width: rect.width,
        height: rect.height,
      });
    }
    return () => {
      if (gameRef.current) {
        gameRef.current?.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);


  return (
    <IntroStyled>
      <Container ref={containerRef} id="game-container"/>
    </IntroStyled>
  )
}

export default Intro
