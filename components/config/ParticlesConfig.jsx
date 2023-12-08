const ParticlesConfig = {
  fullscreen: {
    enable: true,
    zIndex: -1,
  },
  background: {
    color: {
      value: "transparant",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "bubble",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 20,
        duration: 600,
      },
      bubble: {
        distance: 200,
        size: 8,
        duration: 2,
        opacity: 0.8,
        speed: 10,
      },
    },
  },
  particles: {
    color: {
      value: "#7154e0",
      opacity: 0.5,
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 0.2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};

export default ParticlesConfig;
