import postgresLogo from "figma:asset/a477c6744b0214e039c9b7abf5a24dc1245d42c6.png";
import nodejsLogo from "figma:asset/8fd8b7ac7b6758c0ed68c86e757d5b48fdc2faa2.png";
import redisLogo from "figma:asset/11cfd3a45d55ad7ac4c0a1fc413c0ae31f239427.png";
import dockerLogo from "figma:asset/c9c25c76347497a135283e424c55fadf9f943d17.png";
import gitlabLogo from "figma:asset/741f02f3c01502eec9d15c4a59376a5a2ad7a8a7.png";
import redisAltLogo from "figma:asset/ef7fe56cefd6b028ce5256e696e819aa768262e8.png";
import javaLogo from "figma:asset/8787d083b04464dd44cfe606cfbd82835b465d04.png";
import minecraftLogo from "figma:asset/5039d021e67142009223c18b6ba9c4903cfcbcc1.png";

export function TechGrape() {
  // Scale factor to make the grape larger and visible
  const scale = 10;
  const viewBoxSize = 24;

  // Original circle positions from the grape SVG - adjusted spacing
  const logos = [
    {
      name: "Docker",
      cx: 15.7,
      cy: 14.7,
      color: "#2496ED",
      icon: "🐋",
      image: dockerLogo,
    },
    {
      name: "PostgreSQL",
      cx: 9.2,
      cy: 8.7,
      color: "#336791",
      icon: "🐘",
      image: postgresLogo,
    },
    {
      name: "Java",
      cx: 12.2,
      cy: 11.6,
      color: "#007396",
      icon: "☕",
      image: javaLogo,
    },
    {
      name: "Redis",
      cx: 13.7,
      cy: 7.3,
      color: "#DC382D",
      icon: "⚡",
      image: null,
    },
    {
      name: "Minecraft",
      cx: 16.7,
      cy: 11,
      color: "#62A036",
      icon: "🧊",
      image: minecraftLogo,
    },
    {
      name: "Node.js",
      cx: 7.7,
      cy: 13,
      color: "#339933",
      icon: "📦",
      image: nodejsLogo,
    },
    {
      name: "GitLab",
      cx: 11,
      cy: 15.7,
      color: "#FC6D26",
      icon: "🦊",
      image: gitlabLogo,
    },
    {
      name: "Redis Alt",
      cx: 6.7,
      cy: 16.7,
      color: "#DC382D",
      icon: "⚡",
      image: redisAltLogo,
    },
  ];

  return (
    <div
      className="relative"
      style={{
        width: `${viewBoxSize * scale}px`,
        height: `${viewBoxSize * scale}px`,
      }}
    >
      {/* Decorative stem line */}
      <svg
        className="absolute top-0 left-0 pointer-events-none"
        width={viewBoxSize * scale}
        height={viewBoxSize * scale}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <path
          d="M22 5V2l-5.89 5.89"
          stroke="rgb(23 23 23)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Logo circles */}
      {logos.map((logo, index) => {
        const x = logo.cx * scale - 30; // 30 is half of circle width (60px)
        const y = logo.cy * scale - 30;
        const isCenter = index === 2; // Java is in the center

        return (
          <div
            key={index}
            className={`absolute rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 hover:z-10 cursor-pointer ${
              isCenter
                ? "border-8 border-neutral-900 bg-white"
                : "border-4 border-neutral-900 bg-neutral-900"
            }`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: "60px",
              height: "60px",
              backgroundColor: logo.image
                ? isCenter
                  ? undefined
                  : undefined
                : logo.color,
            }}
            title={logo.name}
          >
            {logo.image ? (
              <img
                src={logo.image}
                alt={logo.name}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl">{logo.icon}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}