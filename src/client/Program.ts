import MyScene from "./MyScene";

// Playgrounds:
// Plunker: https://next.plnkr.co/edit/4pnm93F1eWQuvpYg?preview
// CodeSandbox: https://codesandbox.io/s/textured-rectangle-with-transforms-typescript-s7gfb

class Program
{
    public static Main(): void
    {
        let scene = new MyScene("renderCanvas");
    }
}

// Debug Version
Program.Main();

// Release Version
// window.onload = () => Program.Main();
