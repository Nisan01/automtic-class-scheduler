import React from "react";
import { Button } from "@/components/ui/Button";

const colors = [
  "yellow", "red", "green", "blue", "cyan",
  "purple", "crimson", "pink", "orange", "lime",
  "amber", "teal", "indigo", "violet", "slate",
  "default",
];

export default function Ui() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-6 p-8">
      <Section title="Colors with Sizes">
        {colors.map((color) => (
          <React.Fragment key={color}>
            <Button variant={color} size="sm">{color} sm</Button>
            <Button variant={color} size="default">{color} default</Button>
            <Button variant={color} size="lg">{color} lg</Button>
            <Button variant={color} size="exlg">{color} exlg</Button>
          </React.Fragment>
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children, color }) {
  return (
    <div className="w-full">
      <h2 className={`mb-2 font-semibold text-lg ${color || ""}`}>{title}</h2>
      <div className="flex gap-3 flex-wrap">{children}</div>
    </div>
  );
}
