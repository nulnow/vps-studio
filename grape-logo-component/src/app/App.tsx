import { TechGrape } from "./components/TechGrape";

export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="mb-2">Tech Stack Grape</h1>
          <p className="text-slate-600">Hover over each circle to see the technology name</p>
        </div>
        <TechGrape />
      </div>
    </div>
  );
}